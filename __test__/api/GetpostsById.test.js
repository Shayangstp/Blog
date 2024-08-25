/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { GET } from "../../src/app/api/posts/[id]/route";
import startDb from "../../src/lib/db";
import BlogPostModel from "../../src/models/blogModel";

import { isValidObjectId } from "mongoose";

jest.mock("../../src/lib/db");
jest.mock("../../src/models/blogModel");

jest.mock("mongoose", () => ({
  ...jest.requireActual("mongoose"),
  isValidObjectId: jest.fn(),
}));
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => {
      return {
        data,
        status: init?.status || 200,
        _getData: () => JSON.stringify(data),
        _getStatusCode: () => init?.status || 200,
      };
    }),
  },
}));

describe("GET /api/posts/:id", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("successfully retrieves a blog post", async () => {
    startDb.mockResolvedValue();

    isValidObjectId.mockReturnValue(true);

    const blogPost = { _id: "123", title: "Test Title", content: "Test Content" };
    BlogPostModel.findById.mockResolvedValue(blogPost);

    const { req, res } = createMocks({
      method: "GET",
      params: { id: "123" },
    });

    const response = await GET(req, { params: { id: "123" } });

    expect(response.status).toBe(200);
    expect(response.data).toEqual(blogPost);

    expect(BlogPostModel.findById).toHaveBeenCalledWith("123");
  });

  test("returns 400 if the blog post ID is invalid", async () => {
    startDb.mockResolvedValue();

    isValidObjectId.mockReturnValue(false);

    const { req, res } = createMocks({
      method: "GET",
      params: { id: "invalid-id" },
    });

    const response = await GET(req, { params: { id: "invalid-id" } });

    expect(response.status).toBe(400);
    expect(response.data).toEqual({ message: "Invalid blog post ID" });

    expect(BlogPostModel.findById).not.toHaveBeenCalled();
  });

  test("returns 404 if the blog post is not found", async () => {
    startDb.mockResolvedValue();

    isValidObjectId.mockReturnValue(true);

    BlogPostModel.findById.mockResolvedValue(null);

    const { req, res } = createMocks({
      method: "GET",
      params: { id: "123" },
    });

    const response = await GET(req, { params: { id: "123" } });

    expect(response.status).toBe(404);
    expect(response.data).toEqual({ message: "Blog post not found" });

    expect(BlogPostModel.findById).toHaveBeenCalledWith("123");
  });
});

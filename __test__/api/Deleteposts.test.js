/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { DELETE } from "../../src/app/api/posts/[id]/route";
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

describe("DELETE /api/posts/:id", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("successfully deletes a blog post", async () => {
    startDb.mockResolvedValue();

    isValidObjectId.mockReturnValue(true);

    const deletedBlogPost = { _id: "1", title: "Deleted Title", content: "Deleted Content" };
    BlogPostModel.findByIdAndDelete.mockResolvedValue(deletedBlogPost);

    const { req, res } = createMocks({
      method: "DELETE",
      params: { id: "1" },
    });

    const response = await DELETE(req, { params: { id: "1" } });

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: "Blog post deleted successfully" });

    expect(BlogPostModel.findByIdAndDelete).toHaveBeenCalledWith("1");
  });

  test("returns 400 if the blog post ID is invalid", async () => {
    startDb.mockResolvedValue();

    isValidObjectId.mockReturnValue(false);

    const { req, res } = createMocks({
      method: "DELETE",
      params: { id: "invalid-id" },
    });

    const response = await DELETE(req, { params: { id: "invalid-id" } });

    expect(response.status).toBe(400);
    expect(response.data).toEqual({ message: "Invalid blog post ID" });

    expect(BlogPostModel.findByIdAndDelete).not.toHaveBeenCalled();
  });

  test("returns 404 if the blog post is not found", async () => {
    startDb.mockResolvedValue();

    isValidObjectId.mockReturnValue(true);

    BlogPostModel.findByIdAndDelete.mockResolvedValue(null);

    const { req, res } = createMocks({
      method: "DELETE",
      params: { id: "1" },
    });

    const response = await DELETE(req, { params: { id: "1" } });

    expect(response.status).toBe(404);
    expect(response.data).toEqual({ message: "Blog post not found" });

    expect(BlogPostModel.findByIdAndDelete).toHaveBeenCalledWith("1");
  });
});

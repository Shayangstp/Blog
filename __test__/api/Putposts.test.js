/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { PUT } from "../../src/app/api/posts/[id]/route";
import startDb from "../../src/lib/db";
import BlogPostModel from "../../src/models/blogModel";
import { NextResponse } from "next/server";
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

describe("PUT /api/posts/:id", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("successfully updates a blog post", async () => {
    startDb.mockResolvedValue();

    isValidObjectId.mockReturnValue(true);

    const updatedBlogPost = { _id: "1", title: "Updated Title", content: "Updated Content" };
    BlogPostModel.findByIdAndUpdate.mockResolvedValue(updatedBlogPost);

    const { req, res } = createMocks({
      method: "PUT",
      body: { title: "Updated Title", content: "Updated Content" },
      params: { id: "1" },
    });

    req.json = async () => req.body;

    const response = await PUT(req, { params: { id: "1" } });

    expect(response.status).toBe(200);
    expect(response.data).toEqual(updatedBlogPost);

    expect(BlogPostModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "1",
      { title: "Updated Title", content: "Updated Content" },
      { new: true, runValidators: true }
    );
  });
});

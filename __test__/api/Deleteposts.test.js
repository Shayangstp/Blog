/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { DELETE } from "../../src/app/api/posts/[id]/route";
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
});

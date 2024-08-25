/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { GET } from "../../src/app/api/posts/[id]/route"; // Adjust the import path as needed
import startDb from "../../src/lib/db";
import BlogPostModel from "../../src/models/blogModel";
import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose"; // Import mongoose normally

jest.mock("../../src/lib/db");
jest.mock("../../src/models/blogModel");
// Mock only the specific function in mongoose, not the entire module
jest.mock("mongoose", () => ({
  ...jest.requireActual("mongoose"), // Import the actual mongoose, except isValidObjectId
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
    // Mock the database start
    startDb.mockResolvedValue();

    // Mock the isValidObjectId to return true
    isValidObjectId.mockReturnValue(true);

    // Mock the findById method on BlogPostModel
    const blogPost = { _id: "123", title: "Test Title", content: "Test Content" };
    BlogPostModel.findById.mockResolvedValue(blogPost);

    // Create the request and response objects
    const { req, res } = createMocks({
      method: "GET",
      params: { id: "123" },
    });

    // Call the GET function
    const response = await GET(req, { params: { id: "123" } });

    // Validate the response
    expect(response.status).toBe(200);
    expect(response.data).toEqual(blogPost);

    // Ensure that findById was called with correct arguments
    expect(BlogPostModel.findById).toHaveBeenCalledWith("123");
  });
});

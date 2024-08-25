/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { POST } from "../../src/app/api/posts/route";
import startDb from "../../src/lib/db";
import BlogPostModel from "../../src/models/blogModel";
import { NextResponse } from "next/server";

jest.mock("../../src/lib/db");
jest.mock("../../src/models/blogModel");
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

describe("POST /api/posts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("creates Blog post", async () => {
    // Mock the database start
    startDb.mockResolvedValue();

    // Mock the save method on the instance of BlogPostModel to return the expected data
    const saveMock = jest.fn().mockResolvedValue({
      title: "Charlie",
      content: "this is test",
    });

    BlogPostModel.mockImplementation(() => ({
      save: saveMock,
    }));

    // Create the request and response objects
    const { req, res } = createMocks({
      method: "POST",
      body: { title: "Charlie", content: "this is test" },
    });

    // Manually mock the json method
    req.json = async () => req.body;

    // Call the POST function
    const response = await POST(req);

    // Validate the response
    expect(response.status).toBe(201);
    expect(response.data).toEqual({ title: "Charlie", content: "this is test" });

    // Ensure that save was called
    expect(saveMock).toHaveBeenCalled();
  });
});

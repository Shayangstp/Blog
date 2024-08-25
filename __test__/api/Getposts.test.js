/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { GET } from "../../src/app/api/posts/route";
import startDb from "../../src/lib/db";
import BlogPostModel from "../../src/models/blogModel";
import { NextResponse } from "next/server";

jest.mock("../../src/lib/db");
jest.mock("../../src/models/blogModel", () => ({
  find: jest.fn(),
  create: jest.fn(),
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

describe("API /api/posts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /api/posts should return all blog posts", async () => {
    const mockPosts = [{ _id: "1", title: "Test Post", content: "Content" }];
    BlogPostModel.find.mockResolvedValue(mockPosts);

    const { req, res } = createMocks({ method: "GET" });
    const response = await GET(req, res);

    expect(response._getStatusCode()).toBe(200);
    expect(response.data).toBeTruthy();
    expect(response.data).toEqual(mockPosts);
  });
});

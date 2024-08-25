/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import { POST } from "../../src/app/api/posts/route";
import startDb from "../../src/lib/db";
import BlogPostModel from "../../src/models/blogModel";

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
    startDb.mockResolvedValue();

    const saveMock = jest.fn().mockResolvedValue({
      title: "Charlie",
      content: "this is test",
    });

    BlogPostModel.mockImplementation(() => ({
      save: saveMock,
    }));

    const { req, res } = createMocks({
      method: "POST",
      body: { title: "Charlie", content: "this is test" },
    });

    req.json = async () => req.body;

    const response = await POST(req);

    expect(response.status).toBe(201);
    expect(response.data).toEqual({ title: "Charlie", content: "this is test" });

    expect(saveMock).toHaveBeenCalled();
  });

  test("returns 400 if title or content is missing", async () => {
    startDb.mockResolvedValue();

    const { req: reqWithoutTitle } = createMocks({
      method: "POST",
      body: { content: "this is test" },
    });

    reqWithoutTitle.json = async () => reqWithoutTitle.body;

    let response = await POST(reqWithoutTitle);

    expect(response.status).toBe(400);
    expect(response.data).toEqual({ message: "Title and content are required." });

    const { req: reqWithoutContent } = createMocks({
      method: "POST",
      body: { title: "Charlie" },
    });

    reqWithoutContent.json = async () => reqWithoutContent.body;

    response = await POST(reqWithoutContent);

    expect(response.status).toBe(400);
    expect(response.data).toEqual({ message: "Title and content are required." });

    expect(BlogPostModel).not.toHaveBeenCalled();
  });
});

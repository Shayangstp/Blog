import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BlogDetail from "../../src/components/BlogDetail";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
import { RsetBlogContent, RsetBlogTitle } from "@/slices/mainSlices";

// Mock the necessary dependencies
jest.mock("axios");
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BlogDetail Component", () => {
  let mockDispatch;
  let mockRouter;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockData = {
    _id: "123",
    title: "Test Blog Post",
    content: "This is the content of the test blog post.",
    updatedAt: "2024-08-24T14:57:31.598Z",
  };

  it("renders the blog post details correctly", () => {
    render(<BlogDetail data={mockData} />);

    expect(screen.getByText("Test Blog Post")).toBeInTheDocument();
    expect(screen.getByText("This is the content of the test blog post.")).toBeInTheDocument();
    expect(screen.getByText("Published - Aug 24, 2024")).toBeInTheDocument();
  });

  it("dispatches the correct actions and navigates to the update page when 'update' is clicked", () => {
    render(<BlogDetail data={mockData} />);

    fireEvent.click(screen.getByText(/update/i));

    expect(mockDispatch).toHaveBeenCalledWith(RsetBlogTitle(mockData.title));
    expect(mockDispatch).toHaveBeenCalledWith(RsetBlogContent(mockData.content));
    expect(mockRouter.push).toHaveBeenCalledWith(`/addblog/${mockData._id}`);
  });

  it("calls deleteBlogPost and shows a success message when 'delete' is clicked", async () => {
    axios.delete.mockResolvedValueOnce({ status: 200 });

    render(<BlogDetail data={mockData} />);

    fireEvent.click(screen.getByText(/delete/i));

    expect(axios.delete).toHaveBeenCalledWith(`http://localhost:3000/api/posts/123`);
  });
});

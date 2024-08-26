import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddBlog from "../../src/components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
import {
  selectBlogTitle,
  selectBlogContent,
  selectFormErrors,
  RsetBlogTitle,
  RsetBlogContent,
  RsetFormErrors,
} from "@/slices/mainSlices";

jest.mock("axios");
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("AddBlog Component", () => {
  let mockDispatch;
  let mockRouter;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    mockRouter = { replace: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case selectBlogTitle:
          return "";
        case selectBlogContent:
          return "";
        case selectFormErrors:
          return {};
        default:
          return "";
      }
    });

    render(<AddBlog />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    expect(screen.getByText(/Reset/i)).toBeInTheDocument();
  });

  it("validate form ", async () => {
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case selectBlogTitle:
          return "";
        case selectBlogContent:
          return "";
        case selectFormErrors:
          return {};
        default:
          return "";
      }
    });

    render(<AddBlog />);

    fireEvent.click(screen.getByText(/Submit/i));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: RsetFormErrors.type,
      payload: {
        blogTitle: "Title can not be empty please write your title!",
        blogContent: "content can not be empty please write your content!",
      },
    });
  });

  it("submit the form and creates a blog post", async () => {
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case selectBlogTitle:
          return "Test Title";
        case selectBlogContent:
          return "Test Content";
        case selectFormErrors:
          return {};
        default:
          return "";
      }
    });
    axios.post.mockResolvedValueOnce({ status: 201 });

    render(<AddBlog />);

    fireEvent.click(screen.getByText(/Submit/i));

    expect(axios.post).toHaveBeenCalledWith("/api/posts", {
      title: "Test Title",
      content: "Test Content",
    });

    expect(mockDispatch).toHaveBeenCalledWith(RsetBlogTitle(""));
    expect(mockDispatch).toHaveBeenCalledWith(RsetBlogContent(""));
  });

  it("updates an existing blog post", async () => {
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case selectBlogTitle:
          return "Update Title";
        case selectBlogContent:
          return "Update Content";
        case selectFormErrors:
          return {};
        default:
          return "";
      }
    });
    axios.put.mockResolvedValueOnce({ status: 200 });

    render(<AddBlog id="123" />);

    fireEvent.click(screen.getByRole("button", { name: /Update/i }));

    expect(axios.put).toHaveBeenCalledWith("/api/posts/123", {
      title: "Update Title",
      content: "Update Content",
    });
  });

  it("resets the form", () => {
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case selectBlogTitle:
          return "Some Title";
        case selectBlogContent:
          return "Some Content";
        case selectFormErrors:
          return {};
        default:
          return "";
      }
    });

    render(<AddBlog />);

    fireEvent.click(screen.getByText(/Reset/i));

    expect(mockDispatch).toHaveBeenCalledWith(RsetBlogTitle(""));
    expect(mockDispatch).toHaveBeenCalledWith(RsetBlogContent(""));
    expect(mockDispatch).toHaveBeenCalledWith(RsetFormErrors({}));
    expect(mockRouter.replace).toHaveBeenCalledWith("/addblog");
  });
});

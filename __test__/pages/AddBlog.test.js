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

// Mock the necessary dependencies
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
          return ""; // Mock initial title
        case selectBlogContent:
          return ""; // Mock initial content
        case selectFormErrors:
          return {}; // Mock initial form errors
        default:
          return "";
      }
    });

    render(<AddBlog />);

    // Check if the form elements are rendered correctly
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    expect(screen.getByText(/Reset/i)).toBeInTheDocument();
  });

  it("validates form fields", async () => {
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case selectBlogTitle:
          return ""; // Mock blogTitle as empty
        case selectBlogContent:
          return ""; // Mock blogContent as empty
        case selectFormErrors:
          return {}; // Mock form errors
        default:
          return "";
      }
    });

    render(<AddBlog />);

    // Simulate form submission without filling the fields
    fireEvent.click(screen.getByText(/Submit/i));

    // Check if the validation errors are shown
    expect(mockDispatch).toHaveBeenCalledWith({
      type: RsetFormErrors.type,
      payload: {
        blogTitle: "Title can not be empty please write your title!",
        blogContent: "content can not be empty please write your content!",
      },
    });
  });

  it("submits the form and creates a blog post", async () => {
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case selectBlogTitle:
          return "Test Title"; // Mock non-empty blogTitle
        case selectBlogContent:
          return "Test Content"; // Mock non-empty blogContent
        case selectFormErrors:
          return {}; // Mock form errors
        default:
          return "";
      }
    });
    axios.post.mockResolvedValueOnce({ status: 201 });

    render(<AddBlog />);

    // Simulate form submission
    fireEvent.click(screen.getByText(/Submit/i));

    // Check if axios.post was called with the correct arguments
    expect(axios.post).toHaveBeenCalledWith("/api/posts", {
      title: "Test Title",
      content: "Test Content",
    });

    // Ensure that the dispatches are made to clear the form fields
    expect(mockDispatch).toHaveBeenCalledWith(RsetBlogTitle(""));
    expect(mockDispatch).toHaveBeenCalledWith(RsetBlogContent(""));
  });

  it("updates an existing blog post", async () => {
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case selectBlogTitle:
          return "Update Title"; // Mock non-empty blogTitle
        case selectBlogContent:
          return "Update Content"; // Mock non-empty blogContent
        case selectFormErrors:
          return {}; // Mock form errors
        default:
          return "";
      }
    });
    axios.put.mockResolvedValueOnce({ status: 200 });

    render(<AddBlog id="123" />);

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /Update/i }));

    // Check if axios.put was called with the correct arguments
    expect(axios.put).toHaveBeenCalledWith("/api/posts/123", {
      title: "Update Title",
      content: "Update Content",
    });
  });

  it("resets the form fields", () => {
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case selectBlogTitle:
          return "Some Title"; // Mock initial title
        case selectBlogContent:
          return "Some Content"; // Mock initial content
        case selectFormErrors:
          return {}; // Mock form errors
        default:
          return "";
      }
    });

    render(<AddBlog />);

    // Simulate reset button click
    fireEvent.click(screen.getByText(/Reset/i));

    // Check if the dispatches are called to reset the form
    expect(mockDispatch).toHaveBeenCalledWith(RsetBlogTitle(""));
    expect(mockDispatch).toHaveBeenCalledWith(RsetBlogContent(""));
    expect(mockDispatch).toHaveBeenCalledWith(RsetFormErrors({}));
    expect(mockRouter.replace).toHaveBeenCalledWith("/addblog");
  });
});

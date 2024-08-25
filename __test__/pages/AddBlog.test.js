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

  test("submits the form and creates a blog post", async () => {
    // Mock axios post request
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case selectBlogTitle:
          return "Test Title"; // Mock non-empty blogTitle
        case selectBlogContent:
          return "Test Content"; // Mock non-empty blogContent
        default:
          return "";
      }
    });
    axios.post.mockResolvedValueOnce({ status: 201 });

    render(<AddBlog />);

    // Simulate form submission
    fireEvent.click(screen.getByText(/Submit/i));

    // Check if axios.post was called with the correct arguments
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/api/posts", {
      title: "Test Title",
      content: "Test Content",
    });
    // Ensure that the dispatches are made to clear the form fields
    expect(mockDispatch).toHaveBeenCalledWith(RsetBlogTitle(""));
    expect(mockDispatch).toHaveBeenCalledWith(RsetBlogContent(""));
  });

  test("updates an existing blog post", async () => {
    // Mock axios put request
    useSelector.mockImplementation((selector) => {
      switch (selector) {
        case selectBlogTitle:
          return "Update Title"; // Mock non-empty blogTitle
        case selectBlogContent:
          return "Update Content"; // Mock non-empty blogContent
        default:
          return "";
      }
    });
    axios.put.mockResolvedValueOnce({ status: 200 });

    render(<AddBlog id="123" />);

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /Update/i }));

    // Check if axios.put was called with the correct arguments
    expect(axios.put).toHaveBeenCalledWith("http://localhost:3000/api/posts/123", {
      title: "Update Title",
      content: "Update Content",
    });
  });

  test("resets the form fields", () => {
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

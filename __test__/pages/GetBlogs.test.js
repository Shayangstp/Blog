import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Home, { getBlogs } from "../../src/components/Home"; // Adjust the path if necessary
import "@testing-library/jest-dom";
import BlogCard from "../../src/components/BlogCard";

// Mock axios and BlogCard
jest.mock("axios");
jest.mock("../../src/components/BlogCard", () => {
  return function DummyBlogCard({ title, content, id, update }) {
    return (
      <div data-testid="blog-card">
        <h1>{title}</h1>
        <p>{content}</p>
        <small>{update}</small>
      </div>
    );
  };
});

describe("Home Component", () => {
  it("fetches and displays blog posts", async () => {
    // Mock the response from axios
    const mockBlogPosts = [
      {
        _id: "1",
        title: "First Blog Post",
        content: "This is the content of the first blog post.",
        updatedAt: "2024-08-24T14:57:31.598Z",
      },
      {
        _id: "2",
        title: "Second Blog Post",
        content: "This is the content of the second blog post.",
        updatedAt: "2024-08-25T14:57:31.598Z",
      },
    ];
    axios.get.mockResolvedValueOnce({ data: mockBlogPosts });

    // Render the Home component
    const { container } = await render(await Home());

    // Wait for the posts to be loaded and rendered
    await waitFor(() => {
      expect(screen.getByText("First Blog Post")).toBeInTheDocument();
      expect(screen.getByText("Second Blog Post")).toBeInTheDocument();
    });

    // Check if the correct number of BlogCard components are rendered
    const blogCards = screen.getAllByTestId("blog-card");
    expect(blogCards).toHaveLength(mockBlogPosts.length);
  });

  it("handles API errors gracefully", async () => {
    // Mock a failed axios request
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch"));

    // Render the Home component
    const { container } = await render(await Home());

    // Wait for the component to finish rendering and check how it handles the error
    await waitFor(() => {
      expect(screen.queryAllByTestId("blog-card")).toHaveLength(0);
    });
  });
});

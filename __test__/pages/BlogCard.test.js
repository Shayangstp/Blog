import React from "react";
import { render, screen } from "@testing-library/react";
import BlogCard from "../../src/components/BlogCard"; // Adjust the path if necessary
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BlogCard Component", () => {
  it("renders BlogCard correctly with truncated content", () => {
    // Mock the useRouter hook
    const push = jest.fn();
    useRouter.mockReturnValue({
      push,
    });

    // Render the component with the necessary props
    render(
      <BlogCard
        title="Test Blog Post"
        content="This is the content of the test blog post that is supposed to be truncated after 20 words."
        id="1"
        update="2024-08-24T14:57:31.598Z"
      />
    );

    // Check if the title is rendered
    expect(screen.getByText("Test Blog Post")).toBeInTheDocument();

    // Check if the content is truncated correctly (using regex to match partial content)
    expect(
      screen.getByText(/This is the content of the test blog post that is supposed/)
    ).toBeInTheDocument();

    // Check if the date is formatted correctly
    expect(screen.getByText("published - Aug 24, 2024")).toBeInTheDocument();

    // Simulate the button click
    screen.getByText("Read More").click();

    // Assert that the router.push was called with the correct URL
    expect(push).toHaveBeenCalledWith("/blogDetail/1");
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import BlogCard from "../../src/components/BlogCard";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BlogCard Component", () => {
  test("renders BlogCard correctly with truncated content", () => {
    const push = jest.fn();
    useRouter.mockReturnValue({
      push,
    });

    render(
      <BlogCard
        title="Test Blog Post"
        content="This is the content of the test blog post that is supposed to be truncated after 20 words."
        id="1"
        update="2024-08-24T14:57:31.598Z"
      />
    );

    expect(screen.getByText("Test Blog Post")).toBeInTheDocument();

    expect(
      screen.getByText(/This is the content of the test blog post that is supposed/)
    ).toBeInTheDocument();

    expect(screen.getByText("published - Aug 24, 2024")).toBeInTheDocument();

    screen.getByText("Read More").click();

    expect(push).toHaveBeenCalledWith("/blogDetail/1");
  });
});

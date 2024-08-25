import startDb from "@/lib/db";
import BlogPostModel from "@/models/blogModel"; // Path to your BlogPost model
import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";

export async function GET(request, { params }) {
  try {
    await startDb();
    const { id } = params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid blog post ID" }, { status: 400 });
    }

    const blogPost = await BlogPostModel.findById(id);

    if (!blogPost) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(blogPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blog posts", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await startDb();

    const { id } = params;

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid blog post ID" }, { status: 400 });
    }

    const deletedBlogPost = await BlogPostModel.findByIdAndDelete(id);

    if (!deletedBlogPost) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog post deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete blog post", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await startDb();

    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Blog post ID is required" }, { status: 400 });
    }

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid blog post ID" }, { status: 400 });
    }

    const { title, content } = await request.json();

    if (!title && !content) {
      return NextResponse.json(
        { message: "Title or content must be provided to update" },
        { status: 400 }
      );
    }

    const updatedBlogPost = await BlogPostModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedBlogPost) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlogPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update blog post", error: error.message },
      { status: 500 }
    );
  }
}

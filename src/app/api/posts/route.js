import startDb from "@/lib/db";
import BlogPostModel from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await startDb();

    const blogPosts = await BlogPostModel.find({}).sort({ createdAt: -1 });

    return NextResponse.json(blogPosts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blog posts", error: error.message },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    await startDb();

    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ message: "Title and content are required." }, { status: 400 });
    }

    const newBlogPost = new BlogPostModel({ title, content });
    await newBlogPost.save();

    return NextResponse.json({ title, content }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create blog post", error: error.message },
      { status: 500 }
    );
  }
}

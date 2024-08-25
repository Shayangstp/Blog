import { Schema, model, models } from "mongoose";

// Define the blog post schema
const blogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create the BlogPost model
const BlogPostModel = models.BlogPost || model("BlogPost", blogPostSchema);

export default BlogPostModel;

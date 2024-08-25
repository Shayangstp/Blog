import React from "react";
import BlogCard from "./BlogCard";
import axios from "axios";

export const getBlogs = async () => {
  try {
    const response = await axios.get("https://blog-shayangstps-projects.vercel.app/api/posts");
    return response.data;
  } catch (err) {
    return [];
  }
};

const Home = async () => {
  const data = await getBlogs();
  return (
    <div className="flex gap-5 justify-center flex-wrap mt-10">
      {data.map((post) => (
        <BlogCard
          key={post._id}
          title={post.title}
          content={post.content}
          id={post._id}
          update={post.updatedAt}
        />
      ))}
    </div>
  );
};

export default Home;

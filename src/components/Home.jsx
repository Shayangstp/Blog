"use client";
import React from "react";
import BlogCard from "./BlogCard";
import axios from "axios";

// export const getBlogs = async () => {
//   try {
//     const response = await axios.get("https://blog-shayangstps-projects.vercel.app/api/posts", {
//       catch: "no-store",
//     });
//     return response.data;
//   } catch (err) {
//     return [];
//   }
// };

const Home = () => {
  // const data = await getBlogs();
  const [blogs, setBlogs] = React.useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/posts");
      setBlogs(response.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  return (
    <div className="flex gap-5 justify-center flex-wrap mt-10">
      {blogs.map((post) => (
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

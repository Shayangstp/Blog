"use client";
import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import axios from "axios";
import { Loading } from "@/lib/loading";

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
  const [blogs, setBlogs] = useState();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/posts");
      setBlogs(response.data);
    } catch (err) {
      setBlogs([]);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex gap-5 justify-center items-center flex-wrap mt-10">
      {blogs ? (
        blogs.map((post) => (
          <BlogCard
            key={post._id}
            title={post.title}
            content={post.content}
            id={post._id}
            update={post.updatedAt}
          />
        ))
      ) : (
        <div className="flex justify-center mt-[40%]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Home;

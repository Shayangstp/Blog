"use client";
import React, { useState, useEffect, Fragment } from "react";
import BlogCard from "./BlogCard";
import axios from "axios";
import { Loading } from "@/lib/loading";

const Home = () => {
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/posts");
      setBlogs(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setBlogs([]);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex gap-5 justify-center items-center flex-wrap mt-10">
      {!loading && blogs ? (
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
        <div className="flex justify-center mt-[10%]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Home;

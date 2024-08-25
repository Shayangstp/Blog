"use client";
import BlogDetail from "@/components/BlogDetail";
import React, { useState, useEffect } from "react";
import axios from "axios";

// const getBlogById = async (id) => {
//   const response = await axios.get(`/api/posts/${id}`);
//   return response.data;
// };

const page = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState();

  const fetchBlogById = async () => {
    try {
      const response = await axios.get(`/api/posts/${id}`);
      console.log(response);
      setData(response.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  useEffect(() => {
    fetchBlogById();
  }, []);

  return <div>{data && <BlogDetail data={data} />}</div>;
};

export default page;

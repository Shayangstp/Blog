import BlogDetail from "@/components/BlogDetail";
import React from "react";
import axios from "axios";

const getBlogById = async (id) => {
  const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
  return response.data;
};

const page = async ({ params }) => {
  const { id } = params;
  const data = await getBlogById(id);

  return <BlogDetail data={data} />;
};

export default page;

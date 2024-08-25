import React from "react";
import BlogDetail from "@/components/BlogDetail";
import axios from "axios";

// const getBlogById = async (id) => {
//   const response = await axios.get(`/api/posts/${id}`);
//   return response.data;
// };

const page = ({ params }) => {
  const { id } = params;

  return <BlogDetail id={id} />;
};

export default page;

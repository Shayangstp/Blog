import React from "react";
import BlogDetail from "@/components/BlogDetail";

const page = ({ params }) => {
  const { id } = params;

  return <BlogDetail id={id} />;
};

export default page;

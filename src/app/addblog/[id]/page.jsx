import AddBlog from "@/components/AddBlog";
import React from "react";

const page = async ({ params }) => {
  const { id } = params;
  return <AddBlog id={id} />;
};

export default page;

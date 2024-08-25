"use client";
import React from "react";
import { Button } from "./ui/button";
import { Pen, Target, Trash } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { RsetBlogContent, RsetBlogTitle } from "@/slices/mainSlices";
import { useRouter } from "next/navigation";
import { errorMessage, successMessage } from "@/lib/toast";
import { formatDate } from "@/lib/formatDate";

const deleteBlogPost = async (id) => {
  try {
    const response = await axios.delete(`/api/posts/${id}`);
    successMessage("Blog post deleted successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } catch (error) {
    errorMessage("Failed to delete blog post");
    console.error("Failed to delete blog post:", error.response?.data || error.message);
  }
};
const BlogDetail = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div id="detailContainer" className="mt-10">
      <div id="blogDetail" className="flex flex-col gap-5">
        <header className="flex justify-between mt-3 bg-gray-200 p-5 rounded-xl">
          <span className="flex flex-col gap-1">
            <span className="text-[30px] font-bold text-black">{data.title}</span>
            <span className="text-[15px] text-gray-600">
              Published - {formatDate(data.updatedAt)}
            </span>
          </span>
          <span className="flex gap-2 mt-1">
            <Button
              onClick={async () => {
                dispatch(RsetBlogTitle(data.title));
                dispatch(RsetBlogContent(data.content));
                router.push(`https://blog-shayangstps-projects.vercel.app/addblog/${data._id}`);
              }}
            >
              <Pen className="w-3 h-3 mr-1" />
              update
            </Button>
            <Button
              className="hover:bg-red-500"
              onClick={async () => {
                await deleteBlogPost(data._id);
              }}
            >
              <Trash className="w-3 h-3 mr-1" />
              delete
            </Button>
          </span>
        </header>
        <div className="text-[13px] mt-5 ml-5">{data.content}</div>
      </div>
    </div>
  );
};

export default BlogDetail;

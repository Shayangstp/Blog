"use client";
import React, { useState, useEffect, Fragment } from "react";
import { Button } from "./ui/button";
import { Pen, Trash } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { RsetBlogContent, RsetBlogTitle } from "@/slices/mainSlices";
import { useRouter } from "next/navigation";
import { errorMessage, successMessage } from "@/lib/toast";
import { formatDate } from "@/lib/formatDate";
import { Loading } from "@/lib/loading";

const formatContent = (content) => {
  return content.split("\n").map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));
};

const deleteBlogPost = async (id) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    successMessage("Blog post deleted successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  } catch (error) {
    errorMessage("Failed to delete blog post");
  }
};

const BlogDetail = ({ id }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchBlogById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/posts/${id}`);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogById();
  }, []);

  return (
    <div id="detailContainer" className="mt-3">
      <div id="buttons" className="flex gap-2 justify-end">
        <Button
          className="lg:text-[13px] text-[11px]"
          variant="secondary"
          onClick={() => {
            dispatch(RsetBlogTitle(data.title));
            dispatch(RsetBlogContent(data.content));
            router.push(`/addblog/${data._id}`);
          }}
        >
          <Pen className="w-3 h-3 mr-1" />
          update
        </Button>
        <Button
          variant="secondary"
          className="hover:bg-red-500 lg:text-[13px] text-[11px]"
          onClick={async () => {
            await deleteBlogPost(data._id);
          }}
        >
          <Trash className="w-3 h-3 mr-1" />
          delete
        </Button>
      </div>
      {!loading && data ? (
        <div id="blogDetail" className="flex flex-col gap-5">
          <div
            id="header"
            className="flex justify-between mt-3 bg-gray-200 p-5 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              <span className="lg:text-[30px] text-[20px] font-bold text-black  overflow-hidden break-words">
                {data.title}
              </span>
              <span className="lg:text-[15px] text-[12px] text-gray-600">
                Published - {formatDate(data.updatedAt)}
              </span>
            </div>
          </div>
          <div className="text-[15px] mt-5 ml-5 break-words">{formatContent(data.content)}</div>
        </div>
      ) : (
        <div className="flex justify-center mt-[10%]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default BlogDetail;

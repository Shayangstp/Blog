"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/formatDate";

const truncateText = (text, maxWords) => {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return text;
};

const BlogCard = ({ title, content, id, update }) => {
  const router = useRouter();
  const formattedDate = formatDate(update);
  return (
    <div
      id="cardContainer"
      className="lg:w-[40%] w-[90%] h-[200px] border border-gray-300 p-3 rounded-lg flex flex-col"
    >
      <div id="cardDetailContainer" className="flex flex-col gap-2 mt-2 flex-1">
        <header className=" border-b pb-2 border-gray-500 flex flex-col gap-1">
          <span className="font-bold text-[20px]">{title}</span>
          <span className="text-[12px] text-gray-400">published - {formattedDate}</span>
        </header>
        <div className="xl:text-[14px] text-[12px] text-gray-100">{truncateText(content, 20)}</div>
      </div>
      <div className="flex justify-end items-end mt-auto">
        <Link href={`/blogDetail/${id}`}>
          <Button variant="secondary" className="text-[10px] lg:text-[13px]">
            Read More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

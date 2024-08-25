import Link from "next/link";
import React from "react";
import { Plus } from "lucide-react";

const Nav = () => {
  return (
    <div
      id="navContainer"
      className="flex justify-between items-center gap-5 p-4 border-b border-gray-500"
    >
      <Link href="/" id="logo" className="text-[12px] lg:text-[14px]">
        ShayanGstp_Blog
      </Link>
      <Link
        href="/"
        className="cursor-pointer hover:text-gray-400 transition-all text-[12px] lg:text-[14px]"
      >
        Home
      </Link>
      <Link
        variant="secondary"
        href="/addblog"
        className="flex items-center border px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
      >
        <Plus className="me-1 w-4 h-4" />
        <span className="text-[12px] lg:text-[13px]">Add Blog</span>
      </Link>
    </div>
  );
};

export default Nav;

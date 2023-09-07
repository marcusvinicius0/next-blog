"use client";
import { useState } from "react";
import Link from "next/link";

export default function AdminNavigationLayout({}) {
  const [tabNavCreateBlog, setTabNavCreateBlog] = useState<boolean>(false);
  const [tabNavListBlog, setTabNavListBlog] = useState<boolean>(false);

  const handleTabNavCreate = () => {
    if (tabNavListBlog) {
      setTabNavListBlog(false);
    }
    setTabNavCreateBlog(!tabNavCreateBlog);
  };

  const handleTabNavList = () => {
    if (tabNavCreateBlog) {
      setTabNavCreateBlog(false);
    }
    setTabNavListBlog(!tabNavListBlog);
  };

  return (
    <nav className="bg-white flex justify-center items-center space-x-4 h-10">
      <Link href="/" className="p-2 font-semibold">
        Home
      </Link>
      <Link
        onClick={() => handleTabNavCreate()}
        href="/dashboard/admin/blog/create"
        className={`p-2 font-semibold ${
          tabNavCreateBlog && "border-b-2 border-blue-300"
        }`}
      >
        Create Blog
      </Link>
      <Link
        onClick={() => handleTabNavList()}
        href="/dashboard/admin/blog/list"
        className={`p-2 font-semibold ${
          tabNavListBlog && "border-b-2 border-blue-300"
        }`}
      >
        {`Blog's`} List
      </Link>
    </nav>
  );
}

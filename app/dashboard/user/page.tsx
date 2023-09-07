"use client";
import { useState, useEffect } from "react";
import BlogList from "@/components/blogs/BlogList";
import toast from "react-hot-toast";

export default function UserDashboard({}) {
  const [likedBlogs, setLikedBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/liked-blogs`);

      if (!response.ok) {
        toast.error("Failed to fetch liked blogs");
        throw new Error("Failed to fetch liked blogs");
      } else {
        const data = await response.json();
        setLikedBlogs(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-2">
      <div>
        <div>
          <h3 className="text-3xl">Liked Blogs</h3>
          {/* <pre>{JSON.stringify(likedBlogs, null, 4)}</pre> */}
          <BlogList blogs={likedBlogs} />
        </div>
      </div>
    </div>
  );
}

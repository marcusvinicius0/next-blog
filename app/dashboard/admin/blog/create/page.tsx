"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
// @ts-ignore
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Image from "next/image";

import { Blog } from "@/@types/admin/blog";

export default function AdminBlogCreate() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await fetch(process.env.CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setLoading(false);
          const data = await response.json();
          console.log("res.json", data);
          setImage(data.secure_url);
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  };
  // image upload to cloudinary

  //type -> React.FormEvent<HTMLFormElement>
  const handleSubmit = async (e: any) => {
    try {
      const blogData: Blog = { title, content, category, image };
      const response = await fetch(`${process.env.API}/admin/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        router.push("/dashboard/admin");
        toast.success("Blog created successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.err);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  // submit to create blog api
  const createBlog = () => {};

  // return tsx / blog create form
  return (
    <div className="mt-5 p-2">
      <div>
        <h3 className="text-lg">Create blog</h3>
        <div className="flex flex-col mt-6 space-y-6">
          <label htmlFor="" className="font-semibold">
            Blog title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-b-2 outline-none bg-transparent border-b-blue-500"
          />

          <label htmlFor="" className="font-semibold">
            Blog content
          </label>
          <ReactQuill
            className=""
            value={content}
            onChange={(e) => setContent(e)}
          />

          <label htmlFor="" className="font-semibold">
            Blog category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-b-2 outline-none bg-transparent border-b-blue-500"
          />

          {image && (
            <Image
              src={image}
              alt=""
              width={100}
              height={100}
              className="object-contain"
            />
          )}

          <div className="flex space-x-8">
            <button type="button">
              <label
                htmlFor="upload-button"
                className="border cursor-pointer p-2 bg-slate-100/80"
              >
                {loading ? "Uploading..." : "Upload image"}
              </label>

              <input
                id="upload-button"
                type="file"
                accept="image/*"
                onChange={uploadImage}
                hidden
              />
            </button>

            <button
              className="border cursor-pointer p-2 bg-slate-100/80 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

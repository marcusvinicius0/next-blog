"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
// @ts-ignore
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

type Props = {};

export default function AdminBlogCreate({}: Props) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  console.log(router);

  const uploadImage = async (e: any) => {
    //
  };
  // image upload to cloudinary

  const handleSubmit = async (e: any) => {
    //
  };
  // submit to create blog api

  // return tsx / blog create form
  const createBlog = () => {};

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
              className="border cursor-pointer p-2 bg-slate-100/80"
              disabled={loading}
              onClick={createBlog}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

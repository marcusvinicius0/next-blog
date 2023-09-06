"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
// @ts-ignore
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Image from "next/image";

import { Blog } from "@/@types/admin/blog";

import { BsFillInfoCircleFill } from "react-icons/bs";
import { ImSpinner } from "react-icons/im";

export default function AdminBlogUpdate({ params }) {
  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitDeleteLoading, setSubmitDeleteLoading] =
    useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const getBlogs = async () => {
    try {
      const response = await fetch(`${process.env.API}/blog/${params.slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog.");
      } else {
        const data = await response.json();
        setId(data._id);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setImage(data.image);
        setLink(data.link);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch blog.");
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    setSubmitLoading(true);
    try {
      const blogData: Blog = { title, content, category, image, link };
      const response = await fetch(`${process.env.API}/admin/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        setSubmitLoading(false);
        router.push("/dashboard/admin");
        toast.success("Blog edited successfully.");
      } else {
        setSubmitLoading(false);
        const errorData = await response.json();
        toast.error(errorData.err);
      }
    } catch (err) {
      setSubmitLoading(false);
      console.log(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleDelete = async () => {
    setSubmitDeleteLoading(true);
    try {
      const blogData = { title, content, category, image, link };
      const response = await fetch(`${process.env.API}/admin/blog/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        setSubmitDeleteLoading(false);
        // router.push("/dashboard/admin");
        window.location.href = "/dashboard/admin/blog/list";
        toast.success("Blog deleted successfully.");
      } else {
        setSubmitDeleteLoading(false);
        const errorData = await response.json();
        toast.error(errorData.err);
      }
    } catch (err) {
      setSubmitDeleteLoading(false);
      console.log(err);
      toast.error("Failed to delete this blog. Please try again.");
    }
  };

  return (
    <div className="mt-5 p-2">
      <div>
        <h3 className="text-lg">Edit blog</h3>
        <div className="flex flex-col mt-6 space-y-6">
          <label htmlFor="" className="font-semibold">
            Blog title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-b-2 outline-none bg-transparent border-b-blue-500"
            title={title}
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

          <label htmlFor="" className="font-semibold flex gap-1">
            Blog Link
            <BsFillInfoCircleFill
              size={12}
              className="text-blue-700"
              title="Have you gotten a blog from another person? Pass the original link here."
            />
          </label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border-b-2 outline-none bg-transparent border-b-blue-500 text-blue-800"
            title={link}
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
              className="border cursor-pointer p-2 bg-slate-100/80 disabled:cursor-not-allowed min-w-[50.67px] flex justify-center"
              disabled={submitLoading || !title || !content || !category}
              onClick={handleSubmit}
            >
              {submitLoading ? <ImSpinner className="animate-spin" /> : "Save"}
            </button>
            <button
              className="border cursor-pointer p-2 bg-red-500/80 disabled:cursor-not-allowed min-w-[50.67px] flex justify-center text-white"
              onClick={handleDelete}
              title={`Preencha os campos obrigatórios.`}
            >
              {submitDeleteLoading ? (
                <ImSpinner className="animate-spin" />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Image from "next/image";
dayjs.extend(relativeTime);

import BlogLike from "./BlogLike";

export default function BlogCard({ blog }) {
  return (
    <div className="w-full mt-10 bg-slate-50 shadow-sm">
      <div>
        <Image
          src={blog?.image || "/mountains.png"}
          className="object-contain w-full"
          width={200}
          height={200}
          alt={blog?.title}
        />
      </div>

      <div className="p-1">
        <h5 className="text-2xl font-semibold text-blue-400 underline hover:text-blue-400/90">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h5>
        <hr className="mt-1" />
        <div className="pt-4 flex flex-col">
          {/* <div
            className="bg-none text-ellipsis"
            dangerouslySetInnerHTML={{
              __html:
                // blog.content.length > 260
                // ? `${blog.content.substring(0, 160)}...` : ''
                blog.content,
            }}
          ></div> */}
          <p
            className="text-ellipsis overflow-hidden whitespace-pre-wrap max-h-48"
            dangerouslySetInnerHTML={{
              __html: blog?.content,
            }}
          ></p>
          {blog?.content.length >= 245 && <span className="font-bold">...</span>}
        </div>
        <div className="flex flex-col space-y-2 mt-5">
          <hr />

          <span className="font-semibold">Category: {blog?.category}</span>
          <span className="font-semibold">
            Author: {blog?.postedBy?.name || "Admin"}
          </span>
          <span>
            <b>Source:</b>{" "}
            <a
              href={blog?.link}
              rel="noopener noreferrer"
              target="_blank"
              className="text-blue-400"
            >
              {blog?.link}
            </a>
          </span>
          <div className="flex justify-between pt-3">
            <BlogLike blog={blog} />
            <strong className="text-sm">
              Posted {dayjs(blog?.createdAt).fromNow()}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

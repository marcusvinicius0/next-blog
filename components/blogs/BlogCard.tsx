import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Image from "next/image";
dayjs.extend(relativeTime);

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
        <div className="pt-4">
          <div
            className="bg-black-100/40"
            dangerouslySetInnerHTML={{
              __html:
                blog.content.length > 160
                  ? `${blog.content.substring(0, 160)}...`
                  : blog.content,
            }}
          ></div>
        </div>
        <footer className="flex flex-col space-y-2 mt-5">
          <hr />

          <small>
            <strong>Category:</strong> {blog?.category}
          </small>
          <small>
            <strong>Author:</strong> {blog?.postedBy?.name || "Admin"}
          </small>
          <div className="flex justify-between pt-3">
            <p>❤️ {blog?.likes?.length} likes</p>
            <strong className="text-sm">
              Posted {dayjs(blog?.createdAt).fromNow()}
            </strong>
          </div>
        </footer>
      </div>
    </div>
  );
}

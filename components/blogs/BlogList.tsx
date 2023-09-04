import BlogCard from "./BlogCard";

export default function BlogList({ blogs }) {
  return (
    <div className="mt-6">
      <div>
        {blogs?.map((blog) => (
          <div key={blog._id} className="columns-4xl w-full flex gap-20">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}

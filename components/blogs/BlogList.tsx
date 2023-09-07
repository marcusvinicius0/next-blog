import BlogCard from "./BlogCard";

export default function BlogList({ blogs }) {
  return (
    <div className="mt-6 w-full">
      <div className="lg:flex lg:flex-wrap lg:justify-evenly lg:gap-4">
        {blogs?.map((blog) => (
          <div key={blog._id} className="max-w-[459px] mx-auto lg:mx-0">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}

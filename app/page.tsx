import queryString from "query-string";
import Link from "next/link";

import Image from "next/image";

async function getBlogs(searchParams: any) {
  // console.log(searchParams);
  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = new URLSearchParams(urlParams).toString();
  // console.log("search query: " + searchQuery);

  const response = await fetch(`${process.env.API}/blog?${searchQuery}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 1 },
  });

  if (!response.ok) {
    console.log("Failed to fetch blogs => " + response);
    throw new Error("Failed to fetch blogs");
  }

  const data = await response.json();
  return data; // { blogs, currentPage, totalPages }
}

export default async function Home({ searchParams }) {
  const data = await getBlogs(searchParams);
  // console.log("data in home page => ", data);
  const { blogs, currentPage, totalPages } = data;

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  console.log(blogs.map((blog) => blog.title));
  return (
    <div className="max-w-5xl bg-red-50">
      <h3>Home</h3>
      <pre>{JSON.stringify(data, null, 4)}</pre>

      <div className="">
        <nav className="">
          <ul className="flex flex-row items-center justify-center space-x-6">
            {hasPreviousPage && (
              <li>
                <Link href={`?page=${currentPage - 1}`}>Previous</Link>
              </li>
            )}

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <li
                  key={page}
                  className={`${
                    currentPage === page
                      ? "bg-blue-100/90 rounded-full p-1"
                      : "p-1"
                  }`}
                >
                  <Link href={`?page=${page}`}>{page}</Link>
                </li>
              );
            })}

            {hasNextPage && (
              <li>
                <Link href={`?page=${currentPage + 1}`}>Next</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

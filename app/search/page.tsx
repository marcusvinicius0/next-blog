"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/hooks";
import BlogList from "@/components/blogs/BlogList";

export default function SearchPage({}) {
  // @ts-ignore
  const { setSearchQuery, searchResults, setSearchResults } = useSearch();

  const searchParams = useSearchParams();
  const query = searchParams.get("searchQuery");

  useEffect(() => {
    fetchResultsOnLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const fetchResultsOnLoad = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/search?searchQuery=${query}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-2">
      <div>
        <div>
          <p>Search result: {searchResults?.length}</p>
          {searchResults ? <BlogList blogs={searchResults} /> : ""}
        </div>
      </div>
    </div>
  );
}

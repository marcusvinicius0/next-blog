/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useSearch } from "@/hooks";

import defaultUserAvatar from "../public/user-img.svg";

import { BiSearchAlt2 } from "react-icons/bi";
import { PiSignOutBold } from "react-icons/pi";

export default function TopNavigation({}) {
  const { data, status } = useSession();

  // @ts-ignore
  const { searchQuery, setSearchQuery, fetchSearchResults } = useSearch();
  // console.log(searchQuery, setSearchQuery, fetchSearchResults);

  return (
    <nav
      className={`p-2 shadow-gray-500/50 shadow-md flex items-center mb-3 h-[65px] ${
        status === "authenticated" ? "justify-between" : "justify-between"
      }`}
    >
      {status !== "authenticated" && (
        <Link href="/" className="uppercase tracking-[5px] font-semibold">
          Blog
        </Link>
      )}

      {status === "authenticated" && (
        <form action="" onSubmit={fetchSearchResults} className="flex">
          <input
            type="search"
            placeholder="Search something..."
            aria-label="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="w-48 text-sm pt-2 relative border-b border-blue-700/50 font-semibold bg-whitesmoke outline-none"
          />
          <button className="absolute top-7 right-32">
            <BiSearchAlt2 size={16} />
          </button>
        </form>
      )}

      {status === "authenticated" ? (
        <div className="flex items-center space-x-4">
          {/* {data.user?.role === "admin" && (
            <p className="font-semibold text-xs uppercase tracking-[5px]">
              admin
            </p>
          )} */}
          <Link
            href={`/dashboard/${
              // @ts-ignore
              data?.user?.role === "admin" ? "admin" : "user"
            }`}
            className="text-white flex items-center space-x-2 md:w-fit"
          >
            <img
              className="rounded-full w-[42px] h-[42px] 
                "
              src={
                !data?.user?.image ? defaultUserAvatar.src : data?.user?.image
              }
              alt="User avatar"
            />
          </Link>
          <a
            className="text-black cursor-pointer hover:bg-slate-50/80 w-8 flex items-center justify-center"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <PiSignOutBold size={26} className="" />
          </a>
        </div>
      ) : (
        <div className="flex space-x-6">
          <Link href="/login" className="bg-blue-400 text-white p-1">
            Login
          </Link>
          <Link href="/register" className="border-b border-blue-400 p-1">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

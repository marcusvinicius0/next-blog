/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
type Props = {};
import Image from "next";

export default function TopNavigation({}: Props) {
  const { data, status } = useSession();
  console.log(data, status);

  return (
    <nav className="p-2 shadow-md flex justify-between items-center mb-3 h-[65px]">
      <Link href="/" className="uppercase tracking-[5px] font-semibold">
        Blog
      </Link>

      {status === "authenticated" ? (
        <>
          <div className="flex space-x-6">
            <Link href="/dashboard/user" className="text-white flex items-center space-x-4 w-12 md:w-fit">
              <p className={`collapse md:visible text-ellipsis overflow-hidden whitespace-nowrap w-48  text-base font-semibold text-gray-900`}>{data?.user?.name}</p>
              <img className="rounded-full w-[40px] h-[40px]" src={data?.user.image} alt="User avatar" />
            </Link>
            <a
              className="border-b border-blue-400 text-black p-1 cursor-pointer hover:bg-slate-50/80"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Logout
            </a>
          </div>
        </>
      ) : (
        <div className="flex space-x-6">
          <Link href="/login" className="bg-blue-400 text-white p-1">
            Login
          </Link>
          <Link
            href="/register"
            className="border-b border-blue-400 text-black p-1"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

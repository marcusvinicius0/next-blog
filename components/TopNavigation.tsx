"use client";

import Link from "next/link";

type Props = {};

export default function TopNavigation({}: Props) {
  return <nav className="p-2 shadow-md flex justify-between items-center mb-3 h-[55px]">
    <Link href="/" className="uppercase tracking-[5px] font-semibold">Blog</Link>

    <div className="flex space-x-6">
      <Link href="/login" className="bg-blue-400 text-white p-1">
        Login
      </Link>
      <Link href="/register" className="border-b border-blue-400 text-black p-1">
        Register
      </Link>
    </div>
  </nav>;
}

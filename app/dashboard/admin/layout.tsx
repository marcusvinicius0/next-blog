import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <>
      <nav className="bg-white flex justify-center items-center space-x-4 h-10">
        <Link href="/dashboard/admin">Admin</Link>

        <Link href="/dashboard/admin/blog/create">Create Blog</Link>
      </nav>
      {children}
    </>
  );
}

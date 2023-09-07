import { NextResponse } from "next/server";
import dbConnection from "@/utils/dbConnect";
import Blog from "../../../../models/Blog";
import { getToken } from "next-auth/jwt";

export async function GET(req: any) {
  await dbConnection();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  try {
    // @ts-ignore
    const blogs = await Blog.find({ likes: token.user._id });
    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "Server error. Please try again." },
      { status: 500 }
    );
  }
}

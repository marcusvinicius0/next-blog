import { NextResponse } from "next/server";
import dbConnection from "@/utils/dbConnect";
import Blog from "../../../../../models/Blog";
import { getToken } from "next-auth/jwt";

export async function PUT(req: any) {
  await dbConnection();
  const _req = await req.json();
  const { blogId } = _req;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  try {
    const updated = await Blog.findByIdAndUpdate(
      blogId,
      {
        // @ts-ignore
        $addToSet: { likes: token.user._id },
      },
      {
        new: true,
      }
    );
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "Server error. Please try again." },
      { status: 500 }
    );
  }
}

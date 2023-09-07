import { NextResponse } from "next/server";
import dbConnection from "@/utils/dbConnect";
import Blog from "../../../../../models/Blog";

export async function PUT(req: any, context) {
  await dbConnection();
  const _req = await req.json();
  console.log("context params => ", context.params);

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      context.params.id,
      {
        ..._req,
      },
      { new: true }
    );
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  await dbConnection();

  try {
    const deletedBlog = await Blog.findByIdAndDelete(context.params.id);
    return NextResponse.json(deletedBlog, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}

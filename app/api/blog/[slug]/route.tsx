import { NextResponse } from "next/server";
import dbConnection from "@/utils/dbConnect";
import Blog from "../../../../models/Blog";

export async function GET(req, context) {
  await dbConnection();

  try {
    const blog = await Blog.findOne({ slug: context.params.slug }).populate(
      "postedBy",
      "name"
    );

    if (!blog) {
      return NextResponse.json({ err: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

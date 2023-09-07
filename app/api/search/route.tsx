import { NextResponse } from "next/server";
import Blog from "../../../models/Blog";
import dbConnection from "@/utils/dbConnect";
import queryString from "query-string";

export async function GET(req: any) {
  await dbConnection();
  const { searchQuery } = queryString.parseUrl(req.url).query;

  try {
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
      ],
    }).sort({ createdAt: -1 }); // sort by latest data
    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
}

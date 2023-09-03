import { NextResponse } from "next/server";
import dbConnection from "../../../utils/dbConnect";
import Blog from "../../../models/Blog";
import queryString from "query-string";

export async function GET(req: Request) {
  await dbConnection();

  const searchParams = queryString.parseUrl(req.url).query;

  const { page } = searchParams || {};
  const pageSize = 6;

  try {
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;
    const totalBlogs = await Blog.countDocuments({});

    const blogs = await Blog.find({})
      // .populate("postedBy", "name") MissingSchemaError: Schema hasn't been registered for model "User".
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      blogs,
      currentPage,
      totalPages: Math.ceil(totalBlogs / pageSize),
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: `CAIU aqui: ${err.message}` }, { status: 500 });
  }
}

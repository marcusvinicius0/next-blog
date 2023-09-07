import { NextResponse } from "next/server";
import dbConnection from "@/utils/dbConnect";
import Blog from "../../../../models/Blog";
import slugify from "slugify";
import { getToken } from "next-auth/jwt";

export async function POST(req: Request, res: Response) {
  const _req = await req.json();
  await dbConnection();

  try {
    const { title, content, category, image, link } = _req;
    switch (true) {
      case !title:
        return NextResponse.json(
          { err: "Title is required." },
          { status: 400 }
        );
      case !content:
        return NextResponse.json(
          { err: "Content is required." },
          { status: 400 }
        );
      case !category:
        return NextResponse.json(
          { err: "Category is required." },
          { status: 400 }
        );
    }

    const existingBlog = await Blog.findOne({
      slug: slugify(title?.toLowerCase()),
    });

    const token = await getToken({
      // @ts-ignore
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (existingBlog) {
      return NextResponse.json(
        { err: "Blog title is already taken" },
        { status: 400 }
      );
    } else {
      const blog = await Blog.create({
        title,
        content,
        category,
        image: image ? image : null,
        link: link ? link : "",
        //@ts-ignore
        postedBy: token.user._id,
        slug: slugify(title),
      });

      return NextResponse.json(blog, { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

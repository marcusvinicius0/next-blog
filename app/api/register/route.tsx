import { NextResponse } from "next/server";
import dbConnection from "@/utils/dbConnect";
import User from "../../../models/user";
import bcrypt from "bcrypt";

export async function POST(req: Request, res: Response) {
  const _req: any = await req.json(); //req.body - only way to access req.body
  // console.log(_req);

  await dbConnection();

  try {
    const { name, email, password } = _req;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { err: "Email already exists" },
        { status: 409 } // conflict status
      );
    } else {
      await new User({
        name,
        email,
        image: '',
        password: await bcrypt.hash(password, 10),
      }).save();

      return NextResponse.json({
        success: "Registration successful."
      })
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { err: "Server error. Try again." },
      { status: 500 }
    );
  }
}


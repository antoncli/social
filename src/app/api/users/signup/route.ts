import { connect } from "@/share/api/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getJwtTokenResponse } from "@/share/api/users/helpers/getJwtTokenResponse";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ message: "User already exist!" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return getJwtTokenResponse(savedUser._id, savedUser.email, "User created!", 201);
  } catch (error) {
    console.log(error);
    const message = error instanceof Error ? error.message : "Unknown error!";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

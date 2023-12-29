import { connect } from "@/share/api/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getJwtTokenResponse } from "@/share/api/users/helpers/getJwtTokenResponse";
import { processRequestError } from "@/share/api/helpers/processRequestError";

connect();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ message: "User already exist!" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return getJwtTokenResponse(savedUser._id, savedUser.email, "User created!", 201);
  } catch (error) {
    return processRequestError(error);
  }
}

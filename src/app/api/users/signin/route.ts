import { connect } from "@/share/api/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getJwtTokenResponse } from "@/share/api/users/helpers/getJwtTokenResponse";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    return getJwtTokenResponse(user._id, user.email, "Loged in!");
  } catch (error) {
    console.log(error);
    const message = error instanceof Error ? error.message : "Unknown error!";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

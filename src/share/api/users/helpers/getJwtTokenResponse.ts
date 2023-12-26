import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const getJwtTokenResponse = (id: Types.ObjectId, email: string, message: string, status: number = 200) => {
  const tokenData = {
    id,
    email,
  };
  const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "15m" });

  const response = NextResponse.json({ message }, { status });
  response.cookies.set("token", token, { httpOnly: true });
  return response;
};

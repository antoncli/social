import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const isAuthorized = async (request: NextRequest) => {
  const token = request.cookies.get("token");

  if (token == undefined) return;

  try {
    return jwt.verify(token.value, process.env.JWT_SECRET_KEY!);
  } catch {
    return;
  }
};

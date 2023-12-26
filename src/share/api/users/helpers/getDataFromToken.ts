import jwt from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const getDataFromToken = (token: RequestCookie): string | jwt.JwtPayload | Error[] => {
  try {
    const decodedToken = jwt.verify(token.value, process.env.JWT_SECRET_KEY!);
    return decodedToken;
  } catch (error) {
    if (error instanceof Error) return [error];
    return [new Error("Unknown error")];
  }
};

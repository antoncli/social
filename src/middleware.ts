import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthorized } from "./share/api/users/helpers/isAuthorized";

const publicPath = ["/signup", "/signin", "/authorized"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = publicPath.includes(path);
  const authorized = await isAuthorized(request);

  if (!isPublicPath && !authorized) NextResponse.redirect(new URL("/signin", request.nextUrl));
  if (isPublicPath && authorized) NextResponse.redirect(new URL("/feed", request.nextUrl));
}

export const config = {
  matcher: ["/signup", "/signin", "/signout", "/api/users/:path*"],
};

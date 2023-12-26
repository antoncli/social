import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Sign out!" });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    console.log(error);
    const message = error instanceof Error ? error.message : "Unknown error!";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { serviceGet } from "./service";
import { processError } from "@/share/api/helpers/processError";

export async function GET(request: NextRequest) {
  try {
    const users = await serviceGet(request.url);
    if (users instanceof Error) return NextResponse.json({ error: users.message }, { status: 500 });
    return NextResponse.json(users);
  } catch (error) {
    const pError = processError(error);
    return NextResponse.json({ error: pError.message }, { status: 500 });
  }
}

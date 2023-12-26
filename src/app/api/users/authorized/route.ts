import { AuthorizedSchema } from "@/schemas/AuthorizedSchema";
import { isAuthorized } from "@/share/api/users/helpers/isAuthorized";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type Authorized = z.infer<typeof AuthorizedSchema>;

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json<Authorized>({ authorized: (await isAuthorized(request)) != undefined });
  } catch (error) {}
}

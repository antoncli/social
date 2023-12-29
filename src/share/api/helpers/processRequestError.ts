import { NextResponse } from "next/server";
import { z } from "zod";

export const processRequestError = (error: any): NextResponse<{ error: string }> => {
  console.log(error);
  if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (error instanceof z.ZodError) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ error: "Unknown error!" }, { status: 500 });
};

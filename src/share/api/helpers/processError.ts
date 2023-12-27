import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { z } from "zod";

export const processError = (error: any): Error => {
  console.log(error);
  if (error instanceof Error) return new Error("Unexpected error!");
  if (error instanceof z.ZodError) return new Error("Data parse error!");
  if (error instanceof mongoose.Error) return new Error("Database error!");
  return new Error("Unexpected error!");
};

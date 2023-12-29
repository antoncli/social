import { SafeUserSchema } from "@/schemas/safe/SafeUserSchema";
import { dbGet } from "./db";
import { processError } from "@/share/api/helpers/processError";
import { z } from "zod";

type TSafeUserSchema = z.infer<typeof SafeUserSchema>;

export async function serviceGet(url: string): Promise<TSafeUserSchema[] | Error> {
  try {
    const { searchParams } = new URL(url);
    const input = searchParams.get("input");
    const page = parseInt(searchParams.get("page") || "");
    let limit: number | undefined = parseInt(searchParams.get("limit") || "");

    if (input == undefined) return new Error("Query parameter input is undefined");
    if (page == undefined || Number.isNaN(page)) return new Error("Query parameter page is undefined");
    if (Number.isNaN(limit)) limit = undefined;

    const users = await dbGet(input, page, limit);
    if (users instanceof Error) return users;

    const safeUsers: TSafeUserSchema[] = users.map((user) => {
      return { name: user.name };
    });

    return safeUsers;
  } catch (error) {
    return processError(error);
  }
}

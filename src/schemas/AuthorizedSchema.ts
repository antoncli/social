import { z } from "zod";

export const AuthorizedSchema = z.object({
  authorized: z.boolean(),
});

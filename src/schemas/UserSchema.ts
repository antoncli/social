import { z } from "zod";

export const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  isVerified: z.boolean(),
  isAdmin: z.boolean(),
});

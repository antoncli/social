import { z } from "zod";

export const FriendSchema = z.object({
  friend: z.boolean(),
});

export type Friend = z.infer<typeof FriendSchema>;

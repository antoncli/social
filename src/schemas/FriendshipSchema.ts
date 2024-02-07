import { z } from "zod";

export const FriendshipSchema = z.object({
  name1: z.string(),
  name2: z.string(),
  accepted: z.boolean(),
});

export type Friendship = z.infer<typeof FriendshipSchema>;

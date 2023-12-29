import { z } from "zod";

export const FriendshipSchema = z.object({
  user1: z.string(),
  user2: z.string(),
  accepted: z.boolean(),
});

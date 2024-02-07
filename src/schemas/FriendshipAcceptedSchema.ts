import { z } from "zod";

export const FriendshipAcceptedSchema = z.object({
  accepted: z.boolean(),
});

export type SafeAcceptedFriend = z.infer<typeof FriendshipAcceptedSchema>;

import { FriendshipSchema } from "@/schemas/FriendshipSchema";
import mongoose, { Model } from "mongoose";
import { z } from "zod";

type TFriendship = z.infer<typeof FriendshipSchema>;

const friendshipSchema = new mongoose.Schema<TFriendship>({
  user1: {
    type: String,
    required: [true, "Please provide user1!"],
  },
  user2: {
    type: String,
    required: [true, "Please provide user2!"],
  },
  accepted: {
    type: Boolean,
    required: [true, "Please provide accepted!"],
  },
});

const Friendship =
  (mongoose.models?.Friendship as Model<TFriendship>) || mongoose.model<TFriendship>("Friendship", friendshipSchema);

export default Friendship;

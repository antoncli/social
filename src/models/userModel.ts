import mongoose, { Model } from "mongoose";
import { UserSchema } from "@/schemas/UserSchema";
import { z } from "zod";

export type TUser = z.infer<typeof UserSchema>;

const userSchema = new mongoose.Schema<TUser>({
  name: {
    type: String,
    required: [true, "Please provide a name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email!"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please provide a password!"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = (mongoose.models?.User as Model<TUser>) || mongoose.model<TUser>("User", userSchema);

export default User;

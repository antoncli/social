import { TSafeUserSchema } from "@/schemas/safe/SafeUserSchema";

export type FriendsPayload = {
  id: string;
  input: string;
};

export default function Friends({ id, input }: FriendsPayload) {
  return <div>Friends</div>;
}

import { TSafeUserSchema } from "@/schemas/safe/SafeUserSchema";

export type PostsPayload = {
  id: string;
  user: TSafeUserSchema;
};

export default function Posts({ id, user }: PostsPayload) {
  return <div>Posts</div>;
}

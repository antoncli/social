import { TSafeUserSchema } from "@/schemas/safe/SafeUserSchema";

export type PostsPayload = {
  user: TSafeUserSchema;
};

type Props = PostsPayload & { id: number };

export default function Posts({ id, user }: Props) {
  return <div>Posts</div>;
}

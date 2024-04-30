import { z } from "zod";

export const PostSchema = z.object({
  date: z.number(),
  id: z.string(),
  name: z.string(),
  text: z.string(),
  likeCount: z.number(),
  liked: z.boolean(),
  users: z.array(z.string()),
});

export const PostArraySchema = z.array(PostSchema);

export type Post = z.infer<typeof PostSchema>;

import { z } from "zod";

export const CommentsSchema = z.array(
  z.object({
    id: z.string(),
    user: z.string(),
    text: z.string(),
    createdAt: z.number(),
    updatedAt: z.number(),
  })
);

export type Comments = z.infer<typeof CommentsSchema>;

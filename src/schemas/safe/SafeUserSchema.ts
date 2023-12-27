import { z } from "zod";

export const SafeUserSchema = z.object({
  name: z.string(),
});

export const SafeUserSchemaArray = z.array(SafeUserSchema);

export type TSafeUserSchema = z.infer<typeof SafeUserSchema>;

export type TSafeUserSchemaArray = z.infer<typeof SafeUserSchemaArray>;

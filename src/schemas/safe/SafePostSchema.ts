import z from "zod";

export const SafePostSchema = z.object({});

export type TSafePostSchema = z.infer<typeof SafePostSchema>;

export type TSafePostSchemaArray = z.infer<typeof SafePostSchema>;

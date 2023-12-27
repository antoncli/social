import { z } from "zod";

export const SearchInputSchema = z.object({
  input: z.string(),
});

import { z } from "zod";

export const IdsSchema = z.array(z.string());

export interface Ids extends z.infer<typeof IdsSchema> {}

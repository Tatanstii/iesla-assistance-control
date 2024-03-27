import { z } from "zod";

export const GroupSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  description: z.string().optional(),
});

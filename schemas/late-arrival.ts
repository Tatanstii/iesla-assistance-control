import { z } from "zod";

export const LateStudentArrivalSchema = z.object({
  date: z.coerce.date().optional(),
});

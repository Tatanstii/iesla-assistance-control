import { z } from "zod";

export const ReportSchema = z.object({
  startDate: z.date(),
  endDate: z.date().optional(),
});

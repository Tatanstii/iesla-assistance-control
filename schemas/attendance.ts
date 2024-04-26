import { z } from "zod";

export const LateArrivalSchema = z.object({
  identificationNumber: z.coerce.number().min(6, {
    message: "El número de identificación debe tener al menos 6 caracteres",
  }),
});

export const RestaurantAttendanceSchema = z.object({
  identificationNumber: z.coerce
    .number()
    .min(6, {
      message: "El número de identificación debe tener al menos 6 caracteres",
    })
    .optional(),
});

export const FilterAttendance = z.object({
  date: z.coerce.date().optional(),
});

export const MilkGlassAttendanceSchema = z.object({
  identificationNumber: z.coerce
    .number()
    .min(6, {
      message: "El número de identificación debe tener al menos 6 caracteres",
    })
    .optional(),
});

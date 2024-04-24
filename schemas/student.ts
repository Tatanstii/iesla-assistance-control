import { IdentificationType, UserRole } from "@prisma/client";
import { z } from "zod";

export const StudentSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }),
  lastName: z.string().min(3, {
    message: "El segundo nombre debe tener al menos 3 caracteres",
  }),
  identificationType: z
    .enum([IdentificationType.CEDULA, IdentificationType.TARJETA_IDENTIDAD])
    .default(IdentificationType.TARJETA_IDENTIDAD),
  identificationNumber: z.coerce
    .number({
      invalid_type_error: "El número de identificación debe ser un número",
    })
    .min(6, {
      message: "El número de identificación debe tener al menos 6 caracteres",
    }),
  groupId: z.number({
    required_error: "El grupo es requerido",
  }),
  restaurantMember: z.boolean().optional(),
  milkGlassMember: z.boolean().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

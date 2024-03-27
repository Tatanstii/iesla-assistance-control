import { UserRole } from "@prisma/client";
import { z } from "zod";

export const RegisterSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }),
  email: z.string().email({
    message: "El correo electronico no es valido",
  }),
  role: z.enum([UserRole.USER, UserRole.ADMIN]).default(UserRole.USER),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  confirmPassword: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

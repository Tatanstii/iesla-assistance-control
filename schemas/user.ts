import { z } from "zod";

export const UserEditSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }),
  email: z.string().email({
    message: "El correo electronico no es valido",
  }),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

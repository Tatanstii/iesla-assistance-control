import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "El correo electronico no es valido",
    })
    .email({
      message: "El correo electronico no es valido",
    }),
  password: z
    .string({
      invalid_type_error: "La contraseña no es valida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});

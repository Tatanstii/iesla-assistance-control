"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import { RegisterSchema } from "@/schemas/register";
import bcrypt from "bcrypt";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Campos invalidos" };
  }

  const { email, name, role, password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden" };
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    return { error: "El usuario ya existe" };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await db.user.create({
      data: {
        email,
        name,
        role,
        password: hashedPassword,
      },
    });
    return { success: "Usuario registrado", data: user };
  } catch (error) {
    return { error: "Error al registrar usuario" };
  }
};

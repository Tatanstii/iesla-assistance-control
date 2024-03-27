"use server";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas/register";
import { z } from "zod";
import bcrypt from "bcrypt";

const INVALID_FIELDS_MESSAGE = "Campos invalidos";

export const updateUser = async (id: string, values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: INVALID_FIELDS_MESSAGE };
  }

  const { name, email, role, password, confirmPassword } = validateFields.data;

  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden" };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        role,
        password: hashedPassword,
      },
    });

    return { success: "Usuario actualizado", data: user };
  } catch (error) {
    return { error: "Error al actualizar el usuario", data: error };
  }
};

export const deleteUser = async (id: string) => {
  try {
    await db.user.delete({
      where: {
        id,
      },
    });

    return { success: "Usuario eliminado" };
  } catch (error) {
    return { error: "Error al eliminar el usuario", data: error };
  }
};

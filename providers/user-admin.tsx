"use server";

import { register } from "@/actions/register";
import { getUserByEmail, getUserById } from "@/data/user";
import { DEFAULT_ADMIN_USER_EMAIL, DEFAULT_ADMIN_USER_PASSWORD } from "@/lib/const";
import { RegisterSchema } from "@/schemas/register";
import { z } from "zod";

const generateUserAdmin = (): z.infer<typeof RegisterSchema> => ({
  email: DEFAULT_ADMIN_USER_EMAIL,
  name: "Administrador",
  password: DEFAULT_ADMIN_USER_PASSWORD,
  confirmPassword: DEFAULT_ADMIN_USER_PASSWORD,
  role: "ADMIN",
});

export default async function UserAdminProvider() {
  const existedUserAdmin = await getUserByEmail(DEFAULT_ADMIN_USER_EMAIL);

  if (!existedUserAdmin) {
    let userAdmin = generateUserAdmin();
    await register(userAdmin);
  }

  return null;
}

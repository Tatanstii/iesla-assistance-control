import BackButton from "@/components/back-button";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";
import React from "react";
import UserForm from "../components/user-form";

type Props = {
  params: {
    id: string;
  };
};

const REDIRECT_PATH = "/admin/users";

export default async function UserPage({ params }: Props) {
  const user = await getUserById(params.id);

  if (!user) {
    redirect(REDIRECT_PATH);
  }

  return (
    <main>
      <BackButton backPath={REDIRECT_PATH} />
      <UserForm initialData={user} />
    </main>
  );
}

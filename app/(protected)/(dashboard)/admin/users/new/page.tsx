import BackButton from "@/components/back-button";
import RegisterForm from "@/app/(protected)/(dashboard)/admin/users/components/user-form";
import React from "react";

export default function NewUserPage() {
  return (
    <main>
      <BackButton />
      <RegisterForm />
    </main>
  );
}

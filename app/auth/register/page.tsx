import CardWrapper from "@/components/card-wrapper";
import React from "react";
import UserForm from "@/app/(protected)/(dashboard)/admin/users/components/user-form";

export default function RegisterPage() {
  return (
    <div className="w-full h-dvh grid place-items-center">
      <CardWrapper title="Registrar">
        <UserForm />
      </CardWrapper>
    </div>
  );
}

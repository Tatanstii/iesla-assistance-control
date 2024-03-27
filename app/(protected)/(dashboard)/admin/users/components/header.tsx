"use client";

import {
  HeaderContent,
  HeaderHead,
  HeaderOption,
  HeaderOptions,
  HeaderTitle,
} from "@/components/header-options";
import { useRouter } from "next/navigation";
import React from "react";
import { LuUserPlus } from "react-icons/lu";

const NEW_USER_PATH = "/admin/users/new";

export default function UsersHeader() {
  const router = useRouter();

  const handleNewUser = () => {
    router.push(NEW_USER_PATH);
  };

  return (
    <HeaderOptions>
      <HeaderHead>
        <HeaderTitle>Gestionar usuarios del sistema</HeaderTitle>
      </HeaderHead>
      <HeaderContent>
        <HeaderOption onClick={handleNewUser}>
          <LuUserPlus className="mr-2" size={18} />
          <span>Nuevo usuario</span>
        </HeaderOption>
      </HeaderContent>
    </HeaderOptions>
  );
}

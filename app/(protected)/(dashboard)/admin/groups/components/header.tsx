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
import { LuUsers2 } from "react-icons/lu";

const NEW_GROUP_PATH = "/admin/groups/new";

export default function GroupsHeader() {
  const router = useRouter();

  const handleNewStudent = () => {
    router.push(NEW_GROUP_PATH);
  };

  return (
    <HeaderOptions>
      <HeaderHead>
        <HeaderTitle>Gestionar grupos</HeaderTitle>
      </HeaderHead>
      <HeaderContent>
        <HeaderOption onClick={handleNewStudent}>
          <LuUsers2 className="mr-2" size={18} />
          <span>Nuevo grupo</span>
        </HeaderOption>
      </HeaderContent>
    </HeaderOptions>
  );
}

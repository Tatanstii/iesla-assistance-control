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

const NEW_STUDENT_PATH = "/admin/students/new";

export default function StudentsHeader() {
  const router = useRouter();

  const handleNewStudent = () => {
    router.push(NEW_STUDENT_PATH);
  };

  return (
    <HeaderOptions>
      <HeaderHead>
        <HeaderTitle>Gestionar estudiantes</HeaderTitle>
      </HeaderHead>
      <HeaderContent>
        <HeaderOption onClick={handleNewStudent}>
          <LuUserPlus className="mr-2" size={18} />
          <span>Nuevo estudiante</span>
        </HeaderOption>
      </HeaderContent>
    </HeaderOptions>
  );
}

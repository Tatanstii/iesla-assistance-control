"use client";

import { UserRole } from "@prisma/client";
import Module from "./components/module";
import React from "react";
import { FaDoorOpen, FaUserCog, FaUserPlus, FaUtensils } from "react-icons/fa";
import { useSession } from "next-auth/react";

const modules = [
  {
    label: "Gestionar usuarios",
    link: "/admin/users",
    Icon: FaUserCog,
    roles: [UserRole.ADMIN],
  },
  {
    label: "Nuevo estudiante",
    link: "/admin/students/new",
    Icon: FaUserPlus,
    roles: [UserRole.ADMIN],
  },
  {
    label: "Registrar llegada tarde al colegio",
    link: "/attendance/latearrival",
    Icon: FaDoorOpen,
    roles: [UserRole.ADMIN, UserRole.USER],
  },
  {
    label: "Tomar asistencia al restaurante",
    link: "/attendance/restaurant",
    Icon: FaUtensils,
    roles: [UserRole.ADMIN, UserRole.USER],
  },
];

export default function Modules() {
  const { data: session } = useSession();
  return (
    <div className="h-dvh grid place-items-center">
      <section>
        <h1 className="text-4xl text-primary mb-10 text-center">¿Qué deseas hacer hoy?</h1>
        <div className="grid grid-cols-2 gap-5 p-5">
          {modules.map((module) => {
            if (module.roles.includes(session?.user.role as UserRole)) {
              return <Module key={module.link} {...module} />;
            }
            return null;
          })}
        </div>
      </section>
    </div>
  );
}

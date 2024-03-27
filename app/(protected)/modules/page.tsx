import Module from "./components/module";
import React from "react";
import { FaDoorOpen, FaUserCog, FaUserPlus, FaUtensils } from "react-icons/fa";

const modules = [
  {
    label: "Gestionar usuarios",
    link: "/admin/users",
    Icon: FaUserCog,
  },
  {
    label: "Nuevo estudiante",
    link: "/admin/students/new",
    Icon: FaUserPlus,
  },
  {
    label: "Registrar llegada tarde al colegio",
    link: "/attendance/latearrival",
    Icon: FaDoorOpen,
  },
  {
    label: "Tomar asistencia al restaurante",
    link: "/attendance/restaurant",
    Icon: FaUtensils,
  },
];

export default async function Modules() {
  return (
    <div className="h-dvh grid place-items-center">
      <section>
        <h1 className="text-4xl text-primary mb-10 text-center">¿Qué deseas hacer hoy?</h1>
        <div className="grid grid-cols-2 gap-5 p-5">
          {modules.map((module) => (
            <Module key={module.link} {...module} />
          ))}
        </div>
      </section>
    </div>
  );
}

import { UserRole } from "@prisma/client";
import { IconType } from "react-icons/lib";
import { LuBarChart4, LuDoorOpen, LuLayoutGrid, LuUserCog, LuUsers } from "react-icons/lu";

type NavLink = {
  title: string;
  href?: string;
  icon: IconType;
  links?: {
    title: string;
    href: string;
  }[];
  roles: UserRole[];
};

const attendanceLinks = [
  {
    title: "Llegada tarde",
    href: "/attendance/latearrival",
  },
  {
    title: "Ingreso al restaurante",
    href: "/attendance/restaurant",
  },
  {
    title: "Ingreso al vaso de leche",
    href: "/attendance/milk",
  },
];

const manageEntitiesLinks = [
  {
    title: "Usuarios del sistema",
    href: "/admin/users",
  },
  {
    title: "Grupos",
    href: "/admin/groups",
  },
  {
    title: "Estudiantes",
    href: "/admin/students",
  },
];

export const navLinks: NavLink[] = [
  {
    title: "Inicio",
    href: "/modules",
    icon: LuLayoutGrid,
    roles: [UserRole.USER, UserRole.ADMIN],
  },
  {
    title: "Gestionar entidades",
    icon: LuUserCog,
    roles: [UserRole.ADMIN],
    links: manageEntitiesLinks,
  },
  {
    title: "Registrar asistencia",
    icon: LuDoorOpen,
    links: attendanceLinks,
    roles: [UserRole.USER, UserRole.ADMIN],
  },
  {
    title: "Reportes",
    icon: LuBarChart4,
    href: "/reports",
    roles: [UserRole.ADMIN],
  },
];

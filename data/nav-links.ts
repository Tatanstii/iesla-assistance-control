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

export const attendanceLinks = [
  {
    title: "Registrar llegada tarde",
    href: "/attendance/latearrival",
  },
  {
    title: "Tomar asistencia del restaurante",
    href: "/attendance/restaurant",
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
    title: "Gestionar grupos",
    href: "/admin/groups",
    icon: LuUsers,
    roles: [UserRole.ADMIN],
  },
  {
    title: "Gestionar usuarios del sistema",
    icon: LuUserCog,
    href: "/admin/users",
    roles: [UserRole.ADMIN],
  },
  {
    title: "Gestionar estudiantes",
    icon: LuUsers,
    href: "/admin/students",
    roles: [UserRole.ADMIN],
  },
  {
    title: "Asistencia",
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

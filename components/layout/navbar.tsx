"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UserInfo from "../user-info";
import { LuBarChart4, LuDoorOpen, LuLayoutGrid, LuUserCog, LuUsers } from "react-icons/lu";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";

const manageUsersLinks = [
  {
    title: "Gestionar usuarios del sistema",
    href: "/admin/users",
  },
  {
    title: "Gestionar estudiantes",
    href: "/admin/students",
  },
];

const attendanceLinks = [
  {
    title: "Registrar llegada tarde",
    href: "/attendance/latearrival",
  },
  {
    title: "Tomar asistencia del restaurante",
    href: "/attendance/restaurant",
  },
];

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="py-3 px-10 flex flex-row justify-between">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/modules" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <LuLayoutGrid className="mr-2" size={18} />
                <span>Inicio</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {session?.user.role === "ADMIN" && (
            <NavigationMenuItem>
              <Link href="/admin/groups" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <LuUsers className="mr-2" size={18} />
                  <span>Gestionar grupos</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
          {session?.user.role === "ADMIN" && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <LuUserCog className="mr-2" size={18} />
                <span>Gestionar usuarios</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col w-[300px] gap-3 p-4 ">
                  {manageUsersLinks.map((link) => (
                    <ListItem key={link.href} title={link.title} href={link.href} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <LuDoorOpen className="mr-2" size={18} />
              <span>Control de asistencia</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col w-[300px] gap-3 p-4 ">
                {attendanceLinks.map((link) => (
                  <ListItem key={link.href} title={link.title} href={link.href} />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {session?.user.role === "ADMIN" && (
            <NavigationMenuItem>
              <Link href="/reports" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <LuBarChart4 className="mr-2" size={18} />
                  <span>Reportes</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        <UserInfo />
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

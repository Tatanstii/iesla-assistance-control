"use client";

import React from "react";
import UserInfo from "../user-info";
import { useSession } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { navLinks } from "@/data/navbar";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { data: session } = useSession();

  const currentRole = session?.user.role;

  return (
    <div className="py-3 px-10 flex flex-row justify-between">
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map(
              (item) =>
                currentRole &&
                item.roles.includes(currentRole) && (
                  <NavigationMenuItem key={item.href}>
                    {"links" in item ? (
                      <>
                        <NavigationMenuTrigger>
                          <span className="mr-2">{<item.icon size={18} />}</span>
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          {item.links?.map((link) => (
                            <NavigationMenuLink
                              key={link.href}
                              href={link.href}
                              className="px-5 py-3 block text-sm min-w-[200px] hover:bg-gray-100"
                            >
                              {link.title}
                            </NavigationMenuLink>
                          ))}
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        href={item.href}
                        className={cn("bg-primar", navigationMenuTriggerStyle())}
                      >
                        <span className="mr-2">{<item.icon size={18} />}</span>

                        {item.title}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <UserInfo />
    </div>
  );
}

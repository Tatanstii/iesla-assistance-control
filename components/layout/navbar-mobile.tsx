"use client";
import { navLinks } from "@/data/navbar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import UserInfo from "../user-info";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

type Props = {
  onRouteChange: () => void;
};

export default function NavbarMobile({ onRouteChange }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const onClick = (path: string) => {
    router.push(path);
    onRouteChange();
  };

  return (
    <nav>
      <div className="mb-4">
        <UserInfo />
      </div>
      <ul>
        {navLinks.map((link, index) => {
          if (link.roles.includes(session?.user.role as UserRole)) {
            return (
              <li
                key={`${link.href}-${link.title}`}
                className={cn("w-full px-5 py-3", {
                  "border-b": index !== navLinks.length - 1,
                })}
              >
                {link.href ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onClick(link.href!)}
                    className="flex flex-row gap-1 items-center"
                  >
                    <link.icon className="mr-2 text-muted-foreground" size={18} />
                    <span>{link.title}</span>
                  </Button>
                ) : (
                  <div className="mb-4 flex flex-row gap-1 items-center">
                    <link.icon className="mr-2 text-muted-foreground" size={18} />
                    <span>{link.title}</span>
                  </div>
                )}
                {link.links && (
                  <ul className="bg-slate-100 px-5 py-3">
                    {link.links.map((subLink, index) => (
                      <li
                        key={subLink.href}
                        className={cn("ml-4 mb-3", {
                          "border-b pb-3": index !== link.links!.length - 1,
                        })}
                      >
                        <Button type="button" variant="ghost" onClick={() => onClick(subLink.href)}>
                          {subLink.title}
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          }

          return null;
        })}
      </ul>
    </nav>
  );
}

import React from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { LuChevronDown, LuLogOut } from "react-icons/lu";
import { logout } from "@/actions/signout";
import { getFirstLetter } from "@/lib/utils";

const DEFAULT_USER_NAME = "Usuario";

export default function UserInfo() {
  const currentUser = useCurrentUser();

  if (!currentUser) return null;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row justify-center items-center gap-1 hover:cursor-pointer">
          <Avatar>
            <AvatarImage src={currentUser.image || ""} alt="Avatar" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getFirstLetter(currentUser.name || DEFAULT_USER_NAME)}
            </AvatarFallback>
          </Avatar>
          {currentUser.name && <p className="text-sm">{currentUser.name}</p>}
          <LuChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="hover:cursor-pointer" onClick={handleLogout}>
          <LuLogOut className="mr-2" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

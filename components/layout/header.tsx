"use client";

import Navbar from "@/components/layout/navbar";
import { Button } from "../ui/button";
import { LuMenu, LuX } from "react-icons/lu";
import { useDisclosure } from "@/hooks/use-disclosure";
import { cn } from "@/lib/utils";
import NavbarMobile from "./navbar-mobile";

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();

  const handleOnRouteChange = () => {
    onToggle();
  };

  return (
    <header>
      <div className="border px-5 py-3">
        <Button className="md:hidden" onClick={onToggle}>
          {isOpen ? <LuX /> : <LuMenu />}
        </Button>
        <div
          className={cn("absolute md:static w-full h-full bg-background inset-0 top-14 z-30", {
            "hidden md:block": !isOpen,
          })}
        >
          <div className="hidden md:block">
            <Navbar />
          </div>
          <div className="block md:hidden">
            <NavbarMobile onRouteChange={handleOnRouteChange} />
          </div>
        </div>
      </div>
    </header>
  );
}

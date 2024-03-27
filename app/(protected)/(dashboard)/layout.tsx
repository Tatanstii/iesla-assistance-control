import Navbar from "@/components/navbar";
import React from "react";

export default function ProtectedLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative h-full">
      <header>
        <Navbar />
      </header>
      <div className="px-10 md:px-20 py-5">{children}</div>
    </div>
  );
}

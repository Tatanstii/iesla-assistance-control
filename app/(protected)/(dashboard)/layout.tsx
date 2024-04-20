import Header from "@/components/layout/header";
import React from "react";

export default function ProtectedLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative">
      <Header />
      <div className="px-10 md:px-20 py-5">{children}</div>
    </div>
  );
}

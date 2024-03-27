"use client";

import { LuChevronLeft } from "react-icons/lu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {
  backPath?: string;
};

export default function BackButton({ backPath }: Props) {
  const router = useRouter();

  const handleOnClick = () => {
    if (!backPath) return router.back();

    router.push(backPath);
  };
  return (
    <div className="mb-4">
      <Button variant="ghost" className="rounded-full group" onClick={handleOnClick}>
        <LuChevronLeft size={20} className="transition group-hover:-translate-x-2" />
        <span>Volver</span>
      </Button>
    </div>
  );
}

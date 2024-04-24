import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IoBarcodeOutline } from "react-icons/io5";

type Props = { isPending?: boolean } & React.InputHTMLAttributes<HTMLInputElement>;

export default function BarcodeInput({ isPending = false, ...props }: Props) {
  return (
    <div className="relative flex flex-row items-center w-full">
      <Input
        {...props}
        type="number"
        placeholder="1000345678"
        disabled={isPending}
        className={cn(
          "border-2 border-primary h-14 text-lg pr-14 pl-5 placeholder:bg-text-primary appearance-none focus-visible:ring-0 focus-visible:shadow-lg transition focus-visible:appearance-none text-primary w-full md:min-w-[32rem]",
          props.className
        )}
        min={0}
      />
      <span className="absolute right-0 mr-4">
        <IoBarcodeOutline size={28} className="text-primary" />
      </span>
    </div>
  );
}

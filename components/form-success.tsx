"use client";

import React from "react";
import { LuCheckCircle } from "react-icons/lu";

type Props = {
  message?: string;
};

export default function FormSuccess({ message }: Props) {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <LuCheckCircle />
      <p>{message}</p>
    </div>
  );
}

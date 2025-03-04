"use client"

import React from "react";
import { LuAlertTriangle } from "react-icons/lu";

type Props = {
  message?: string;
};

export default function FormError({ message }: Props) {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <LuAlertTriangle />
      <p>{message}</p>
    </div>
  );
}

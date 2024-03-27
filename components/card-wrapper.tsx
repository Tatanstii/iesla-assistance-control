"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

type Props = {
  title?: string;
  children?: React.ReactNode;
};

export default function CardWrapper({ title, children }: Props) {
  return (
    <Card className="min-w-[450px]">
      {title && (
        <CardHeader>
          <h2 className="text-2xl font-bold">{title}</h2>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

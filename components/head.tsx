import React from "react";
import { Separator } from "./ui/separator";

type Props = {
  title: string;
  description?: string;
};

export default function Head({ title, description }: Props) {
  return (
    <div className="mb-5">
      <div className="mb-3">
        <h2 className="text-xl text-primary uppercase">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <Separator />
    </div>
  );
}

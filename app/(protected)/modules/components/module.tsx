import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons/lib";

type Props = {
  label: string;
  link: string;
  Icon: IconType;
};

export default function Module({ Icon, label, link }: Props) {
  return (
    <Link href={link} className="group">
      <Card className="transition group-hover:scale-105 h-full bg-primary">
        <CardHeader>
          <CardTitle className="text-primary-foreground text-center">{label}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-row justify-center">
            <Icon size={40} className="text-primary-foreground transition group-hover:scale-125" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

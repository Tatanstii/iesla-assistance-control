import React from "react";
import { IconType } from "react-icons/lib";

type Props = {
  title: string;
  description?: string;
  Icon: IconType;
};

export default function AvailableModule({ title, description, Icon }: Props) {
  return (
    <div
      className="bg-white rounded-md px-10 py-5 flex flex-col gap-3 items-center justify-between transition hover:ring-2 ring-yellow-500  h-full group"
      title={`${title}\n${description}`}
    >
      <span className="block w-full text-left min-h-16">
        <h2 className="font-bold text-lg line-clamp-2 group-hover:text-yellow-500">{title}</h2>
      </span>
      <p className="line-clamp-3">{description}</p>
      <div className="w-fit bg-primary p-5 rounded-full">
        <Icon size={40} className="transition text-primary-foreground" />
      </div>
    </div>
  );
}

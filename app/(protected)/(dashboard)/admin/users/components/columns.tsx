"use client";

import type { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import UserRowMenu from "./row-menu";

export const userDataTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo electrónico",
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
  {
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="w-full flex flex-row justify-end">
          <UserRowMenu userId={row.original.id} />
        </div>
      );
    },
  },
];

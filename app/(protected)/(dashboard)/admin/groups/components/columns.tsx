"use client";

import { Group } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import GroupRowMenu from "./row-menu";

export const groupDataTableColumns: ColumnDef<Group>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="w-full flex flex-row justify-end">
          <GroupRowMenu groupId={row.original.id} />
        </div>
      );
    },
  },
];

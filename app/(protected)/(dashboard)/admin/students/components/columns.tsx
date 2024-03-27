"use client";

import { ColumnDef } from "@tanstack/react-table";
import StudentRowMenu from "./row-menu";
import { StudentMapped } from "@/types/student";

export const studentDataTableColumns: ColumnDef<StudentMapped>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo electrónico",
  },
  {
    accessorKey: "identificationType",
    header: "Tipo de identificación",
  },
  {
    accessorKey: "identificationNumber",
    header: "Número de identificación",
  },
  {
    accessorKey: "restaurantMember",
    header: "Miembro de restaurante",
    cell: ({ row }) => {
      return row.original.restaurantMember ? "Sí" : "No";
    },
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "group",
    header: "Grupo",
  },
  {
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="w-full flex flex-row justify-end">
          <StudentRowMenu studentId={row.original.id} />
        </div>
      );
    },
  },
];

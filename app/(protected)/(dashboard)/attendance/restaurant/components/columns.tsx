"use client";

import { ColumnDef } from "@tanstack/react-table";

type MappedRestaurantAttendance = {
  id: number;
  student: string;
  identificationType: string;
  identificationNumber: number;
  date: string;
};

export const restaurantAttendanceDataTableColumns: ColumnDef<MappedRestaurantAttendance>[] = [
  {
    accessorKey: "student",
    header: "Estudiante",
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
    accessorKey: "date",
    header: "Fecha",
  },
];

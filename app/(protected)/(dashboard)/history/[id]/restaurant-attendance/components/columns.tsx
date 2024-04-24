"use client";

import { getLocaleDate, getLocaleTime } from "@/lib/utils";
import { RestaurantAttendance } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const attendanceRestaurantColumns: ColumnDef<RestaurantAttendance>[] = [
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ cell }) => {
      return getLocaleDate(cell.row.original.date);
    },
  },
  {
    accessorKey: "date",
    header: "Hora de registro",
    cell: ({ cell }) => {
      return getLocaleTime(cell.row.original.date);
    },
  },
];

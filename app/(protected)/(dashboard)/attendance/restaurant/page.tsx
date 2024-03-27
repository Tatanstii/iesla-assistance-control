import Head from "@/components/head";
import React from "react";
import RestaurantAttendanceForm from "./components/restaurant-attendance-form";
import DataTable from "@/components/data-table";
import { restaurantAttendanceDataTableColumns } from "./components/columns";
import { getRestaurantAttendance } from "@/actions/restaurant-attendance";

export default async function RestaurantAttendancePage() {
  const restaurantAttendance = await getRestaurantAttendance();

  return (
    <main>
      <Head title="Registrar asistencia al restaurante" />
      <RestaurantAttendanceForm />
      <DataTable data={restaurantAttendance} columns={restaurantAttendanceDataTableColumns} />
    </main>
  );
}

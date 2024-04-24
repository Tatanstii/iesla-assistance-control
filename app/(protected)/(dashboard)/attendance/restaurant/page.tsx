import Head from "@/components/head";
import React from "react";
import RestaurantAttendanceForm from "./components/restaurant-attendance-form";
import { getRestaurantAttendance } from "@/actions/restaurant-attendance";
import AssistanceList from "@/components/assistance-list";

export default async function RestaurantAttendancePage() {
  const restaurantAttendance = await getRestaurantAttendance();

  return (
    <main>
      <Head title="Registrar asistencia al restaurante" />
      <section>
        <div className="grid place-items-center">
          <div>
            <RestaurantAttendanceForm />
            <AssistanceList data={restaurantAttendance} />
          </div>
        </div>
      </section>
    </main>
  );
}

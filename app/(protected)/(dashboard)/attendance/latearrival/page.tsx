import React from "react";
import LateArrivalForm from "./components/late-arrival-form";
import Head from "@/components/head";
import { getLateArrivals } from "@/actions/late-arrivals";
import AssistanceList from "@/components/assistance-list";

export default async function LateArrivalAttendancePage() {
  const lateArrivals = await getLateArrivals();

  const filteredLateArrivals = lateArrivals.map((lateArrival) => ({
    date: lateArrival.date,
    student: lateArrival.student,
  }));

  return (
    <main>
      <Head title="Registrar llegada tarde" />
      <section>
        <div className="grid place-items-center">
          <div>
            <LateArrivalForm />
            <AssistanceList data={filteredLateArrivals} pathname="latearrivals" />
          </div>
        </div>
      </section>
    </main>
  );
}

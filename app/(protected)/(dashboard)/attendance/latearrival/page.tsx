import React from "react";
import LateArrivalForm from "./components/late-arrival-form";
import Head from "@/components/head";
import { getLateArrivals } from "@/actions/late-arrivals";
import DataTable from "@/components/data-table";
import { lateArrivalsDataTableColumns } from "./components/columns";

export default async function LateArrivalAttendancePage() {
  const lateArrivals = await getLateArrivals();
  return (
    <main>
      <Head title="Registrar llegada tarde" />
      <section>
        <div className="grid place-items-center">
          <div>
            <LateArrivalForm />
            <DataTable data={lateArrivals} columns={lateArrivalsDataTableColumns} />
          </div>
        </div>
      </section>
    </main>
  );
}

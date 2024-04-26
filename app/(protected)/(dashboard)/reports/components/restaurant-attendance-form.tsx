"use client";

import AttendanceReportForm from "@/components/forms/attendance-report";
import { downloadFile } from "@/lib/utils";
import { ReportSchema } from "@/schemas/report";
import { format } from "date-fns";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

const REPORT_API_URL = "/api/reports/restaurant-attendance";
const DATE_FORMAT = "yyyy_MM_dd_hh_mm_ss_a";
export default function RestaurantAttendanceForm() {
  const [isPending, setPending] = useState(false);

  const onSubmit = async (values: z.infer<typeof ReportSchema>) => {
    setPending(true);
    try {
      const response = await fetch(
        `${REPORT_API_URL}?startDate=${values.startDate}&endDate=${values.endDate}`
      );
      const statusCode = response.status;

      if (statusCode === 200) {
        const blob = await response.blob();
        downloadFile(blob, `${format(new Date(), DATE_FORMAT)}-asistencias-restaurante.xlsx`);
        return toast.success("Reporte generado correctamente");
      }

      if (statusCode !== 200) {
        const jsonResponse = await response.json();
        if (statusCode === 404) return toast.error(jsonResponse.message);
        if (statusCode === 200) return toast.error(jsonResponse.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Error al generar el reporte");
    } finally {
      setPending(false);
    }
  };

  return <AttendanceReportForm isPending={isPending} onSubmit={onSubmit} />;
}

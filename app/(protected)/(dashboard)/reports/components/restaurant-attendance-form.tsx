"use client";

import AttendanceReportForm from "@/components/forms/attendance-report";
import { downloadFile } from "@/lib/utils";
import { ReportSchema } from "@/schemas/report";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

const REPORT_API_URL = "/api/reports/restaurant-attendance";

export default function RestaurantAttendanceForm() {
  const [isPending, setPending] = useState(false);

  const onSubmit = async (values: z.infer<typeof ReportSchema>) => {
    setPending(true);
    try {
      const response = await fetch(
        `${REPORT_API_URL}?startDate=${values.startDate}&endDate=${values.endDate}`
      );

      if (!response.body || [400, 404, 500].includes(response.status)) {
        return toast.error("Error al generar el reporte");
      }

      const blob = await response.blob();
      downloadFile(blob, "asistencias-restaurante.xlsx");
    } catch (error) {
      toast.error("Error al generar el reporte");
    } finally {
      setPending(false);
    }
  };

  return <AttendanceReportForm isPending={isPending} onSubmit={onSubmit} />;
}

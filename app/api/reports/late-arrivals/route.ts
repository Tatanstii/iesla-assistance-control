import { db } from "@/lib/db";
import { ReportSchema } from "@/schemas/report";
import { format } from "date-fns";
import { NextRequest } from "next/server";
import xlsx from "xlsx";

const LATE_ARRIVALS_SHEET_NAME = "Reporte de llegadas tardes";
const LATE_ARRIVALS_FILE_NAME = `${format(new Date(), "yyyy-MM-dd")}-llegadas-tarde.xlsx`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const startDateQuery = searchParams.get("startDate");
  const endDateQuery = searchParams.get("endDate");

  const validateFields = ReportSchema.safeParse({
    startDate: startDateQuery ? new Date(startDateQuery) : undefined,
    endDate: endDateQuery ? new Date(endDateQuery) : undefined,
  });

  if (!validateFields.success) {
    return { error: "Campos invalidos" };
  }

  const { startDate, endDate = new Date() } = validateFields.data;

  const lateArrivals = await db.lateArrival.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      student: true,
    },
  });

  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(
    lateArrivals.map((record) => ({
      "Fecha de registro": record.date,
      "Nombre del estudiante": `${record.student.firstName} ${record.student.lastName}`,
      "Tipo de identificación": record.student.identificationType,
      "Número de identificación": record.student.identificationNumber,
      "Miembro del restaurante": record.student.restaurantMember ? "Si" : "No",
    }))
  );
  xlsx.utils.book_append_sheet(workbook, worksheet, LATE_ARRIVALS_SHEET_NAME);

  const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

  try {
    return new Response(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${LATE_ARRIVALS_FILE_NAME}"`,
      },
    });
  } catch (error) {
    return { error: "Error al generar el reporte" };
  }
}

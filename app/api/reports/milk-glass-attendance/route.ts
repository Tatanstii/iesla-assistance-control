import { db } from "@/lib/db";
import { ReportSchema } from "@/schemas/report";
import { format } from "date-fns";
import { NextRequest } from "next/server";
import xlsx from "xlsx";

const MILK_GLASS_SHEET_NAME = "Asistencias al vaso de leche";
const MILK_GLASS_FILE_NAME = `${format(new Date(), "yyyy-MM-dd")}-asistencia-vaso-leche.xlsx`;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDateQuery = searchParams.get("startDate");
    const endDateQuery = searchParams.get("endDate");

    const validateFields = ReportSchema.safeParse({
      startDate: startDateQuery ? new Date(startDateQuery) : undefined,
      endDate: endDateQuery ? new Date(endDateQuery) : undefined,
    });

    if (!validateFields.success) {
      return new Response("Campos invalidos", { status: 400 });
    }

    const { startDate, endDate = new Date() } = validateFields.data;

    if (startDate > endDate) {
      return new Response("La fecha de inicio no puede ser mayor a la fecha de fin", {
        status: 400,
      });
    }

    const milkGlassAttendance = await db.milkGlassAttendance.findMany({
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
      milkGlassAttendance.map((record) => {
        console.log(format(new Date(record.date), "yyyy-MM-dd"));
        return {
          "Fecha de registro": format(new Date(record.date), "yyyy-MM-dd hh:mm a"),
          "Nombre del estudiante": `${record.student.firstName} ${record.student.lastName}`,
          "Tipo de identificación": record.student.identificationType,
          "Número de identificación": record.student.identificationNumber,
          "Miembro del restaurante": record.student.restaurantMember ? "Si" : "No",
          "Miembro del vaso de leche": record.student.milkGlassMember ? "Si" : "No",
        };
      })
    );

    xlsx.utils.book_append_sheet(workbook, worksheet, MILK_GLASS_SHEET_NAME);

    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    if (!milkGlassAttendance.length) {
      return new Response("No hay datos para mostrar en el reporte", { status: 404 });
    }
    return new Response(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${MILK_GLASS_FILE_NAME}"`,
      },
    });
  } catch (error) {
    return new Response("Error al generar el reporte", { status: 500 });
  }
}

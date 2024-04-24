"use server";

import { db } from "@/lib/db";
import { MilkGlassAttendanceSchema } from "@/schemas/attendance";
import { format } from "date-fns";
import { z } from "zod";

export const newMilkGlassAttendance = async (values: z.infer<typeof MilkGlassAttendanceSchema>) => {
  const validateFields = MilkGlassAttendanceSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Campos invalidos" };
  }

  const { identificationNumber } = validateFields.data;

  try {
    const student = await db.student.findFirst({
      where: {
        identificationNumber,
      },
    });

    if (!student) {
      return { error: "Estudiante no encontrado" };
    }

    if (!student.milkGlassMember) {
      return { error: "El estudiante no es miembro del vaso de leche" };
    }

    const alreadyRegistered = await db.milkGlassAttendance.findFirst({
      where: {
        studentId: student.id,
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });

    if (alreadyRegistered) {
      return { error: "El estudiante ya tiene una asistencia registrada el día de hoy" };
    }

    await db.milkGlassAttendance.create({
      data: {
        studentId: student.id,
        date: new Date(),
      },
    });
    return {
      success: "Asistencia registrada correctamente",
    };
  } catch (error) {
    return {
      error: "Ocurrió un error al registrar la asistencia",
    };
  }
};

export const getMilkGlassAttendance = async () => {
  try {
    const milkGlassAssistance = await db.milkGlassAttendance.findMany({
      where: {
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
      orderBy: {
        date: "desc",
      },
      include: {
        student: true,
      },
    });
    return milkGlassAssistance.map((record) => ({
      date: format(new Date(record.date), "dd/MM/yyyy HH:mm"),
      student: record.student,
    }));
  } catch (error) {
    return [];
  }
};

export const getMilkGlassAttendanceByStudent = async (studentId: string, date: Date) => {
  try {
    if (!date) {
      return await db.milkGlassAttendance.findMany({
        where: {
          studentId,
        },
      });
    }
    const milkGlassAssistance = await db.milkGlassAttendance.findMany({
      where: {
        studentId,
        date: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lte: new Date(date.setHours(23, 59, 59, 999)),
        },
      },
      orderBy: {
        date: "desc",
      },
      include: {
        student: true,
      },
    });
    return milkGlassAssistance;
  } catch (error) {
    return [];
  }
};

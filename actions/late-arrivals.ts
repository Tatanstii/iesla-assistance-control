"use server";

import { db } from "@/lib/db";
import { LateArrivalSchema } from "@/schemas/attendance";
import { format } from "date-fns";
import { z } from "zod";

export const newLateArrivalAttendance = async (values: z.infer<typeof LateArrivalSchema>) => {
  const validateFields = LateArrivalSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Campos invalidos" };
  }

  const { identificationNumber } = validateFields.data;

  const student = await db.student.findUnique({
    where: {
      identificationNumber,
    },
  });

  if (!student) {
    return { error: "El estudiante no existe" };
  }

  if (!student.milkGlassMember) {
    return { error: "El estudiante no es miembro del vaso de leche" };
  }

  const alreadyRegistered = await db.lateArrival.findFirst({
    where: {
      studentId: student.id,
      date: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });

  if (alreadyRegistered) {
    return { error: "El estudiante ya tiene una llegada tarde registrada el día de hoy" };
  }

  try {
    await db.lateArrival.create({
      data: {
        student: {
          connect: {
            id: student.id,
          },
        },
        date: new Date(),
      },
      include: {
        student: true,
      },
    });

    return {
      success: "Llegada tarde registrada",
      data: `${student.firstName} ${student.lastName}`,
    };
  } catch (error) {
    return { error: "Error al registrar la asistencia" };
  }
};

export const getLateArrivals = async () => {
  try {
    const lateArrivals = await db.lateArrival.findMany({
      include: {
        student: true,
      },
      orderBy: {
        date: "desc",
      },
      take: 5,
    });
    const mappedLateArrivals = lateArrivals.map((lateArrival) => {
      return {
        date: format(lateArrival.date, "dd/MM/yyyy HH:mm"),
        student: lateArrival.student,
      };
    });
    return mappedLateArrivals;
  } catch (error) {
    return [];
  }
};

export const getLateArrivalsByStudent = async (id: string, date?: Date) => {
  try {
    if (!date) {
      return await db.lateArrival.findMany({
        where: {
          studentId: id,
        },
      });
    }

    if (date) {
      return await db.lateArrival.findMany({
        where: {
          studentId: id,
          date: {
            gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
            lte: new Date(new Date(date).setHours(23, 59, 59, 999)),
          },
        },
        include: {
          student: true,
        },
      });
    }
  } catch (error) {
    return [];
  }
};

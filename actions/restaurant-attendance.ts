"use server";

import { db } from "@/lib/db";
import { RestaurantAttendanceSchema } from "@/schemas/attendance";
import { z } from "zod";

export const newRestaurantAttendance = async (
  values: z.infer<typeof RestaurantAttendanceSchema>
) => {
  const validateFields = RestaurantAttendanceSchema.safeParse(values);

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

  if (!student.restaurantMember) {
    return { error: "El estudiante no es miembro del restaurante" };
  }

  const alreadyRegistered = await db.restaurantAttendance.findFirst({
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

  try {
    const restuarantAttendance = await db.restaurantAttendance.create({
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
      success: "Asistencia registrada",
      data: restuarantAttendance,
    };
  } catch (error) {
    return { error: "Error al registrar la asistencia" };
  }
};

export const getRestaurantAttendance = async () => {
  try {
    const restaurantAttendance = await db.restaurantAttendance.findMany({
      include: {
        student: true,
      },
    });

    const mappedRestaurantAttendance = restaurantAttendance.map((attendance) => {
      return {
        id: attendance.id,
        student: `${attendance.student.firstName} ${attendance.student.lastName}`,
        identificationType: attendance.student.identificationType,
        identificationNumber: attendance.student.identificationNumber,
        date: new Intl.DateTimeFormat("es-CO", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }).format(attendance.date),
      };
    });

    return mappedRestaurantAttendance;
  } catch (error) {
    return [];
  }
};

export const getRestaurantAttendanceByStudent = async (studentId: string, date?: Date) => {
  try {
    if (!date) {
      return await db.restaurantAttendance.findMany({
        where: {
          studentId,
        },
        include: {
          student: true,
        },
      });
    }

    return await db.restaurantAttendance.findMany({
      where: {
        studentId,
        date: {
          gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
          lte: new Date(new Date(date).setHours(23, 59, 59, 999)),
        },
      },
      include: {
        student: true,
      },
    });
  } catch (error) {
    return [];
  }
};

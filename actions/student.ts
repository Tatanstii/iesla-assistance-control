"use server";

import { db } from "@/lib/db";
import { StudentSchema } from "@/schemas/student";
import { z } from "zod";

const SUCCESS_MESSAGE_WHEN_NEW_STUDENT = "Estudiante creado";
const ERROR_MESSAGE_WHEN_NEW_STUDENT = "Ocurrion un error al crear el estudiante";

const SUCCESS_MESSAGE_WHEN_UPDATE_STUDENT = "Estudiante actualizado";
const ERROR_MESSAGE_WHEN_UPDATE_STUDENT = "Ocurrion un error al actualizar el estudiante";

const SUCCESS_MESSAGE_WHEN_DELETE_STUDENT = "Estudiante eliminado";
const ERROR_MESSAGE_WHEN_DELETE_STUDENT = "Ocurrion un error al eliminar el estudiante";

const INVALID_FIELDS_MESSAGE = "Campos invalidos";
const UNKOWN_ERROR_MESSAGE = "Error desconocido";

export const newStudent = async (data: z.infer<typeof StudentSchema>) => {
  const validateFields = StudentSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: INVALID_FIELDS_MESSAGE };
  }

  const {
    firstName,
    identificationNumber,
    identificationType,
    lastName,
    email,
    phone,
    restaurantMember,
  } = validateFields.data;

  const existingUser = await db.student.findUnique({
    where: {
      identificationNumber,
    },
  });

  if (existingUser) {
    return { error: "El estudiante ya existe" };
  }

  try {
    const student = await db.student.create({
      data: {
        firstName,
        lastName,
        identificationType,
        identificationNumber,
        Group: {
          connect: {
            id: data.groupId,
          },
        },
        restaurantMember,
        email,
        phone,
      },
      include: {
        Group: true,
      },
    });
    return {
      success: SUCCESS_MESSAGE_WHEN_NEW_STUDENT,
      data: student,
    };
  } catch (error) {
    if (error) {
      return { error: ERROR_MESSAGE_WHEN_NEW_STUDENT, data: error };
    }
    throw error;
  }
};

export const updateStudent = async (id: string, data: z.infer<typeof StudentSchema>) => {
  const validateFields = StudentSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: INVALID_FIELDS_MESSAGE };
  }

  const {
    firstName,
    identificationNumber,
    identificationType,
    lastName,
    email,
    phone,
    restaurantMember,
  } = validateFields.data;

  try {
    const student = await db.student.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        identificationType,
        identificationNumber,
        Group: {
          connect: {
            id: data.groupId,
          },
        },
        restaurantMember,
        email,
        phone,
      },
      include: {
        Group: true,
      },
    });
    return {
      success: SUCCESS_MESSAGE_WHEN_UPDATE_STUDENT,
      data: student,
    };
  } catch (error) {
    if (error) {
      return { error: UNKOWN_ERROR_MESSAGE, data: error };
    }
    throw error;
  }
};

export const deleteStudent = async (id: string) => {
  try {
    await db.student.delete({
      where: {
        id,
      },
    });
    return { success: SUCCESS_MESSAGE_WHEN_DELETE_STUDENT };
  } catch (error) {
    if (error) {
      return { error: UNKOWN_ERROR_MESSAGE, data: error };
    }
    throw error;
  }
};

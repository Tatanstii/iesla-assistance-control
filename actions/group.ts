"use server";

import { z } from "zod";
import { GroupSchema } from "../schemas/group";
import { db } from "@/lib/db";

const SUCCESS_MESSAGE_WHEN_NEW_GROUP = "Grupo creado";
const ERROR_MESSAGE_WHEN_NEW_GROUP = "Error al crear el grupo";

const SUCCESS_MESSAGE_WHEN_UPDATE_GROUP = "Grupo actualizado";
const ERROR_MESSAGE_WHEN_UPDATE_GROUP = "Error al actualizar el grupo";

const SUCCESS_MESSAGE_WHEN_DELETE_GROUP = "Grupo eliminado";

const INVALID_FIELDS_MESSAGE = "Campos invalidos";
const UNKOWN_ERROR_MESSAGE = "Error desconocido";

export const newGroup = async (data: z.infer<typeof GroupSchema>) => {
  const validateFields = GroupSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: INVALID_FIELDS_MESSAGE };
  }

  const { name, description } = validateFields.data;

  try {
    const group = await db.group.create({
      data: {
        name: name,
        description: description,
      },
    });
    return {
      success: SUCCESS_MESSAGE_WHEN_NEW_GROUP,
      data: group,
    };
  } catch (error) {
    if (error) {
      return { error: UNKOWN_ERROR_MESSAGE, data: error };
    }
    throw error;
  }
};

export const updateGroup = async (groupId: number, data: z.infer<typeof GroupSchema>) => {
  const validateFields = GroupSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: INVALID_FIELDS_MESSAGE };
  }

  try {
    const group = await db.group.update({
      where: {
        id: groupId,
      },
      data: validateFields.data,
    });
    return {
      success: SUCCESS_MESSAGE_WHEN_UPDATE_GROUP,
      data: group,
    };
  } catch (error) {
    if (error) {
      return { error: ERROR_MESSAGE_WHEN_UPDATE_GROUP, data: error };
    }
    throw error;
  }
};

export const deleteGroup = async (groupId: number) => {
  try {
    await db.group.delete({
      where: {
        id: groupId,
      },
    });
    return {
      success: SUCCESS_MESSAGE_WHEN_DELETE_GROUP,
    };
  } catch (error) {
    return {
      data: error,
      error: ERROR_MESSAGE_WHEN_NEW_GROUP,
    };
  }
};

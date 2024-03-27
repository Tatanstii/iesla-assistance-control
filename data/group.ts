import { db } from "@/lib/db";
import { transformNullToUndefined } from "@/lib/utils";

export const getGroups = async () => {
  try {
    const groups = await db.group.findMany();
    return groups;
  } catch (error) {
    return [];
  }
};

export const getGroupById = async (groupId: number) => {
  try {
    const group = await db.group.findUnique({
      where: {
        id: groupId,
      },
    });
    return transformNullToUndefined(group);
  } catch (error) {
    return null;
  }
};

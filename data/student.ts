import { db } from "@/lib/db";
import { StudentMapped } from "@/types/student";

export const getStudents = async ({
  group,
  search,
}: {
  group?: string;
  search?: string;
}): Promise<StudentMapped[]> => {
  try {
    const students = await db.student.findMany({
      where: {
        AND: search
          ? [
              {
                OR: [{ firstName: { contains: search } }, { lastName: { contains: search } }],
              },
            ]
          : [],
        Group: {
          name: {
            equals: group,
          },
        },
      },
      include: {
        Group: true,
      },
    });
    const studentsMapped = students.map((student) => ({
      id: student.id,
      name: `${student.firstName} ${student.lastName}`,
      identificationType: student.identificationType,
      identificationNumber: student.identificationNumber,
      email: student.email,
      phone: student.phone,
      restaurantMember: student.restaurantMember,
      milkGlassMember: student.milkGlassMember,
      group: student.Group?.name,
    }));
    return studentsMapped;
  } catch {
    return [];
  }
};
export const getStudentById = async (id: string) => {
  try {
    const student = await db.student.findUnique({
      where: { id },
      include: {
        Group: true,
      },
    });

    return student;
  } catch {
    return null;
  }
};

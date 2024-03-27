import { db } from "@/lib/db";
import { StudentMapped } from "@/types/student";

export const getStudents = async (): Promise<StudentMapped[]> => {
  try {
    const students = await db.student.findMany({
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

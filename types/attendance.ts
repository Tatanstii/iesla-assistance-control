import { Prisma } from "@prisma/client";

const restaurantAttendanceWithStudent = Prisma.validator<Prisma.RestaurantAttendanceDefaultArgs>()({
  include: {
    student: true,
  },
});

export type RestaurantAttendanceWithStudent = Prisma.RestaurantAttendanceGetPayload<
  typeof restaurantAttendanceWithStudent
>;

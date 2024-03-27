import { Prisma } from "@prisma/client";

const studentWithGroup = Prisma.validator<Prisma.StudentDefaultArgs>()({
  include: {
    Group: true,
  },
});

export type StudentWithGroup = Prisma.StudentGetPayload<typeof studentWithGroup>;

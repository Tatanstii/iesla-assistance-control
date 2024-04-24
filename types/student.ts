import { IdentificationType } from "@prisma/client";

export type StudentMapped = {
  id: string;
  name: string;
  identificationType: IdentificationType;
  identificationNumber: number;
  email: string | null;
  phone: string | null;
  restaurantMember: boolean;
  milkGlassMember: boolean;
  group?: string;
};

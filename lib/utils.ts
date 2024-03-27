import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getFirstLetter = (str: string) => str.charAt(0);

export const normalizeString = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const transformNullToUndefined = (obj: any) => {
  for (const key in obj) {
    if (obj[key] === null) {
      obj[key] = undefined;
    }
  }
  return obj;
};

export const getLocaleDate = (date: Date) => {
  return date.toLocaleString("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" });
};

export const getLocaleDateTime = (date: Date) => {
  return date.toLocaleString("es-CO", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

export const getLocaleTime = (date: Date) => {
  return date.toLocaleString("es-CO", { hour: "numeric", minute: "numeric" });
};

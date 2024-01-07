import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.length > 0 ? word[0].toUpperCase() + word.slice(1) : "")
    .join(" ");
}

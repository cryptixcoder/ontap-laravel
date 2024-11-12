import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeAgo = (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true});
}

export const getInitials = (name: string) => {
    return name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join("");
}

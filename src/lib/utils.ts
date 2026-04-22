import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { parse } from 'culori';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidColorValue(value: string) {
  try {
    return parse(value) !== undefined;
  } catch (error) {
    return false;
  }
}

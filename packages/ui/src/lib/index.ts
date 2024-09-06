import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Core Utilities. Without those utilities our app cannot work
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Composes conditional class values and resolves conflicting
 * Tailwind utilities using last-value-wins semantics.
 *
 * This is the only approved class-composition entry point for
 * components inside apps/website.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

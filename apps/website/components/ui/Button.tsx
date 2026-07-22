import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'link' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'font-mono uppercase tracking-widest transition-colors',
        'inline-flex items-center justify-center cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' &&
          'bg-primary text-on-primary border border-primary hover:bg-primary-container',
        variant === 'secondary' &&
          'bg-transparent text-on-surface border border-primary hover:bg-surface-container',
        variant === 'ghost' &&
          'bg-transparent text-on-surface-variant border border-transparent hover:border-outline-variant',
        variant === 'link' &&
          'bg-transparent text-secondary underline-offset-4 hover:underline p-0',
        variant === 'danger' && 'bg-error text-on-error border border-error hover:opacity-90',
        size === 'sm' && 'px-3 py-1.5 text-[11px]',
        size === 'md' && 'px-5 py-2.5 text-[12px]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

import { cn } from '@/lib/cn';

type BadgeVariant = 'status' | 'stability' | 'kind' | 'classification' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  status: 'bg-surface-container-highest text-on-surface-variant',
  stability: 'bg-tertiary-container text-on-tertiary-container',
  kind: 'bg-secondary-container text-on-secondary-container',
  classification: 'bg-surface-container text-on-surface-variant',
  default: 'bg-surface-container-high text-on-surface-variant',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'font-mono uppercase tracking-widest',
        'px-2 py-0.5 text-[11px] inline-block',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

import { cn } from '@/lib/cn';

interface CardProps {
  title?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ title, badge, children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'border border-outline-muted bg-surface-container-lowest',
        'transition-colors hover:border-primary',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {(title ?? badge) && (
        <div className="bg-surface-container-high border-b border-outline-muted px-4 py-2 flex items-center justify-between">
          {title && (
            <span className="font-mono uppercase tracking-widest text-on-surface-variant text-[11px]">
              {title}
            </span>
          )}
          {badge}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}

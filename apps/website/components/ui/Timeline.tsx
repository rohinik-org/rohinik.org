import { cn } from '@/lib/cn';

export type TimelineStatus =
  | 'complete'
  | 'active'
  | 'planned'
  | 'research'
  | 'experimental'
  | 'stable'
  | 'deprecated'
  | 'pending';

export interface TimelineItem {
  label: string;
  description?: string;
  status: TimelineStatus;
  meta?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const markerClass: Record<TimelineStatus, string> = {
  complete: 'bg-secondary',
  active: 'bg-primary',
  stable: 'bg-secondary',
  planned: 'bg-outline-variant',
  research: 'bg-outline-variant',
  experimental: 'bg-tertiary-container',
  deprecated: 'bg-error',
  pending: 'bg-outline-variant',
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn('relative', className)} role="list">
      {items.map((item, i) => (
        <li key={item.label} className="flex gap-4 pb-8 last:pb-0 relative">
          {i < items.length - 1 && (
            <div
              className="absolute left-[7px] top-4 bottom-0 w-px bg-outline-variant"
              aria-hidden="true"
            />
          )}
          <div className="relative z-10 mt-1.5 shrink-0">
            <div aria-hidden="true" className={cn('w-2 h-2', markerClass[item.status])} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-[14px] text-on-surface font-medium">
                {item.label}
              </span>
              {item.meta && (
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                  {item.meta}
                </span>
              )}
            </div>
            {item.description && (
              <p className="text-sm text-on-surface-variant font-body">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

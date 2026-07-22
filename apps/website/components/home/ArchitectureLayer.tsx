import Link from 'next/link';
import type { Route } from 'next';

interface ArchitectureLayerProps {
  index: number;
  id: string;
  label: string;
  description: string;
  href: string;
}

export function ArchitectureLayer({ index, label, description, href }: ArchitectureLayerProps) {
  return (
    <li className="group">
      <Link
        href={href as Route}
        className="flex items-start gap-6 px-6 py-5 hover:bg-surface-container-low transition-colors border-b border-outline-variant last:border-b-0"
      >
        <span className="font-mono text-label-caps text-on-surface-variant w-8 shrink-0 pt-0.5">
          {String(index).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-2 group-hover:text-secondary transition-colors">
            {label}
          </div>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            {description}
          </p>
        </div>
        <span
          className="font-mono text-label-caps text-on-surface-variant shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        >
          →
        </span>
      </Link>
    </li>
  );
}

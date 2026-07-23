import Link from 'next/link';
import type { Route } from 'next';
import { specificationsContent } from '@/content/specifications';

export function SpecificationReferences() {
  const { references } = specificationsContent;
  return (
    <section
      id="related"
      aria-labelledby="related-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="related-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Continue through the foundation.
        </h2>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {references.map((ref) => (
            <Link
              key={ref.href}
              href={ref.href as Route}
              className="group flex items-start justify-between gap-8 py-6 hover:bg-surface-container transition-colors px-0"
            >
              <div>
                <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface group-hover:text-secondary transition-colors mb-2">
                  {ref.label}
                </div>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {ref.description}
                </p>
              </div>
              <span className="font-mono text-label-caps text-on-surface-variant group-hover:text-secondary transition-colors shrink-0 mt-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import type { Route } from 'next';
import { rs1Content } from '@/content/reference-standards/rs1';

export function RSReferences() {
  const { references } = rs1Content;
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
              className="group flex items-start gap-8 py-6 hover:bg-surface-container transition-colors border-l-2 border-transparent hover:border-secondary pl-4"
            >
              <div>
                <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface group-hover:text-secondary transition-colors mb-2">
                  {ref.label}
                </div>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {ref.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

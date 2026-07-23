import Link from 'next/link';
import type { Route } from 'next';
import { architectureContent } from '@/content/architecture';

export function ArchitectureReferences() {
  const { references } = architectureContent;
  return (
    <section id="references" aria-labelledby="references-heading">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="references-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          {references.heading}
        </h2>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {references.links.map((link) => (
            <Link
              key={link.id}
              href={link.href as Route}
              className="flex items-center justify-between gap-4 py-8 group"
            >
              <div>
                <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface group-hover:text-secondary mb-2 transition-colors">
                  {link.label}
                </div>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {link.description}
                </p>
              </div>
              <span
                className="font-mono text-label-caps text-on-surface-variant group-hover:text-secondary transition-colors shrink-0"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

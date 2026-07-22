import Link from 'next/link';
import type { Route } from 'next';
import { homepageContent } from '@/content/homepage';

export function SpecificationPreview() {
  const { specifications } = homepageContent;
  return (
    <section aria-labelledby="specs-heading" className="border-b border-outline-variant">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <div className="mb-10">
          <h2
            id="specs-heading"
            className="font-headline text-headline-md font-bold text-on-surface mb-2"
          >
            {specifications.heading}
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            {specifications.subheading}
          </p>
        </div>
        <div className="divide-y divide-outline-variant border-t border-b border-outline-variant">
          {specifications.items.map((item) => (
            <Link
              key={item.id}
              href={item.href as Route}
              className="flex items-center justify-between gap-4 py-5 group hover:text-secondary transition-colors"
            >
              <div>
                <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface group-hover:text-secondary mb-1 transition-colors">
                  {item.label}
                </div>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {item.description}
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

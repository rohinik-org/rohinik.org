import Link from 'next/link';
import type { Route } from 'next';
import { ecosystemContent, IMPLEMENTATION_STATUS_LABEL } from '@/content/ecosystem/ecosystem';

export function ReferenceStandardsSection() {
  const { items, callout } = ecosystemContent.referenceStandards;
  return (
    <section
      id="reference-standards"
      aria-labelledby="reference-standards-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="reference-standards-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Reference Standards
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Canonical implementations that demonstrate specification correctness without becoming
          normative.
        </p>
        <div className="flex flex-col sm:flex-row gap-0 mb-8 border border-outline-variant divide-y sm:divide-y-0">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={[
                'flex-1 p-6',
                i < items.length - 1 ? 'sm:border-r sm:border-outline-variant' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <p
                className={[
                  'font-mono text-label-caps uppercase tracking-widest mb-1',
                  item.status === 'available' ? 'text-secondary' : 'text-on-surface-variant',
                ].join(' ')}
              >
                {IMPLEMENTATION_STATUS_LABEL[item.status]}
              </p>
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-2">
                {'href' in item ? (
                  <Link
                    href={item.href as Route}
                    className="hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}
              </h3>
              <p className="font-body text-technical-code text-on-surface-variant leading-snug">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div
          role="note"
          aria-labelledby="reference-standards-callout-heading"
          className="border border-outline-variant p-6 max-w-2xl"
        >
          <p
            id="reference-standards-callout-heading"
            className="font-mono text-technical-code text-on-surface leading-relaxed"
          >
            {callout}
          </p>
        </div>
      </div>
    </section>
  );
}

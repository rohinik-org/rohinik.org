import Link from 'next/link';
import type { Route } from 'next';
import { ecosystemContent, IMPLEMENTATION_STATUS_LABEL } from '@/content/ecosystem/ecosystem';
import type { ImplementationStatus } from '@/content/ecosystem/types';

// ponytail: set lookup avoids const-narrowing false-positives from ESLint
const ACTIVE_STATUSES = new Set<ImplementationStatus>(['available', 'foundation-implementation']);

export function EcosystemOverviewGrid() {
  const { cards } = ecosystemContent.overview;
  return (
    <section
      id="ecosystem-overview"
      aria-labelledby="overview-grid-heading"
      className="border-b border-outline-variant bg-surface"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="overview-grid-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Ecosystem Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-outline-variant divide-y md:divide-y-0">
          {cards.map((card, i) => (
            <Link
              key={card.id}
              href={card.href as Route}
              className={[
                'group p-8 hover:bg-surface-container transition-colors',
                i % 3 !== 2 ? 'lg:border-r border-outline-variant' : '',
                i % 2 === 0 ? 'md:border-r border-outline-variant lg:border-r-0' : '',
                i < 3 ? 'lg:border-b border-outline-variant' : '',
                i < 4 ? 'md:border-b border-outline-variant lg:border-b-0' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <p
                className={[
                  'font-mono text-label-caps uppercase tracking-widest mb-2',
                  ACTIVE_STATUSES.has(card.status) ? 'text-secondary' : 'text-on-surface-variant',
                ].join(' ')}
              >
                {IMPLEMENTATION_STATUS_LABEL[card.status]}
              </p>
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface group-hover:text-secondary transition-colors mb-3">
                {card.label}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import type { Route } from 'next';
import { ecosystemContent } from '@/content/ecosystem/ecosystem';

export function FoundationArchitecture() {
  const { chain, callout } = ecosystemContent.foundation;
  return (
    <section
      id="foundation"
      aria-labelledby="foundation-heading"
      className="border-b border-outline-variant bg-surface"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="foundation-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Foundation Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <ol className="relative list-none" aria-label="Foundation authority chain">
            {chain.map((node, i) => (
              <li key={node.id} className="flex gap-4 pb-0">
                <div className="flex flex-col items-center">
                  <div
                    className={[
                      'w-2 h-2 border shrink-0 mt-1',
                      node.id === 'rs-1'
                        ? 'border-secondary bg-secondary'
                        : 'border-outline-variant bg-surface',
                    ].join(' ')}
                  />
                  {i < chain.length - 1 && (
                    <div className="w-px flex-1 min-h-[2rem] bg-outline-variant" />
                  )}
                </div>
                <div className="pb-5">
                  {'href' in node ? (
                    <Link
                      href={node.href as Route}
                      className="font-mono text-label-caps uppercase tracking-widest font-semibold mb-1 text-secondary hover:underline block"
                    >
                      {node.label}
                    </Link>
                  ) : (
                    <p className="font-mono text-label-caps uppercase tracking-widest font-semibold mb-1 text-on-surface">
                      {node.label}
                    </p>
                  )}
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    {node.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div
            role="note"
            aria-labelledby="foundation-callout-heading"
            className="border border-outline-variant p-6 self-start"
          >
            <p
              id="foundation-callout-heading"
              className="font-mono text-technical-code text-on-surface leading-relaxed"
            >
              {callout}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

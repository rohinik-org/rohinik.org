import { governanceContent } from '@/content/governance';

export function GovernancePrinciples() {
  const { principles } = governanceContent;
  return (
    <section
      id="principles"
      aria-labelledby="principles-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="principles-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Governance Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 border border-outline-variant">
          {principles.map((p, i) => (
            <div
              key={p.index}
              className={[
                'p-8',
                i % 2 === 0 ? 'md:border-r border-outline-variant' : '',
                i < 2 ? 'md:border-b border-outline-variant' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span
                aria-hidden="true"
                className="font-mono text-label-caps text-on-surface-variant mb-4 block"
              >
                {p.index}
              </span>
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-3">
                {p.title}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

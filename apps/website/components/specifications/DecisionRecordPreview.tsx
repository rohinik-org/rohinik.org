import { specificationsContent } from '@/content/specifications';

export function DecisionRecordPreview() {
  const { adrs } = specificationsContent;
  return (
    <section
      id="decisions"
      aria-labelledby="decisions-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="decisions-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Architectural Decision Records
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          ADRs explain why significant architectural decisions were made. They are distinct from
          normative specifications — an ADR records rationale, not obligations.
        </p>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {adrs.map((adr) => (
            <div
              key={adr.id}
              className="grid grid-cols-1 md:grid-cols-[7rem_1fr] md:items-baseline gap-2 md:gap-8 py-5"
            >
              <span className="font-mono text-label-caps uppercase tracking-widest text-secondary">
                {adr.id}
              </span>
              <span className="font-body text-body-md text-on-surface">{adr.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

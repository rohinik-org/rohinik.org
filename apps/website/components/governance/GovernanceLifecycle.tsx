import { governanceContent } from '@/content/governance';

export function GovernanceLifecycle() {
  const { lifecycle } = governanceContent;
  return (
    <section
      id="lifecycle"
      aria-labelledby="lifecycle-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="lifecycle-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Governance Lifecycle
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Governance changes progress through defined stages before becoming authoritative.
        </p>
        <ol className="flex flex-col sm:flex-row gap-0 border border-outline-variant divide-y sm:divide-y-0 sm:divide-x divide-outline-variant overflow-x-auto list-none">
          {lifecycle.map((item) => (
            <li key={item.id} id={item.id} className="flex-1 p-5 min-w-[120px]">
              <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-2">
                {item.stage}
              </div>
              <p className="font-body text-technical-code text-on-surface-variant leading-snug">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

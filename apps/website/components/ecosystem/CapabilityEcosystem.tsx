import { ecosystemContent, IMPLEMENTATION_STATUS_LABEL } from '@/content/ecosystem/ecosystem';

export function CapabilityEcosystem() {
  const { domains, callout } = ecosystemContent.capabilityEcosystem;
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="border-b border-outline-variant bg-surface"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="capabilities-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Capability Ecosystem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-outline-variant divide-y md:divide-y-0 mb-8">
          {domains.map((domain, i) => (
            <div
              key={domain.id}
              className={[
                'p-6',
                i % 3 !== 2 ? 'lg:border-r border-outline-variant' : '',
                i % 2 === 0 ? 'md:border-r border-outline-variant lg:border-r-0' : '',
                i < 9 ? 'lg:border-b border-outline-variant' : '',
                i < 10 ? 'md:border-b border-outline-variant lg:border-b-0' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <p className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
                {IMPLEMENTATION_STATUS_LABEL[domain.status]}
              </p>
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-2">
                {domain.label}
              </h3>
              <p className="font-body text-technical-code text-on-surface-variant leading-snug">
                {domain.description}
              </p>
            </div>
          ))}
        </div>
        <div
          role="note"
          aria-labelledby="capabilities-callout-heading"
          className="border border-outline-variant p-6 max-w-2xl"
        >
          <p
            id="capabilities-callout-heading"
            className="font-mono text-technical-code text-on-surface leading-relaxed"
          >
            {callout}
          </p>
        </div>
      </div>
    </section>
  );
}

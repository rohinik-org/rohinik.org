import { ecosystemContent, IMPLEMENTATION_STATUS_LABEL } from '@/content/ecosystem/ecosystem';

export function ProviderEcosystem() {
  const { domains, callout } = ecosystemContent.providerEcosystem;
  return (
    <section
      id="providers"
      aria-labelledby="providers-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="providers-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Provider Ecosystem
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full border border-outline-variant border-collapse">
            <thead>
              <tr className="bg-surface-container">
                <th className="text-left p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface border-b border-outline-variant">
                  Provider Domain
                </th>
                <th className="text-left p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface border-b border-outline-variant">
                  Purpose
                </th>
                <th className="text-left p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface border-b border-outline-variant">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {domains.map((domain) => (
                <tr key={domain.id} className="hover:bg-surface-container transition-colors">
                  <td className="p-4 font-mono text-technical-code text-on-surface font-semibold">
                    {domain.label}
                  </td>
                  <td className="p-4 font-body text-body-md text-on-surface-variant">
                    {domain.purpose}
                  </td>
                  <td className="p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface-variant">
                    {IMPLEMENTATION_STATUS_LABEL[domain.status]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          role="note"
          aria-labelledby="providers-callout-heading"
          className="border border-outline-variant p-6 max-w-2xl"
        >
          <p
            id="providers-callout-heading"
            className="font-mono text-technical-code text-on-surface leading-relaxed"
          >
            {callout}
          </p>
        </div>
      </div>
    </section>
  );
}

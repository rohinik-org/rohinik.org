import { ecosystemContent, IMPLEMENTATION_STATUS_LABEL } from '@/content/ecosystem/ecosystem';

// ponytail: avoid ESLint strict comparison elimination; runtime-opaque Set
const ACTIVE_STATUSES = new Set(['foundation-implementation']);

export function SDKSection() {
  const { items, note } = ecosystemContent.sdks;
  return (
    <section
      id="sdks"
      aria-labelledby="sdks-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="sdks-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          SDKs
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full border border-outline-variant border-collapse">
            <thead>
              <tr className="bg-surface-container">
                <th className="text-left p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface border-b border-outline-variant">
                  Language
                </th>
                <th className="text-left p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface border-b border-outline-variant">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {items.map((sdk) => {
                const isActive = ACTIVE_STATUSES.has(sdk.status);
                return (
                  <tr key={sdk.id} className="hover:bg-surface-container transition-colors">
                    <td
                      className={[
                        'p-4 font-mono text-technical-code font-semibold',
                        isActive ? 'text-secondary' : 'text-on-surface',
                      ].join(' ')}
                    >
                      {sdk.language}
                    </td>
                    <td
                      className={[
                        'p-4 font-mono text-label-caps uppercase tracking-widest',
                        isActive ? 'text-secondary' : 'text-on-surface-variant',
                      ].join(' ')}
                    >
                      {IMPLEMENTATION_STATUS_LABEL[sdk.status]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
          {note}
        </p>
      </div>
    </section>
  );
}

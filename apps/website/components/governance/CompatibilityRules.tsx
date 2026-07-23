import { governanceContent } from '@/content/governance';

export function CompatibilityRules() {
  const { versioning, evolution } = governanceContent.compatibility;
  return (
    <section
      id="compatibility"
      aria-labelledby="compatibility-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="compatibility-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Compatibility Rules
        </h2>

        <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-6">
          Version Semantics
        </h3>
        <div className="overflow-x-auto mb-16">
          <table className="w-full border border-outline-variant border-collapse">
            <caption className="sr-only">Version semantics for governance changes</caption>
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="text-left font-mono text-label-caps uppercase tracking-widest text-on-surface p-4 w-32">
                  Level
                </th>
                <th className="text-left font-mono text-label-caps uppercase tracking-widest text-on-surface p-4">
                  Rule
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {versioning.map((v) => (
                <tr key={v.id}>
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface p-4 align-top">
                    {v.level}
                  </td>
                  <td className="font-body text-body-md text-on-surface-variant p-4 leading-relaxed align-top">
                    {v.rule}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-6">
          Specification Evolution
        </h3>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {evolution.map((e) => (
            <div
              key={e.id}
              className="grid grid-cols-1 md:grid-cols-[8rem_1fr] gap-2 md:gap-8 py-5"
            >
              <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                {e.level}
              </span>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {e.rule}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

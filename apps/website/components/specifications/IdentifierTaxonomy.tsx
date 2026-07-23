import { specificationsContent } from '@/content/specifications';

export function IdentifierTaxonomy() {
  const { identifierTaxonomy } = specificationsContent;
  return (
    <section
      id="identifiers"
      aria-labelledby="identifiers-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="identifiers-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Identifier Taxonomy
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-8">
          Each identifier prefix denotes a distinct class of specification statement. Prefixes are
          stable references — not document section labels.
        </p>

        <div className="border border-outline-variant p-6 mb-10 bg-surface-container-low">
          <p className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-2">
            Identifier Stability
          </p>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Published identifiers are permanent references. Deprecation does not delete or renumber
            them. Frozen identifiers remain resolvable indefinitely.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-outline-variant" aria-label="Identifier taxonomy">
            <caption className="sr-only">
              Rohinik identifier prefix taxonomy — 14 classes from LAW to ERR
            </caption>
            <thead>
              <tr className="border-b border-outline-variant">
                {['Prefix', 'Meaning', 'Authority', 'Stability'].map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {identifierTaxonomy.map((row) => (
                <tr key={row.prefix} className="hover:bg-surface-container transition-colors">
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface px-4 py-3">
                    {row.prefix}
                  </td>
                  <td className="font-body text-body-md text-on-surface-variant px-4 py-3">
                    {row.meaning}
                  </td>
                  <td className="font-mono text-technical-code text-on-surface-variant px-4 py-3">
                    {row.authority}
                  </td>
                  <td className="font-mono text-technical-code text-on-surface-variant px-4 py-3">
                    {row.stability}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

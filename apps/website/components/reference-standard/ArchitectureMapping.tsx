import { rs1Content } from '@/content/reference-standards/rs1';

export function ArchitectureMapping() {
  const { architectureMapping } = rs1Content;
  return (
    <section
      id="architecture-mapping"
      aria-labelledby="architecture-mapping-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="architecture-mapping-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Architecture Mapping
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Each architectural layer is implemented by a canonical RS-1 package. The governing
          authority column identifies which published specification governs that layer — not RS-1.
        </p>
        <div className="overflow-x-auto">
          <table
            className="w-full border border-outline-variant"
            aria-label="RS-1 architecture layer mapping"
          >
            <caption className="sr-only">
              RS-1 architecture mapping: layer, canonical package, and governing authority
            </caption>
            <thead>
              <tr className="border-b border-outline-variant">
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-40"
                >
                  Layer
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3"
                >
                  Canonical Package
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3"
                >
                  Governing Authority
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {architectureMapping.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container transition-colors">
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface px-4 py-4 align-baseline">
                    {row.layer}
                  </td>
                  <td className="font-mono text-technical-code text-on-surface-variant px-4 py-4 align-baseline">
                    {row.canonicalPackage}
                  </td>
                  <td className="font-body text-body-md text-on-surface-variant px-4 py-4 align-baseline leading-relaxed">
                    {row.authority.label} — {row.authority.specification}
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

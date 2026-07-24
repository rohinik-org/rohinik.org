import { rs1Content } from '@/content/reference-standards/rs1';

export function ImplementedSpecifications() {
  const { implementedSpecifications } = rs1Content;
  return (
    <section
      id="implemented-specs"
      aria-labelledby="implemented-specs-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="implemented-specs-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Implemented Specifications
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          RS-1 implements the following published specifications. Conformance is determined against
          each specification independently.
        </p>
        <div className="overflow-x-auto mb-8">
          <table
            className="w-full border border-outline-variant"
            aria-label="Specifications implemented by RS-1"
          >
            <caption className="sr-only">
              Specifications implemented by RS-1 with version and implementation status
            </caption>
            <thead>
              <tr className="border-b border-outline-variant">
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-28"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3"
                >
                  Specification
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-24"
                >
                  Version
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-32"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-44"
                >
                  Implementation Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {implementedSpecifications.map((spec) => (
                <tr key={spec.id} className="hover:bg-surface-container transition-colors">
                  <td className="font-mono text-technical-code text-on-surface px-4 py-4 align-baseline">
                    {spec.id}
                  </td>
                  <td className="font-body text-body-md text-on-surface px-4 py-4 align-baseline leading-relaxed">
                    {spec.title}
                  </td>
                  <td className="font-mono text-technical-code text-on-surface-variant px-4 py-4 align-baseline">
                    {spec.version}
                  </td>
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant px-4 py-4 align-baseline">
                    {spec.status}
                  </td>
                  <td className="font-mono text-label-caps uppercase tracking-widest text-secondary px-4 py-4 align-baseline">
                    {spec.coverage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          role="note"
          aria-label="Additional specifications pending"
          className="border border-outline-variant p-6 max-w-3xl"
        >
          <p className="font-mono text-technical-code text-on-surface-variant leading-relaxed">
            Additional specifications will be added to this table as RS-1 coverage expands. Each
            specification added here has been published and is subject to the governance process.
          </p>
        </div>
      </div>
    </section>
  );
}

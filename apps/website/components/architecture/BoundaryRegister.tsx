import { architectureContent } from '@/content/architecture';

export function BoundaryRegister() {
  const { boundaries } = architectureContent;
  return (
    <section
      id="boundaries"
      aria-labelledby="boundaries-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="boundaries-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Architectural Boundaries
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Architecture is defined as much by prohibited coupling as by components. Each boundary
          specifies what a layer may and may not do at the contract level.
        </p>
        <div className="overflow-x-auto">
          <table
            className="w-full border border-outline-variant"
            aria-label="Rohinik architectural boundaries"
          >
            <caption className="sr-only">Rohinik architectural boundaries register</caption>
            <thead>
              <tr className="border-b border-outline-variant">
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-28"
                >
                  From
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-28"
                >
                  To
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-52"
                >
                  Contract
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3"
                >
                  Rule
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {boundaries.map((boundary) => (
                <tr key={boundary.id} className="hover:bg-surface-container transition-colors">
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface px-4 py-4 align-top">
                    {boundary.from}
                  </td>
                  <td className="font-mono text-label-caps uppercase tracking-widest text-secondary px-4 py-4 align-top">
                    {boundary.to}
                  </td>
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant px-4 py-4 align-top">
                    {boundary.contract}
                  </td>
                  <td className="font-body text-body-md text-on-surface-variant px-4 py-4 align-top leading-relaxed">
                    {boundary.rule}
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

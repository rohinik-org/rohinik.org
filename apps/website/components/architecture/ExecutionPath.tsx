import { architectureContent } from '@/content/architecture';

export function ExecutionPath() {
  const { executionPath } = architectureContent;
  return (
    <section
      id="execution"
      aria-labelledby="execution-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="execution-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Execution Path
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          How a request moves through the architecture from interface to result. Intelligence
          providers are invoked only where deterministic mechanisms are insufficient.
        </p>
        <div className="overflow-x-auto">
          <table
            className="w-full border border-outline-variant"
            aria-label="Rohinik execution path"
          >
            <caption className="sr-only">
              Rohinik execution path — nine stages from Accept to Present
            </caption>
            <thead>
              <tr className="border-b border-outline-variant">
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-12"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-36"
                >
                  Stage
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-36"
                >
                  Layer
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {executionPath.map((stage) => (
                <tr key={stage.index} className="hover:bg-surface-container transition-colors">
                  <td className="font-mono text-label-caps text-on-surface-variant px-4 py-4">
                    {stage.index}
                  </td>
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface px-4 py-4">
                    {stage.label}
                  </td>
                  <td className="font-mono text-label-caps uppercase tracking-widest text-secondary px-4 py-4">
                    {stage.layer}
                  </td>
                  <td className="font-body text-body-md text-on-surface-variant px-4 py-4 leading-relaxed">
                    {stage.description}
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

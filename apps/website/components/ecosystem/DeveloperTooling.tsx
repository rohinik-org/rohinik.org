import { ecosystemContent, IMPLEMENTATION_STATUS_LABEL } from '@/content/ecosystem/ecosystem';

export function DeveloperTooling() {
  const { tools } = ecosystemContent.tooling;
  return (
    <section
      id="tooling"
      aria-labelledby="tooling-heading"
      className="border-b border-outline-variant bg-surface"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="tooling-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Developer Tooling
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-outline-variant border-collapse">
            <thead>
              <tr className="bg-surface-container">
                <th className="text-left p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface border-b border-outline-variant">
                  Tool
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
              {tools.map((tool) => (
                <tr key={tool.id} className="hover:bg-surface-container transition-colors">
                  <td className="p-4 font-mono text-technical-code text-on-surface font-semibold">
                    {tool.label}
                  </td>
                  <td className="p-4 font-body text-body-md text-on-surface-variant">
                    {tool.purpose}
                  </td>
                  <td className="p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface-variant">
                    {IMPLEMENTATION_STATUS_LABEL[tool.status]}
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

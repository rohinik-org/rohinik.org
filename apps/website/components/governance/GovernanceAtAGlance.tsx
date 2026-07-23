import { governanceContent } from '@/content/governance';

export function GovernanceAtAGlance() {
  const { nodes } = governanceContent.atAGlance;
  return (
    <section
      id="at-a-glance"
      aria-labelledby="at-a-glance-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="at-a-glance-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Governance at a Glance
        </h2>
        <div className="flex flex-col md:flex-row md:items-stretch gap-0 border border-outline-variant divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          {nodes.map((node) => (
            <div key={node.id} className="flex-1 p-6 flex flex-col gap-1">
              <span className="font-mono text-label-caps uppercase tracking-widest text-secondary">
                {node.authorityType}
              </span>
              <span className="font-mono text-technical-code font-bold text-on-surface">
                {node.label}
              </span>
              <p className="font-mono text-technical-code text-on-surface-variant leading-snug mt-1">
                {node.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

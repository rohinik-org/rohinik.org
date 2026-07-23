import { specificationsContent } from '@/content/specifications';

export function AuthorityHierarchy() {
  const { authorityChain } = specificationsContent;
  return (
    <section
      id="authority"
      aria-labelledby="authority-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="authority-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Authority Hierarchy
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Identifier precedence flows downward only. A lower-authority requirement cannot override a
          constitutional law.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-6">
              Highest Authority
            </p>
            <ol className="relative" aria-label="Authority hierarchy from highest to lowest">
              {authorityChain.map((item, i) => (
                <li key={item.prefix} className="flex gap-4 pb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 border border-on-surface bg-surface mt-1 shrink-0" />
                    {i < authorityChain.length - 1 && (
                      <div className="w-px flex-1 min-h-[2rem] bg-outline-variant" />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                        {item.prefix}
                      </span>
                      <span className="font-body text-technical-code text-on-surface-variant">
                        {item.name}
                      </span>
                    </div>
                    <p className="font-body text-technical-code text-on-surface-variant">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mt-2">
              Lowest Architectural Precedence
            </p>
          </div>
          <div className="border-t border-outline-variant lg:border-t-0 lg:border-l lg:pl-12 pt-8 lg:pt-0">
            <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-6">
              Normative versus Informative
            </h3>
            <div className="space-y-6">
              <div className="border border-outline-variant p-6">
                <p className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3">
                  Normative
                </p>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  Defines obligations, invariants, requirements, lifecycle semantics, or security
                  constraints that affect conformance.
                </p>
              </div>
              <div className="border border-outline-variant p-6">
                <p className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3">
                  Informative
                </p>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  Provides observation, explanation, guidance, examples, or implementation context
                  without adding requirements. OBS must not be interpreted as a requirement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

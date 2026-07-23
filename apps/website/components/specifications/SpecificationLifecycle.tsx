import { specificationsContent } from '@/content/specifications';

export function SpecificationLifecycle() {
  const { lifecycle, versioningRules } = specificationsContent;
  return (
    <section
      id="lifecycle"
      aria-labelledby="lifecycle-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="lifecycle-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Specification Lifecycle
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Specification maturity progresses through defined stages. Document lifecycle status is
          independent of runtime lifecycle semantics.
        </p>

        <div className="flex flex-col sm:flex-row gap-0 mb-16 border border-outline-variant divide-y sm:divide-y-0 sm:divide-x divide-outline-variant overflow-x-auto">
          {lifecycle.map((stage, i) => (
            <div key={stage.status} className="flex-1 p-5 min-w-[120px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                  {stage.status}
                </span>
                {i < lifecycle.length - 1 && (
                  <span className="hidden sm:inline font-mono text-label-caps text-on-surface-variant">
                    →
                  </span>
                )}
              </div>
              <p className="font-body text-technical-code text-on-surface-variant leading-snug">
                {stage.description}
              </p>
            </div>
          ))}
        </div>

        <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-6">
          Versioning Rules
        </h3>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {versioningRules.map((v) => (
            <div
              key={v.level}
              className="grid grid-cols-1 md:grid-cols-[6rem_1fr] gap-2 md:gap-8 py-5"
            >
              <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                {v.level}
              </span>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {v.rule}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

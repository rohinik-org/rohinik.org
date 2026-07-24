import { rs1Content } from '@/content/reference-standards/rs1';

export function DevelopmentLifecycle() {
  const { lifecycle } = rs1Content;
  return (
    <section
      id="lifecycle"
      aria-labelledby="lifecycle-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="lifecycle-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Development Lifecycle
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Each published specification revision starts a new implementation, verification,
          conformance, and release cycle. RS-1 evolves by repeating this lifecycle for every
          applicable specification revision.
        </p>
        <ol
          className="flex flex-col sm:flex-row gap-0 mb-8 border border-outline-variant divide-y sm:divide-y-0 overflow-x-auto list-none"
          aria-label="RS-1 development lifecycle stages"
        >
          {lifecycle.steps.map((step, i) => (
            <li
              key={step.id}
              className={[
                'flex-1 p-5 min-w-[120px]',
                i < lifecycle.steps.length - 1 ? 'sm:border-r sm:border-outline-variant' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <p className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-2">
                {step.label}
              </p>
              <p className="font-body text-technical-code text-on-surface-variant leading-snug">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
        <div
          role="note"
          aria-labelledby="lifecycle-callout-heading"
          className="border border-outline-variant p-6 max-w-2xl"
        >
          <p
            id="lifecycle-callout-heading"
            className="font-mono text-technical-code text-on-surface leading-relaxed"
          >
            {lifecycle.callout}
          </p>
        </div>
      </div>
    </section>
  );
}

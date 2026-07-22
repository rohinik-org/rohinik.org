import { homepageContent } from '@/content/homepage';

export function ExecutionFlowSection() {
  const { execution } = homepageContent;
  return (
    <section aria-labelledby="exec-heading" className="border-b border-outline-variant">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <div className="mb-12">
          <h2
            id="exec-heading"
            className="font-headline text-headline-md font-bold text-on-surface mb-2"
          >
            {execution.heading}
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">{execution.subheading}</p>
        </div>
        <ol
          aria-label="Rohinik execution flow"
          className="grid grid-cols-1 md:grid-cols-7 border border-outline-variant divide-y md:divide-y-0 md:divide-x divide-outline-variant"
        >
          {execution.stages.map((stage) => (
            <li key={stage.id} className="p-4">
              <div className="font-mono text-label-caps text-secondary mb-2">{stage.index}</div>
              <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-2">
                {stage.label}
              </div>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed text-[0.8125rem]">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

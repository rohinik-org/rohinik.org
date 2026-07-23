import { governanceContent } from '@/content/governance';

export function ChangeProcess() {
  const { changeProcess } = governanceContent;
  return (
    <section
      id="change-process"
      aria-labelledby="change-process-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="change-process-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Change Process
        </h2>
        <ol
          className="divide-y divide-outline-variant border-t border-outline-variant list-none"
          aria-label="Governance change process steps"
        >
          {changeProcess.map((item) => (
            <li
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-2 md:gap-8 py-5"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-label-caps text-on-surface-variant">
                  {item.step}
                </span>
                <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface font-semibold">
                  {item.name}
                </span>
              </div>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {item.rule}
              </p>
            </li>
          ))}
        </ol>
        <div
          role="note"
          aria-labelledby="governance-callout-heading"
          className="mt-8 border border-outline-variant p-6"
        >
          <p
            id="governance-callout-heading"
            className="font-mono text-technical-code text-on-surface leading-relaxed"
          >
            Code never becomes authoritative first. Specifications do.
          </p>
        </div>
      </div>
    </section>
  );
}

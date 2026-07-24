import { rs1Content, COVERAGE_STATUS } from '@/content/reference-standards/rs1';
import type { CoverageStatus } from '@/content/reference-standards/rs1';

const STATUS_LABEL: Record<CoverageStatus, string> = {
  [COVERAGE_STATUS.IMPLEMENTED]: 'Implemented',
  [COVERAGE_STATUS.PARTIAL]: 'Partial',
  [COVERAGE_STATUS.PLANNED]: 'Planned',
};

export function CapabilityCoverage() {
  const { coverage } = rs1Content;
  return (
    <section
      id="coverage"
      aria-labelledby="coverage-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="coverage-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Capability Coverage
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Coverage indicates the current implementation status of each capability domain relative to
          its published specification.
        </p>
        <dl className="grid grid-cols-2 md:grid-cols-4 border border-outline-variant divide-y md:divide-y-0">
          {coverage.map((item, i) => (
            <div
              key={item.id}
              className={[
                'p-6 flex flex-col gap-2',
                i % 4 !== 3 ? 'md:border-r border-outline-variant' : '',
                i < 4 ? 'md:border-b border-outline-variant' : '',
                i % 2 === 0 ? 'border-r border-outline-variant md:border-r-0' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                {item.label}
              </dt>
              <dd
                className={[
                  'font-mono text-label-caps uppercase tracking-widest',
                  item.status === COVERAGE_STATUS.IMPLEMENTED
                    ? 'text-secondary'
                    : 'text-on-surface-variant',
                ].join(' ')}
              >
                {STATUS_LABEL[item.status]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

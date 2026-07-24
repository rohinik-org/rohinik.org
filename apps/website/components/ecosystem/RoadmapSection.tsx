import { ecosystemContent } from '@/content/ecosystem/ecosystem';

export function RoadmapSection() {
  const { milestones } = ecosystemContent.roadmap;
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="roadmap-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Roadmap
        </h2>
        <ol
          className="flex flex-col sm:flex-row gap-0 border border-outline-variant divide-y sm:divide-y-0 overflow-x-auto list-none"
          aria-label="Ecosystem roadmap milestones"
        >
          {milestones.map((milestone, i) => (
            <li
              key={milestone.id}
              className={[
                'flex-1 p-5 min-w-[140px]',
                i < milestones.length - 1 ? 'sm:border-r sm:border-outline-variant' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <p
                className={[
                  'font-mono text-label-caps uppercase tracking-widest mb-2',
                  milestone.status === 'completed' || milestone.status === 'active'
                    ? 'text-secondary'
                    : 'text-on-surface',
                ].join(' ')}
              >
                {milestone.label}
              </p>
              <p className="font-body text-technical-code text-on-surface-variant leading-snug">
                {milestone.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

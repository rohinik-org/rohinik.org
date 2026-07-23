import { governanceContent } from '@/content/governance';

export function AuthorityModel() {
  const { authorityModel } = governanceContent;
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
          Authority Model
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Authority flows downward only. A lower-level record cannot override a higher-level one.
        </p>
        <ol className="relative" aria-label="Authority levels from highest to lowest">
          {authorityModel.map((record, i) => (
            <li id={`authority-${record.id}`} key={record.id} className="flex gap-4 pb-0">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 border border-on-surface bg-surface mt-1 shrink-0" />
                {i < authorityModel.length - 1 && (
                  <div className="w-px flex-1 min-h-[3rem] bg-outline-variant" />
                )}
              </div>
              <div className="pb-8 flex-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    aria-hidden="true"
                    className="font-mono text-label-caps text-on-surface-variant"
                  >
                    {record.level}
                  </span>
                  <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
                    {record.name}
                  </h3>
                  <span className="font-mono text-label-caps uppercase tracking-widest text-secondary">
                    {record.authority}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <dl>
                    <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-2">
                      Owns
                    </dt>
                    {record.owns.map((item) => (
                      <dd
                        key={item}
                        className="font-body text-technical-code text-on-surface-variant leading-snug mb-1"
                      >
                        {item}
                      </dd>
                    ))}
                  </dl>
                  <dl>
                    <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-2">
                      Cannot
                    </dt>
                    {record.cannot.map((item) => (
                      <dd
                        key={item}
                        className="font-body text-technical-code text-on-surface-variant leading-snug mb-1"
                      >
                        {item}
                      </dd>
                    ))}
                  </dl>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { rs1Content } from '@/content/reference-standards/rs1';

export function RSOverview() {
  const { overview } = rs1Content;
  return (
    <section
      id="what-is-rs1"
      aria-labelledby="what-is-rs1-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="what-is-rs1-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          What is RS-1?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <h3 className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-6">
              Purpose
            </h3>
            <ul className="space-y-3 list-none">
              {overview.purpose.map((item) => (
                <li key={item} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="w-1.5 h-1.5 bg-secondary shrink-0 mt-2" />
                  <span className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-6">
              Not intended to
            </h3>
            <ul className="space-y-3 list-none">
              {overview.notIntendedTo.map((item) => (
                <li key={item} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="w-1.5 h-1.5 bg-outline shrink-0 mt-2" />
                  <span className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

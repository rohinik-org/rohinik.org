import { ecosystemContent } from '@/content/ecosystem/ecosystem';

export function EcosystemIntroduction() {
  const { introduction } = ecosystemContent;
  return (
    <section
      id="what-is-the-ecosystem"
      aria-labelledby="introduction-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="introduction-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          What is the Ecosystem?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-6">
              Purpose
            </p>
            <ul className="space-y-4 list-none">
              {introduction.purpose.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-1.5 h-1.5 mt-2 bg-secondary shrink-0" aria-hidden="true" />
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-6">
              Not Intended To
            </p>
            <ul className="space-y-4 list-none">
              {introduction.notIntendedTo.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-1.5 h-1.5 mt-2 bg-outline shrink-0" aria-hidden="true" />
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

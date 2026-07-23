import { governanceContent } from '@/content/governance';

const REGISTER_DESCRIPTIONS: Record<string, string> = {
  Constitution: 'Immutable architectural laws.',
  Specifications: 'Authoritative public contracts.',
  Governance: 'Oversight and change control.',
  Conformance: 'Verification against specifications.',
};

export function GovernanceHero() {
  const { hero } = governanceContent;
  return (
    <section
      id="overview"
      aria-labelledby="governance-heading"
      className="border-b border-outline-variant bg-[radial-gradient(var(--color-outline-variant)_1px,transparent_1px)] bg-[size:24px_24px]"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-6">
          {hero.eyebrow}
        </p>
        <h1
          id="governance-heading"
          className="font-headline text-headline-lg-mobile md:text-headline-xl font-bold text-on-surface mb-6 leading-tight tracking-tight max-w-5xl"
        >
          {hero.title}
        </h1>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          {hero.description}
        </p>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-outline-variant divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          {hero.register.map((term) => (
            <div key={term} className="py-6 px-0 md:px-6 first:pl-0">
              <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-2">
                {term}
              </dt>
              <dd className="font-mono text-technical-code text-on-surface">
                {REGISTER_DESCRIPTIONS[term] ?? term}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

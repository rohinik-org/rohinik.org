import { rs1Content } from '@/content/reference-standards/rs1';

export function RSHero() {
  const { hero } = rs1Content;
  return (
    <section
      id="overview"
      aria-labelledby="rs1-heading"
      className="border-b border-outline-variant dot-grid"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-6">
          {hero.eyebrow}
        </p>
        <h1
          id="rs1-heading"
          className="font-headline text-headline-lg-mobile md:text-headline-xl font-bold text-on-surface mb-4 leading-tight tracking-tight max-w-5xl"
        >
          {hero.title}
        </h1>
        <p className="font-mono text-technical-code text-on-surface-variant max-w-2xl leading-relaxed mb-4">
          {hero.subtitle}
        </p>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          {hero.description}
        </p>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-outline-variant divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          {hero.register.map((item) => (
            <div key={item.term} className="py-6 px-0 md:px-6 first:pl-0">
              <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-2">
                {item.term}
              </dt>
              <dd className="font-mono text-technical-code text-on-surface">{item.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

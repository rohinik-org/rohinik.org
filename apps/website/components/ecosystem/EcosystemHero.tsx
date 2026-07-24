import { ecosystemContent } from '@/content/ecosystem/ecosystem';
import { EcosystemMap } from './EcosystemMap';

export function EcosystemHero() {
  const { hero } = ecosystemContent;
  return (
    <section
      id="overview"
      aria-labelledby="ecosystem-hero-heading"
      className="border-b border-outline-variant bg-surface relative overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid" />
      <div className="relative max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-4">
          {hero.eyebrow}
        </p>
        <h1
          id="ecosystem-hero-heading"
          className="font-headline text-headline-xl font-bold text-on-surface mb-6"
        >
          {hero.title}
        </h1>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-16">
          {hero.subtitle}
        </p>
        <div className="border border-outline-variant bg-surface-container-low p-4 md:p-8">
          <EcosystemMap graph={hero.graph} />
        </div>
      </div>
    </section>
  );
}

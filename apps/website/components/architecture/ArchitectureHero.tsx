import { architectureContent } from '@/content/architecture';

export function ArchitectureHero() {
  const { hero, layers, crossCuttingSystems } = architectureContent;
  return (
    <section
      id="overview"
      aria-labelledby="architecture-title"
      className="dot-grid border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-24 md:py-32">
        <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-6">
          {hero.eyebrow}
        </p>
        <h1
          id="architecture-title"
          className="font-headline text-headline-lg-mobile md:text-headline-xl font-bold text-on-surface mb-6 leading-tight tracking-tight max-w-5xl"
        >
          {hero.title}
        </h1>
        <p className="font-body text-body-md text-on-surface-variant max-w-3xl leading-relaxed mb-4">
          {hero.description}
        </p>
        <p className="font-body text-body-md text-on-surface-variant max-w-3xl leading-relaxed mb-12">
          {hero.summary}
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-3 border-t border-outline-variant">
          <div className="border-b sm:border-b-0 sm:border-r border-outline-variant py-6 pr-8">
            <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
              Architecture Layers
            </dt>
            <dd className="font-mono text-headline-md font-bold text-on-surface">
              {String(layers.length).padStart(2, '0')}
            </dd>
          </div>
          <div className="border-b sm:border-b-0 sm:border-r border-outline-variant py-6 px-0 sm:px-8">
            <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
              Cross-Cutting Systems
            </dt>
            <dd className="font-mono text-headline-md font-bold text-on-surface">
              {String(crossCuttingSystems.length).padStart(2, '0')}
            </dd>
          </div>
          <div className="py-6 pl-0 sm:pl-8">
            <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
              Contract Boundaries
            </dt>
            <dd className="font-mono text-headline-md font-bold text-on-surface">Explicit</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

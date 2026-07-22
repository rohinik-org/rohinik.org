import Link from 'next/link';
import type { Route } from 'next';
import { homepageContent } from '@/content/homepage';

export function HeroSection() {
  const { hero, architecture } = homepageContent;
  return (
    <section aria-labelledby="hero-heading" className="dot-grid border-b border-outline-variant">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)] gap-16">
          {/* Left column */}
          <div>
            <div className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-4">
              {hero.eyebrow}
            </div>
            <h1
              id="hero-heading"
              className="font-headline text-headline-lg-mobile md:text-headline-xl font-bold text-on-surface mb-6 leading-tight tracking-tight"
            >
              {hero.headline}
            </h1>
            <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-8">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {hero.ctas.map((cta, i) => (
                <Link
                  key={cta.href}
                  href={cta.href as Route}
                  className={
                    i === 0
                      ? 'font-mono text-label-caps uppercase tracking-widest border border-primary bg-primary text-[var(--color-on-primary)] px-5 py-2.5 hover:opacity-90 transition-opacity'
                      : 'font-mono text-label-caps uppercase tracking-widest border border-outline px-5 py-2.5 text-on-surface hover:border-primary transition-colors'
                  }
                >
                  {cta.label}
                </Link>
              ))}
            </div>
            <ul aria-label="Rohinik principles" className="flex flex-wrap gap-6">
              {hero.principles.map((p) => (
                <li
                  key={p}
                  className="font-mono text-label-caps uppercase tracking-widest text-secondary"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
          {/* Right column — architecture miniature */}
          <div className="border border-outline-variant">
            <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-low">
              <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant">
                Architecture Layers
              </span>
            </div>
            <ol className="divide-y divide-outline-variant">
              {architecture.layers.map((layer) => (
                <li key={layer.id} className="px-4 py-3 flex items-center gap-3">
                  <span className="font-mono text-label-caps text-on-surface-variant w-5 shrink-0">
                    {layer.index}
                  </span>
                  <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                    {layer.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

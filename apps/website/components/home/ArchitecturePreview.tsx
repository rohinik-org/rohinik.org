import Link from 'next/link';
import type { Route } from 'next';
import { homepageContent } from '@/content/homepage';

export function ArchitecturePreview() {
  const { architecture } = homepageContent;
  return (
    <section aria-labelledby="arch-heading" className="border-b border-outline-variant">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <div className="mb-10">
          <h2
            id="arch-heading"
            className="font-headline text-headline-md font-bold text-on-surface mb-2"
          >
            {architecture.heading}
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            {architecture.subheading}
          </p>
        </div>
        <ol aria-label="Architecture layers" className="border border-outline-variant">
          {architecture.layers.map((layer) => (
            <li key={layer.id} className="group">
              <Link
                href={layer.href as Route}
                className="flex items-start gap-6 px-6 py-5 hover:bg-surface-container-low transition-colors border-b border-outline-variant last:border-b-0"
              >
                <span className="font-mono text-label-caps text-on-surface-variant w-8 shrink-0 pt-0.5">
                  {String(layer.index).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-2 group-hover:text-secondary transition-colors">
                    {layer.label}
                  </div>
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    {layer.description}
                  </p>
                </div>
                <span
                  className="font-mono text-label-caps text-on-surface-variant shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { architectureContent } from '@/content/architecture';

export function SystemProperties() {
  const { properties } = architectureContent;
  return (
    <section
      id="properties"
      aria-labelledby="properties-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="properties-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          System Properties
        </h2>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="grid grid-cols-1 md:grid-cols-[64px_280px_1fr] gap-4 md:gap-8 py-6"
            >
              <div className="font-mono text-label-caps text-on-surface-variant">{prop.index}</div>
              <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                {prop.title}
              </div>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

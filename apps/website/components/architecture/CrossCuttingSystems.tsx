import { architectureContent } from '@/content/architecture';

export function CrossCuttingSystems() {
  const { crossCuttingSystems } = architectureContent;
  return (
    <section
      id="cross-cutting"
      aria-labelledby="cross-cutting-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="cross-cutting-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Cross-Cutting Systems
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Some responsibilities span every architectural layer rather than belonging to one. These
          systems define rules, identifiers, observability, security, and lifecycle semantics across
          the entire platform.
        </p>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {crossCuttingSystems.map((system) => (
            <div
              key={system.id}
              className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 md:gap-12 py-6 items-start"
            >
              <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                {system.title}
              </div>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {system.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

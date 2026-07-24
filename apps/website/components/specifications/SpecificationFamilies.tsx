import { specificationsContent } from '@/content/specifications';

export function SpecificationFamilies() {
  const { families } = specificationsContent;
  return (
    <section
      id="families"
      aria-labelledby="families-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="families-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Specification Families
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Document families group related specifications by scope and purpose.
        </p>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {families.map((family) => (
            <div
              key={family.id}
              className="grid grid-cols-1 md:grid-cols-[6rem_1fr] gap-4 md:gap-8 py-6 md:items-baseline"
            >
              <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                {family.id}
              </div>
              <div>
                <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-2">
                  {family.title}
                </div>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {family.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

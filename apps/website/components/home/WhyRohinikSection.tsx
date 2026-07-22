import { homepageContent } from '@/content/homepage';

export function WhyRohinikSection() {
  const { why } = homepageContent;
  return (
    <section aria-labelledby="why-heading" className="border-b border-outline-variant">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="why-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          {why.heading}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 border-y border-outline-variant divide-y lg:divide-y-0 lg:divide-x divide-outline-variant">
          {why.statements.map((s) => (
            <article key={s.id} className="px-0 lg:px-8 py-8 first:pl-0 last:pr-0">
              <div className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-3">
                {s.label}
              </div>
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-4">
                {s.heading}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

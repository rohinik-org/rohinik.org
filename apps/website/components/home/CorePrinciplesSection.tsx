import { homepageContent } from '@/content/homepage';

export function CorePrinciplesSection() {
  const { principles } = homepageContent;
  return (
    <section aria-labelledby="principles-heading" className="border-b border-outline-variant">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="principles-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          {principles.heading}
        </h2>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {principles.items.map((item) => (
            <div
              key={item.index}
              className="grid grid-cols-1 md:grid-cols-[64px_280px_1fr] gap-4 md:gap-8 py-6"
            >
              <div className="font-mono text-label-caps text-on-surface-variant">{item.index}</div>
              <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                {item.title}
              </div>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

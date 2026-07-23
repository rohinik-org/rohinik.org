import { specificationsContent } from '@/content/specifications';

export function CorpusSummary() {
  const { corpusTerms } = specificationsContent;
  return (
    <section aria-labelledby="corpus-summary-heading" className="border-b border-outline-variant">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="corpus-summary-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Specification Corpus
        </h2>
        <dl className="grid border-y border-outline-variant lg:grid-cols-4">
          {corpusTerms.map((item, i) => (
            <div
              key={item.term}
              className={[
                'py-7',
                i < corpusTerms.length - 1
                  ? 'border-b border-outline-variant lg:border-b-0 lg:border-r lg:px-7'
                  : 'lg:px-7',
              ].join(' ')}
            >
              <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-4">
                {item.term}
              </dt>
              <dd className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

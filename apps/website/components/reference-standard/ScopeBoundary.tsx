import { rs1Content } from '@/content/reference-standards/rs1';

export function ScopeBoundary() {
  const { authority } = rs1Content;
  const calloutParagraphs = authority.callout.split('\n\n');
  return (
    <section
      id="scope"
      aria-labelledby="scope-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="scope-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Scope and Authority
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <ol className="relative list-none" aria-label="Authority chain">
            {authority.chain.map((item, i) => (
              <li key={item.id} className="flex gap-4 pb-0">
                <div className="flex flex-col items-center">
                  <div
                    className={[
                      'w-2 h-2 border shrink-0 mt-1',
                      item.id === 'rs-1'
                        ? 'border-secondary bg-secondary'
                        : 'border-outline-variant bg-surface',
                    ].join(' ')}
                  />
                  {i < authority.chain.length - 1 && (
                    <div className="w-px flex-1 min-h-[2rem] bg-outline-variant" />
                  )}
                </div>
                <div className="pb-5">
                  <p
                    className={[
                      'font-mono text-label-caps uppercase tracking-widest font-semibold mb-1',
                      item.id === 'rs-1' ? 'text-secondary' : 'text-on-surface',
                    ].join(' ')}
                  >
                    {item.label}
                  </p>
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div
            role="note"
            aria-labelledby="scope-callout-heading"
            className="border border-outline-variant p-6 self-start"
          >
            {calloutParagraphs.map((para, i) => (
              <p
                key={i}
                id={i === 0 ? 'scope-callout-heading' : undefined}
                className={[
                  'font-mono text-technical-code text-on-surface leading-relaxed',
                  i > 0 ? 'mt-4' : '',
                ].join(' ')}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

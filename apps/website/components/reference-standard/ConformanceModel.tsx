import { rs1Content } from '@/content/reference-standards/rs1';

export function ConformanceModel() {
  const { conformance } = rs1Content;
  return (
    <section
      id="conformance"
      aria-labelledby="conformance-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="conformance-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Conformance Model
        </h2>
        <div className="border border-outline-variant bg-surface-container-low p-6 mb-12 max-w-3xl">
          <p className="font-body text-body-md text-on-surface leading-relaxed">
            {conformance.statement}
          </p>
        </div>
        <ol className="relative list-none mb-6" aria-label="Conformance requirements chain">
          {conformance.chain.map((item, i) => (
            <li key={item} className="flex gap-4 pb-0">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 border border-secondary bg-surface mt-1 shrink-0" />
                {i < conformance.chain.length - 1 && (
                  <div className="w-px flex-1 min-h-[2rem] bg-outline-variant" />
                )}
              </div>
              <div className="pb-5 font-body text-body-md text-on-surface leading-relaxed">
                {item}
              </div>
            </li>
          ))}
        </ol>
        <p className="font-mono text-technical-code text-on-surface-variant leading-relaxed max-w-2xl">
          {conformance.chainNote}
        </p>
      </div>
    </section>
  );
}

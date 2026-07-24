import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Reference Standards',
  description:
    'Reference Standards are canonical implementations of the Rohinik Foundation Specifications. Each Reference Standard demonstrates architectural correctness without acquiring normative authority.',
};

export default function ReferenceStandardsPage() {
  return (
    <section
      id="reference-standards"
      aria-labelledby="reference-standards-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-6">
          Reference Standards
        </p>
        <h1
          id="reference-standards-heading"
          className="font-headline text-headline-lg-mobile md:text-headline-xl font-bold text-on-surface mb-4 leading-tight tracking-tight"
        >
          Canonical Implementations
        </h1>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Reference Standards demonstrate how the Rohinik Foundation Specifications are implemented.
          They are subordinate to all published specifications and do not introduce normative
          requirements.
        </p>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          <Link
            href="/reference-standards/rs-1"
            className="group flex items-start gap-8 py-6 hover:bg-surface-container transition-colors border-l-2 border-transparent hover:border-secondary pl-4"
          >
            <div>
              <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface group-hover:text-secondary transition-colors mb-2">
                RS-1
              </div>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                Canonical Reference Implementation of the Rohinik Foundation Specifications.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

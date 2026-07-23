import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AFS-0001 — Rohinik Foundation Specification',
};

export default function AFS0001Page() {
  return (
    <main id="main-content">
      <section className="border-b border-outline-variant">
        <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
          <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-6">
            AFS-0001
          </p>
          <h1 className="font-headline text-headline-lg-mobile md:text-headline-xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
            Rohinik Foundation Specification
          </h1>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-outline-variant pt-8 mb-12">
            {[
              { label: 'Version', value: '1.0' },
              { label: 'Status', value: 'Frozen' },
              { label: 'Authority', value: 'Constitutional' },
              { label: 'Normative', value: 'Yes' },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
                  {label}
                </dt>
                <dd className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed max-w-2xl mb-8">
            The full specification document is available through the governance and documentation
            channels. This page will host the structured specification content when the content
            pipeline is complete.
          </p>
          <Link
            href="/specifications"
            className="font-mono text-label-caps uppercase tracking-widest text-secondary hover:text-on-surface transition-colors"
          >
            ← Back to Specifications
          </Link>
        </div>
      </section>
    </main>
  );
}

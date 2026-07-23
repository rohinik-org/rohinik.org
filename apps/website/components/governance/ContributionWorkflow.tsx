import Link from 'next/link';
import type { Route } from 'next';
import { governanceContent } from '@/content/governance';

export function ContributionWorkflow() {
  const { specificationWorkflow, links } = governanceContent.contribution;
  return (
    <section
      id="contribution"
      aria-labelledby="contribution-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="contribution-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Contribute
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 border border-outline-variant divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          <div className="p-8">
            <h3 className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-6">
              Contribute to Specifications
            </h3>
            <ol className="list-none divide-y divide-outline-variant border-t border-outline-variant">
              {specificationWorkflow.map((item) => (
                <li key={item.id} className="grid grid-cols-[3rem_1fr] gap-2 py-3">
                  <span className="font-mono text-label-caps text-on-surface-variant">
                    {item.step}
                  </span>
                  <span className="font-mono text-technical-code text-on-surface">{item.name}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="p-8">
            <h3 className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-6">
              Resources
            </h3>
            <div className="divide-y divide-outline-variant border-t border-outline-variant">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href as Route}
                  className="group flex items-start justify-between gap-4 py-4 hover:bg-surface-container transition-colors"
                >
                  <div>
                    <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface group-hover:text-secondary transition-colors mb-1">
                      {link.label}
                    </div>
                    <p className="font-body text-technical-code text-on-surface-variant leading-snug">
                      {link.description}
                    </p>
                  </div>
                  <span className="font-mono text-label-caps text-on-surface-variant group-hover:text-secondary transition-colors shrink-0 mt-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

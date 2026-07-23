import Link from 'next/link';
import type { Route } from 'next';
import type { SpecificationRecord, SpecificationStatus } from '@/lib/specifications/types';

interface SpecificationRegistryProps {
  specifications: readonly SpecificationRecord[];
}

const STATUS_CLASSES: Record<SpecificationStatus, string> = {
  frozen: 'border border-on-surface text-on-surface',
  draft: 'border border-dashed border-on-surface-variant text-on-surface-variant',
  review: 'border border-outline-variant text-on-surface-variant',
  candidate: 'border border-secondary text-secondary',
  deprecated: 'border border-outline-variant text-on-surface-variant line-through',
  superseded: 'border border-outline-variant text-on-surface-variant opacity-60',
};

function SpecificationStatusBadge({ status }: { status: SpecificationStatus }) {
  return (
    <span
      className={[
        'font-mono text-label-caps uppercase tracking-widest px-2 py-1 inline-block',
        STATUS_CLASSES[status],
      ].join(' ')}
    >
      {status}
    </span>
  );
}

export function SpecificationRegistry({ specifications }: SpecificationRegistryProps) {
  return (
    <section
      id="registry"
      aria-labelledby="registry-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="registry-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Specification Registry
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          The authoritative list of published specification documents.
        </p>

        <div className="hidden lg:block overflow-x-auto">
          <table
            className="w-full border border-outline-variant"
            aria-label="Specification registry"
          >
            <caption className="sr-only">Published Rohinik specifications</caption>
            <thead>
              <tr className="border-b border-outline-variant">
                {['ID', 'Specification', 'Version', 'Status', 'Authority'].map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {specifications.map((spec) => (
                <tr key={spec.id} className="hover:bg-surface-container transition-colors">
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface px-4 py-4 whitespace-nowrap">
                    {spec.id}
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-headline text-headline-sm font-semibold text-on-surface mb-1">
                      <Link
                        href={spec.href as Route}
                        className="hover:text-secondary transition-colors"
                      >
                        {spec.title}
                      </Link>
                    </div>
                    <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                      {spec.summary}
                    </p>
                  </td>
                  <td className="font-mono text-label-caps text-on-surface-variant px-4 py-4 whitespace-nowrap">
                    {spec.version}
                  </td>
                  <td className="px-4 py-4">
                    <SpecificationStatusBadge status={spec.status} />
                  </td>
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant px-4 py-4 capitalize">
                    {spec.authority}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden divide-y divide-outline-variant border-t border-outline-variant">
          {specifications.map((spec) => (
            <article key={spec.id} aria-labelledby={`spec-${spec.slug}-title`} className="py-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                  {spec.id}
                </span>
                <SpecificationStatusBadge status={spec.status} />
              </div>
              <h3
                id={`spec-${spec.slug}-title`}
                className="font-headline text-headline-sm font-semibold text-on-surface mb-1"
              >
                <Link href={spec.href as Route} className="hover:text-secondary transition-colors">
                  {spec.title}
                </Link>
              </h3>
              <p className="font-mono text-technical-code text-on-surface-variant mb-3">
                Version {spec.version}
              </p>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed mb-4">
                {spec.summary}
              </p>
              <dl className="grid grid-cols-2 gap-3">
                <div>
                  <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
                    Authority
                  </dt>
                  <dd className="font-mono text-label-caps uppercase tracking-widest text-on-surface capitalize">
                    {spec.authority}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
                    Normative
                  </dt>
                  <dd className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                    {spec.normative ? 'Yes' : 'No'}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

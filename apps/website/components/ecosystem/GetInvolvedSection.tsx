import Link from 'next/link';
import type { Route } from 'next';
import { ecosystemContent } from '@/content/ecosystem/ecosystem';

export function GetInvolvedSection() {
  const { actions } = ecosystemContent.getInvolved;
  return (
    <section
      id="get-involved"
      aria-labelledby="get-involved-heading"
      className="border-b border-outline-variant bg-surface"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="get-involved-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Get Involved
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-outline-variant divide-y md:divide-y-0">
          {actions.map((action, i) => (
            <Link
              key={action.id}
              href={action.href as Route}
              className={[
                'group p-8 hover:bg-surface-container transition-colors',
                i % 3 !== 2 ? 'lg:border-r border-outline-variant' : '',
                i % 2 === 0 ? 'md:border-r border-outline-variant lg:border-r-0' : '',
                i < 3 ? 'lg:border-b border-outline-variant' : '',
                i < 4 ? 'md:border-b border-outline-variant lg:border-b-0' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface group-hover:text-secondary transition-colors mb-3">
                {action.label}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

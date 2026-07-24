import Link from 'next/link';
import type { Route } from 'next';
import { ecosystemContent } from '@/content/ecosystem/ecosystem';

export function CommunitySection() {
  const { participation, links } = ecosystemContent.community;
  return (
    <section
      id="community"
      aria-labelledby="community-heading"
      className="border-b border-outline-variant bg-surface"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="community-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-outline-variant divide-y md:divide-y-0 mb-16">
          {participation.map((role, i) => (
            <div
              key={role.id}
              className={[
                'p-8',
                i < participation.length - 1 ? 'md:border-r border-outline-variant' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-3">
                {role.label}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed mb-4">
                {role.description}
              </p>
              <p className="font-mono text-label-caps uppercase tracking-widest text-secondary">
                {role.callToAction}
              </p>
            </div>
          ))}
        </div>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href as Route}
              className="group flex items-start gap-8 py-6 hover:bg-surface-container transition-colors border-l-2 border-transparent hover:border-secondary pl-4"
            >
              <div>
                <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface group-hover:text-secondary transition-colors mb-2">
                  {link.label}
                </div>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {link.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

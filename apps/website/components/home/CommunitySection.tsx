import Link from 'next/link';
import type { Route } from 'next';
import { homepageContent } from '@/content/homepage';

export function CommunitySection() {
  const { community } = homepageContent;
  return (
    <section aria-labelledby="community-heading">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="community-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          {community.heading}
        </h2>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {community.items.map((item) => (
            <Link
              key={item.id}
              href={item.href as Route}
              className="flex items-center justify-between gap-4 py-8 group"
            >
              <div>
                <div className="font-headline text-headline-sm font-semibold text-on-surface group-hover:text-secondary mb-2 transition-colors">
                  {item.label}
                </div>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>
              <span
                className="font-mono text-headline-sm text-on-surface-variant group-hover:text-secondary transition-colors shrink-0"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

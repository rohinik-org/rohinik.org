import { specificationsContent } from '@/content/specifications';
import type { SpecificationRecord } from '@/lib/specifications/types';

interface SpecificationsHeroProps {
  specifications: readonly SpecificationRecord[];
}

export function SpecificationsHero({ specifications }: SpecificationsHeroProps) {
  const { hero } = specificationsContent;

  const frozenCount = specifications.filter((s) => s.status === 'frozen').length;
  const familySet = new Set(specifications.map((s) => s.family));
  const identifierClassCount = specifications
    .flatMap((s) => s.identifierClasses)
    .filter((v, i, a) => a.indexOf(v) === i).length;

  return (
    <section
      id="overview"
      aria-labelledby="specifications-heading"
      className="border-b border-outline-variant bg-[radial-gradient(var(--color-outline-variant)_1px,transparent_1px)] bg-[size:24px_24px]"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-6">
          {hero.eyebrow}
        </p>
        <h1
          id="specifications-heading"
          className="font-headline text-headline-lg-mobile md:text-headline-xl font-bold text-on-surface mb-6 leading-tight tracking-tight max-w-5xl"
        >
          {hero.title}
        </h1>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          {hero.description}
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-outline-variant divide-y sm:divide-y-0 sm:divide-x divide-outline-variant">
          <div className="py-6 sm:pr-8">
            <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-2">
              Frozen Documents
            </dt>
            <dd className="font-mono text-headline-md font-bold text-on-surface">
              {String(frozenCount).padStart(2, '0')}
            </dd>
          </div>
          <div className="py-6 sm:px-8">
            <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-2">
              Active Families
            </dt>
            <dd className="font-mono text-headline-md font-bold text-on-surface">
              {String(familySet.size).padStart(2, '0')}
            </dd>
          </div>
          <div className="py-6 sm:pl-8">
            <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-2">
              Identifier Classes
            </dt>
            <dd className="font-mono text-headline-md font-bold text-on-surface">
              {String(identifierClassCount).padStart(2, '0')}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

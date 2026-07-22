import Link from 'next/link';
import { homepageContent } from '@/content/homepage';

export function GovernanceSection() {
  const { governance } = homepageContent;
  return (
    <section aria-labelledby="gov-heading" className="bg-primary">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="gov-heading"
          className="font-headline text-headline-md font-bold text-white dark:text-black mb-4"
        >
          {governance.heading}
        </h2>
        <p className="font-body text-body-md text-white dark:text-black opacity-80 max-w-2xl leading-relaxed mb-8">
          {governance.body}
        </p>
        <Link
          href={governance.cta.href}
          className="font-mono text-label-caps uppercase tracking-widest border border-white dark:border-black text-white dark:text-black px-5 py-2.5 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-colors inline-block"
        >
          {governance.cta.label} →
        </Link>
      </div>
    </section>
  );
}

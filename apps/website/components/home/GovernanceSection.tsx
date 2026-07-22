import Link from 'next/link';
import { homepageContent } from '@/content/homepage';

export function GovernanceSection() {
  const { governance } = homepageContent;
  return (
    <section aria-labelledby="gov-heading" className="bg-primary">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="gov-heading"
          className="font-headline text-headline-md font-bold text-on-primary mb-4"
        >
          {governance.heading}
        </h2>
        <p className="font-body text-body-md text-on-primary opacity-80 max-w-2xl leading-relaxed mb-8">
          {governance.body}
        </p>
        <Link
          href={governance.cta.href}
          className="font-mono text-label-caps uppercase tracking-widest border border-on-primary text-on-primary px-5 py-2.5 hover:bg-on-primary hover:text-primary transition-colors inline-block"
        >
          {governance.cta.label} →
        </Link>
      </div>
    </section>
  );
}

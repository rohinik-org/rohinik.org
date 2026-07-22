import { homepageContent } from '@/content/homepage';
import { ArchitectureLayer } from './ArchitectureLayer';

export function ArchitecturePreview() {
  const { architecture } = homepageContent;
  return (
    <section aria-labelledby="arch-heading" className="border-b border-outline-variant">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <div className="mb-10">
          <h2
            id="arch-heading"
            className="font-headline text-headline-md font-bold text-on-surface mb-2"
          >
            {architecture.heading}
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            {architecture.subheading}
          </p>
        </div>
        <ol aria-label="Architecture layers" className="border border-outline-variant">
          {architecture.layers.map((layer) => (
            <ArchitectureLayer key={layer.id} {...layer} />
          ))}
        </ol>
      </div>
    </section>
  );
}

import { rs1Content } from '@/content/reference-standards/rs1';

export function RepositoryStructure() {
  const { repository } = rs1Content;
  return (
    <section
      id="repository"
      aria-labelledby="repository-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="repository-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Architectural Domains
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          RS-1 is organized by architectural domain. Each domain corresponds to a layer defined in
          the published specifications.
        </p>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {repository.domains.map((domain) => (
            <div
              key={domain.id}
              className="grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-2 md:gap-8 py-5 md:items-baseline"
            >
              <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                {domain.label}
              </span>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {domain.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'properties', label: 'Properties' },
  { id: 'layers', label: 'Layers' },
  { id: 'cross-cutting', label: 'Cross-Cutting' },
  { id: 'execution', label: 'Execution' },
  { id: 'boundaries', label: 'Boundaries' },
  { id: 'references', label: 'References' },
] as const;

export function ArchitectureSectionNav() {
  return (
    <nav
      aria-label="Architecture page sections"
      className="sticky top-16 z-40 border-b border-outline-variant bg-surface/95 backdrop-blur-xl"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)]">
        <ol className="flex overflow-x-auto gap-0 -mb-px">
          {sections.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                className="block font-mono text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-on-surface py-4 px-4 border-b-2 border-transparent hover:border-outline transition-colors whitespace-nowrap"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

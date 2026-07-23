// apps/website/content/specifications.ts
export const specificationsContent = {
  hero: {
    eyebrow: 'Specifications',
    title: 'The public contract of the Rohinik platform.',
    description:
      'Rohinik specifications define architectural authority, canonical terminology, invariants, lifecycle semantics, runtime responsibilities, normative requirements, security constraints, and governance rules.',
  },

  corpusTerms: [
    {
      term: 'Documents',
      description: 'Versioned publications that define bounded areas of the platform.',
    },
    {
      term: 'Identifiers',
      description:
        'Permanent references to laws, definitions, requirements, and other specification statements.',
    },
    {
      term: 'Decisions',
      description: 'Records explaining significant architectural choices and their rationale.',
    },
    {
      term: 'Conformance',
      description: 'The requirements an implementation must satisfy to claim compatibility.',
    },
  ],

  families: [
    {
      id: 'AFS',
      title: 'Architecture Foundation Specification',
      description: 'Constitutional and architectural specifications for the Rohinik platform.',
    },
    {
      id: 'ADR',
      title: 'Architectural Decision Record',
      description: 'Focused records explaining the rationale behind significant design decisions.',
    },
    {
      id: 'RS',
      title: 'Rohinik Standard',
      description: 'Published standards and reference-system definitions.',
    },
  ],

  // Canonical order from AFS-0001 — do not sort alphabetically
  authorityChain: [
    {
      prefix: 'LAW',
      name: 'Constitutional laws',
      description: 'Fundamental, immutable platform laws.',
    },
    {
      prefix: 'AX',
      name: 'Architectural axioms',
      description: 'Near-immutable foundational truths.',
    },
    {
      prefix: 'P',
      name: 'Architectural principles',
      description: 'Near-immutable design principles.',
    },
    {
      prefix: 'INV',
      name: 'Conformance invariants',
      description: 'Near-immutable conformance rules.',
    },
    {
      prefix: 'R',
      name: 'Runtime responsibilities',
      description: 'Stable layer ownership definitions.',
    },
    { prefix: 'DEF', name: 'Canonical definitions', description: 'Stable canonical terminology.' },
    {
      prefix: 'REQ',
      name: 'Normative requirements',
      description: 'Evolving normative obligations.',
    },
    { prefix: 'SEC', name: 'Security constraints', description: 'Evolving security requirements.' },
    { prefix: 'L', name: 'Lifecycle definitions', description: 'Stable lifecycle semantics.' },
    { prefix: 'OBS', name: 'Observations', description: 'Informative; not requirements.' },
    {
      prefix: 'NOTE',
      name: 'Notes',
      description: 'Clarifies normative content; adds no requirements.',
    },
    { prefix: 'BP', name: 'Best practices', description: 'Guidance; not requirements.' },
    { prefix: 'EX', name: 'Examples', description: 'Illustrative; not normative.' },
    { prefix: 'ERR', name: 'Error definitions', description: 'Operational error classifications.' },
  ],

  identifierTaxonomy: [
    {
      prefix: 'LAW',
      meaning: 'Fundamental laws',
      authority: 'Constitutional',
      stability: 'Immutable',
    },
    {
      prefix: 'AX',
      meaning: 'Architectural axioms',
      authority: 'Foundational',
      stability: 'Near-immutable',
    },
    {
      prefix: 'P',
      meaning: 'Architectural principles',
      authority: 'Architectural',
      stability: 'Near-immutable',
    },
    {
      prefix: 'DEF',
      meaning: 'Canonical definitions',
      authority: 'Canonical',
      stability: 'Stable',
    },
    {
      prefix: 'INV',
      meaning: 'Conformance invariants',
      authority: 'Conformance',
      stability: 'Near-immutable',
    },
    { prefix: 'L', meaning: 'Lifecycle definitions', authority: 'Lifecycle', stability: 'Stable' },
    {
      prefix: 'R',
      meaning: 'Runtime responsibilities',
      authority: 'Definitional',
      stability: 'Stable',
    },
    {
      prefix: 'REQ',
      meaning: 'Normative requirements',
      authority: 'Normative',
      stability: 'Evolves',
    },
    { prefix: 'SEC', meaning: 'Security constraints', authority: 'Security', stability: 'Evolves' },
    { prefix: 'OBS', meaning: 'Observations', authority: 'Informative', stability: 'Evolves' },
    {
      prefix: 'NOTE',
      meaning: 'Normative clarification notes',
      authority: 'Informative',
      stability: 'Evolves',
    },
    { prefix: 'BP', meaning: 'Best practices', authority: 'Informative', stability: 'Evolves' },
    { prefix: 'EX', meaning: 'Examples', authority: 'Informative', stability: 'Evolves' },
    { prefix: 'ERR', meaning: 'Error definitions', authority: 'Operational', stability: 'Evolves' },
  ],

  // From AFS-0001 cross-reference material — do not invent additional ADRs
  adrs: [
    { id: 'ADR-0005', title: 'LLM as Last Tier' },
    { id: 'ADR-0008', title: 'Clean Architecture' },
    { id: 'ADR-0012', title: 'Runtime Protocol Stability' },
    { id: 'ADR-0013', title: 'Everything Is an Extension' },
    { id: 'ADR-0017', title: 'Kernel Dependency Direction' },
  ],

  lifecycle: [
    { status: 'draft', description: 'Working document; subject to change.' },
    { status: 'review', description: 'Open for community and editorial review.' },
    { status: 'candidate', description: 'Feature-complete; undergoing final review.' },
    { status: 'frozen', description: 'Published and authoritative; no breaking changes.' },
    { status: 'deprecated', description: 'Superseded or retired; retained for reference.' },
    { status: 'superseded', description: 'Replaced by a newer document.' },
  ],

  versioningRules: [
    {
      level: 'Major',
      rule: 'Breaking changes to constitutional, invariant, canonical, or mandatory content.',
    },
    {
      level: 'Minor',
      rule: 'Compatible additions that do not weaken existing requirements.',
    },
  ],

  references: [
    {
      label: 'Architecture',
      href: '/architecture',
      description: 'See how specification responsibilities map to system layers.',
    },
    {
      label: 'RS-1',
      href: '/rs-1',
      description: 'Review implementation and conformance status.',
    },
    {
      label: 'Governance',
      href: '/governance',
      description: 'Understand authority, versioning, and change control.',
    },
    {
      label: 'Documentation',
      href: '/documentation',
      description: 'Move from authoritative requirements to implementation guidance.',
    },
  ],
} as const;

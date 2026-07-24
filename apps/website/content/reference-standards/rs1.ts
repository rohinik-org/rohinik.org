import type { ReferenceStandardContent } from './types';

export const COVERAGE_STATUS = {
  IMPLEMENTED: 'implemented',
  PARTIAL: 'partial',
  PLANNED: 'planned',
} as const;

export type { CoverageStatus } from './types';

const FOUNDATION_AUTHORITY = {
  label: 'Foundation Constitution',
  specification: 'AFS-0001',
} as const;

// Constitutional invariant — must hold for all Reference Standards:
// A Reference Standard may demonstrate, clarify, or verify a specification,
// but it must never introduce new normative requirements.
// It remains strictly subordinate to the published specifications that govern it.

export const rs1Content = {
  hero: {
    eyebrow: 'Reference Standard',
    title: 'RS-1',
    subtitle: 'Canonical Reference Implementation of the Rohinik Foundation Specifications.',
    description:
      'RS-1 demonstrates how the Rohinik architecture is implemented while remaining fully subordinate to published specifications. It exists to validate the architecture—not redefine it.',
    register: [
      { term: 'Specifications', description: 'Authoritative source.' },
      { term: 'Conformance', description: 'Verification target.' },
      { term: 'Reference', description: 'Canonical implementation.' },
      { term: 'Implementation', description: 'Executable realization.' },
    ],
  },
  overview: {
    purpose: [
      'Demonstrate architectural correctness',
      'Validate specifications are implementable',
      'Provide an interoperability baseline',
      'Serve as implementation guidance',
    ],
    notIntendedTo: [
      'Define architecture',
      'Replace published specifications',
      'Introduce new normative requirements',
      'Become authoritative',
    ],
  },
  authority: {
    chain: [
      { id: 'constitution', label: 'Constitution', description: 'Immutable architectural laws.' },
      {
        id: 'specifications',
        label: 'Specifications',
        description: 'Authoritative public contracts.',
      },
      {
        id: 'reference-standards',
        label: 'Reference Standards',
        description: 'Canonical conformance profiles.',
      },
      {
        id: 'rs-1',
        label: 'RS-1',
        description: 'Canonical implementation. Subordinate to all above.',
      },
      {
        id: 'third-party',
        label: 'Third-party Implementations',
        description: 'Operate within specification boundaries.',
      },
    ],
    callout:
      'Normative authority always flows downward.\n\nConformance flows upward.\n\nImplementations never acquire authority over specifications.',
  },
  implementedSpecifications: [
    {
      id: 'AFS-0001',
      title: 'Foundation Constitution',
      version: '1.0',
      status: 'Implemented',
      coverage: 'Implemented',
    },
  ],
  coverage: [
    { id: 'memory', label: 'Memory', status: COVERAGE_STATUS.IMPLEMENTED },
    { id: 'kernel', label: 'Kernel', status: COVERAGE_STATUS.IMPLEMENTED },
    { id: 'runtime', label: 'Runtime', status: COVERAGE_STATUS.IMPLEMENTED },
    {
      id: 'capability-registry',
      label: 'Capability Registry',
      status: COVERAGE_STATUS.IMPLEMENTED,
    },
    { id: 'compiler', label: 'Compiler', status: COVERAGE_STATUS.IMPLEMENTED },
    { id: 'scheduling', label: 'Scheduling', status: COVERAGE_STATUS.IMPLEMENTED },
    { id: 'intelligence', label: 'Intelligence', status: COVERAGE_STATUS.PARTIAL },
    { id: 'observability', label: 'Observability', status: COVERAGE_STATUS.IMPLEMENTED },
  ],
  architectureMapping: [
    {
      id: 'runtime',
      layer: 'Runtime',
      canonicalPackage: '@rohinik-org/runtime',
      authority: FOUNDATION_AUTHORITY,
    },
    {
      id: 'memory',
      layer: 'Memory',
      canonicalPackage: '@rohinik-org/memory',
      authority: FOUNDATION_AUTHORITY,
    },
    {
      id: 'kernel',
      layer: 'Kernel',
      canonicalPackage: '@rohinik-org/kernel',
      authority: FOUNDATION_AUTHORITY,
    },
    {
      id: 'capability',
      layer: 'Capability',
      canonicalPackage: '@rohinik-org/capability-registry',
      authority: FOUNDATION_AUTHORITY,
    },
    {
      id: 'compiler',
      layer: 'Compiler',
      canonicalPackage: '@rohinik-org/compiler',
      authority: FOUNDATION_AUTHORITY,
    },
    {
      id: 'scheduling',
      layer: 'Scheduling',
      canonicalPackage: '@rohinik-org/scheduling',
      authority: FOUNDATION_AUTHORITY,
    },
  ],
  conformance: {
    statement:
      'Conformance is determined against published specifications. Passing implementation tests alone does not establish architectural conformance.',
    chain: [
      'Specifications satisfied',
      'Invariants preserved',
      'Required capabilities implemented',
      'Architectural compatibility maintained',
      'Conformance established',
    ],
    chainNote: 'Every item in the chain must hold. No step may be skipped.',
  },
  principles: [
    {
      index: '01',
      title: 'Specifications first.',
      description:
        'No implementation decision is made before consulting the published specification.',
    },
    {
      index: '02',
      title: 'Reference, not normative.',
      description: 'RS-1 demonstrates compliance. It does not define requirements.',
    },
    {
      index: '03',
      title: 'Deterministic.',
      description:
        'Identical inputs produce identical outputs across all conformant implementations.',
    },
    {
      index: '04',
      title: 'Capability-first.',
      description:
        'Every feature is delivered through the capability registry, not through direct coupling.',
    },
    {
      index: '05',
      title: 'Provider-neutral.',
      description: 'No implementation detail is tied to a specific provider, vendor, or platform.',
    },
    {
      index: '06',
      title: 'Stable identifiers.',
      description:
        'All architectural identifiers are stable across versions and must not be redefined.',
    },
  ],
  repository: {
    domains: [
      { id: 'runtime', label: 'Runtime', description: 'Runtime host and lifecycle management.' },
      { id: 'memory', label: 'Memory', description: 'Memory model and allocation.' },
      { id: 'kernel', label: 'Kernel', description: 'Core kernel operations.' },
      { id: 'capability', label: 'Capability', description: 'Capability registry and resolution.' },
      { id: 'compiler', label: 'Compiler', description: 'Compilation pipeline.' },
      {
        id: 'foundation',
        label: 'Foundation',
        description: 'Shared architectural primitives.',
      },
    ],
  },
  lifecycle: {
    steps: [
      {
        id: 'specification-published',
        label: 'Specification Published',
        description:
          'A published specification becomes the authoritative source before any implementation begins.',
      },
      {
        id: 'reference-implementation',
        label: 'Reference Implementation',
        description: 'RS-1 provides the canonical implementation of the published specification.',
      },
      {
        id: 'verification',
        label: 'Verification',
        description: 'The reference implementation is tested against specification requirements.',
      },
      {
        id: 'conformance',
        label: 'Conformance',
        description: 'All conformance criteria are satisfied.',
      },
      {
        id: 'release',
        label: 'Release',
        description: 'The reference implementation is versioned and released.',
      },
    ],
    callout: 'Implementations follow specifications. Specifications never follow implementations.',
  },
  references: [
    {
      id: 'architecture',
      label: 'Architecture',
      href: '/architecture',
      description: 'Understand the layered system RS-1 implements.',
    },
    {
      id: 'specifications',
      label: 'Specifications',
      href: '/specifications',
      description: 'Read the authoritative requirements RS-1 satisfies.',
    },
    {
      id: 'governance',
      label: 'Governance',
      href: '/governance',
      description: 'How the specifications RS-1 implements are governed.',
    },
    {
      id: 'documentation',
      label: 'Documentation',
      href: '/documentation',
      description: 'Implementation guides and integration patterns.',
    },
  ],
} as const satisfies ReferenceStandardContent;

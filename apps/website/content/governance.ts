export const governanceContent = {
  hero: {
    eyebrow: 'Governance',
    title: 'Architecture evolves through explicit decisions.',
    description:
      'Rohinik separates constitutional rules, architectural specifications, runtime implementations, and experiments so innovation never silently redefines the platform.',
    register: ['Constitution', 'Specifications', 'Governance', 'Conformance'],
  },

  atAGlance: {
    nodes: [
      {
        id: 'constitution',
        kind: 'constitutional',
        label: 'Constitution',
        authorityType: 'Constitutional',
        description: 'Defines immutable architectural laws.',
      },
      {
        id: 'board',
        kind: 'governance',
        label: 'Architecture Board',
        authorityType: 'Governance',
        description: 'Approves constitutional changes.',
      },
      {
        id: 'specifications',
        kind: 'normative',
        label: 'Specifications',
        authorityType: 'Normative',
        description: 'Authoritative public contract.',
      },
      {
        id: 'rs',
        kind: 'reference',
        label: 'Reference Standards',
        authorityType: 'Reference',
        description: 'Define canonical reference and conformance profiles.',
      },
      {
        id: 'implementations',
        kind: 'operational',
        label: 'Implementations',
        authorityType: 'Operational',
        description: 'Free to implement the contract.',
      },
      {
        id: 'conformance',
        kind: 'verification',
        label: 'Conformance',
        authorityType: 'Verification',
        description: 'Determined against specifications.',
      },
    ],
  },

  principles: [
    {
      index: '01',
      title: 'Specifications precede implementations.',
      description: 'No implementation is authoritative before its specification is published.',
    },
    {
      index: '02',
      title: 'Architectural authority is explicit.',
      description: 'Authority flows through defined levels. No implicit escalation.',
    },
    {
      index: '03',
      title: 'Compatibility is preserved deliberately.',
      description: 'Every breaking change requires explicit governance approval.',
    },
    {
      index: '04',
      title: 'No implementation may redefine constitutional rules.',
      description: 'Constitutional laws are immutable outside the constitutional change process.',
    },
  ],

  authorityModel: [
    {
      id: 'constitution',
      parent: null,
      level: '01',
      name: 'Constitution',
      authority: 'Constitutional',
      owns: ['Immutable architectural laws', 'Constitutional change process'],
      cannot: [
        'Be amended outside the constitutional process',
        'Be overridden by any specification',
      ],
    },
    {
      id: 'board',
      parent: 'constitution',
      level: '02',
      name: 'Architecture Board',
      authority: 'Governance',
      owns: ['Approval of constitutional changes', 'Interpretation of architectural conflicts'],
      cannot: [
        'Override immutable laws without constitutional process',
        'Direct implementation-specific design',
      ],
    },
    {
      id: 'foundation-spec',
      parent: 'board',
      level: '03',
      name: 'Foundation Specification',
      authority: 'Foundational',
      owns: ['Canonical terminology', 'Architectural foundations'],
      cannot: ['Contradict constitutional laws', 'Supersede board decisions'],
    },
    {
      id: 'arch-specs',
      parent: 'foundation-spec',
      level: '04',
      name: 'Architectural Specifications',
      authority: 'Architectural',
      owns: ['Layer definitions', 'Invariants', 'Runtime responsibilities'],
      cannot: ['Contradict foundational specifications', 'Redefine constitutional terms'],
    },
    {
      id: 'runtime-specs',
      parent: 'arch-specs',
      level: '05',
      name: 'Runtime Specifications',
      authority: 'Runtime',
      owns: ['Runtime protocol definitions', 'Lifecycle semantics'],
      cannot: ['Expand architectural boundaries', 'Weaken invariants'],
    },
    {
      id: 'reference-impl',
      parent: 'runtime-specs',
      level: '06',
      name: 'Reference Implementation',
      authority: 'Reference',
      owns: ['Conformance demonstration', 'Interoperability baseline'],
      cannot: ['Define new normative requirements', 'Override published specifications'],
    },
    {
      id: 'third-party',
      parent: 'runtime-specs',
      level: '07',
      name: 'Third-party Implementations',
      authority: 'Operational',
      owns: ['Domain-specific behaviour within specification boundaries'],
      cannot: [
        'Claim conformance without satisfying mandatory specifications',
        'Redefine normative terms',
      ],
    },
  ],

  lifecycle: [
    {
      id: 'proposal',
      stage: 'Proposal',
      description: 'A written proposal initiates the governance change.',
    },
    {
      id: 'review',
      stage: 'Review',
      description: 'Architectural and constitutional impact is assessed.',
    },
    {
      id: 'decision',
      stage: 'Decision',
      description: 'Required authority grants or denies approval.',
    },
    {
      id: 'publication',
      stage: 'Publication',
      description: 'The decision is versioned and publicly recorded.',
    },
    {
      id: 'adoption',
      stage: 'Adoption',
      description: 'Specifications and implementations reflect the change.',
    },
    {
      id: 'maintenance',
      stage: 'Maintenance',
      description: 'The decision is maintained as an authoritative record.',
    },
  ],

  changeProcess: [
    {
      id: 'proposal',
      step: '01',
      name: 'Proposal',
      rule: 'A change begins as an explicit written proposal.',
    },
    {
      id: 'arch-review',
      step: '02',
      name: 'Architecture Review',
      rule: 'Compatibility and constitutional impact are assessed.',
    },
    { id: 'draft', step: '03', name: 'Draft', rule: 'Normative language is prepared.' },
    { id: 'approval', step: '04', name: 'Approval', rule: 'Required authority grants approval.' },
    {
      id: 'publication',
      step: '05',
      name: 'Publication',
      rule: 'The authoritative document is versioned and released.',
    },
    {
      id: 'implementation',
      step: '06',
      name: 'Implementation',
      rule: 'Implementations may adopt the published change.',
    },
  ],

  roles: [
    {
      id: 'board',
      name: 'Architecture Board',
      authority: 'Governance',
      owns: ['Constitutional decisions', 'Architectural conflict resolution'],
      supports: ['Specification editorial process'],
    },
    {
      id: 'editors',
      name: 'Editors',
      authority: 'Editorial',
      owns: ['Specification maintenance', 'Publication process'],
      supports: ['Editorial consistency', 'Contributor onboarding'],
    },
    {
      id: 'maintainers',
      name: 'Maintainers',
      authority: 'Operational',
      owns: ['Specification implementation', 'Reference conformance'],
      supports: ['Contributor guidance', 'Issue triage'],
    },
    {
      id: 'contributors',
      name: 'Contributors',
      authority: 'Operational',
      owns: ['Proposals', 'Draft improvements'],
      supports: ['Discussion', 'Review participation'],
    },
    {
      id: 'reviewers',
      name: 'Reviewers',
      authority: 'Review',
      owns: ['Correctness evaluation', 'Compatibility assessment'],
      supports: ['Editorial feedback', 'Conformance verification'],
    },
  ],

  compatibility: {
    versioning: [
      {
        id: 'major',
        level: 'Major',
        rule: 'Breaking changes to constitutional, invariant, or mandatory content.',
      },
      {
        id: 'minor',
        level: 'Minor',
        rule: 'Compatible additions that do not weaken existing requirements.',
      },
    ],
    evolution: [
      {
        id: 'deprecated',
        level: 'Deprecated',
        rule: 'Retained for reference; supersession path defined.',
      },
      {
        id: 'superseded',
        level: 'Superseded',
        rule: 'Replaced by a newer authoritative document.',
      },
    ],
  },

  conformance: {
    statement:
      'Passing tests alone does not make an implementation conformant. Architectural conformance is determined against authoritative specifications.',
    chain: [
      'Requirements satisfied',
      'Architectural invariants preserved',
      'Mandatory specifications implemented',
      'Compatibility maintained',
    ],
    chainNote:
      'Every item in the chain must hold for an implementation to claim architectural conformance.',
  },

  contribution: {
    specificationWorkflow: [
      { id: 'discussion', step: '01', name: 'Open Discussion' },
      { id: 'proposal', step: '02', name: 'Proposal' },
      { id: 'specification', step: '03', name: 'Specification' },
      { id: 'review', step: '04', name: 'Review' },
      { id: 'approval', step: '05', name: 'Approval' },
      { id: 'implementation', step: '06', name: 'Implementation' },
      { id: 'release', step: '07', name: 'Release' },
    ],
    links: [
      {
        id: 'contribution-guide',
        label: 'Contribution Guide',
        href: '/documentation',
        description: 'How to submit proposals and improvements.',
      },
      {
        id: 'architecture',
        label: 'Architecture',
        href: '/architecture',
        description: 'Understand the system you are contributing to.',
      },
      {
        id: 'specifications',
        label: 'Specifications',
        href: '/specifications',
        description: 'Read the authoritative requirements.',
      },
      {
        id: 'github',
        label: 'GitHub',
        href: 'https://github.com/rohinik-org',
        description: 'Source, issues, and pull requests.',
      },
    ],
  },

  references: [
    {
      id: 'architecture',
      label: 'Architecture',
      href: '/architecture',
      description: 'Understand the layered system.',
    },
    {
      id: 'specifications',
      label: 'Specifications',
      href: '/specifications',
      description: 'Read authoritative documents.',
    },
    { id: 'rs-1', label: 'RS-1', href: '/rs-1', description: 'Reference implementation.' },
    {
      id: 'documentation',
      label: 'Documentation',
      href: '/documentation',
      description: 'Implementation guides.',
    },
  ],
} as const;

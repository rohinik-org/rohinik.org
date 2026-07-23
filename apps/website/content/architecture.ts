// apps/website/content/architecture.ts

export const architectureContent = {
  hero: {
    eyebrow: 'Architecture',
    title: 'A layered intelligent computing system.',
    description:
      'Rohinik separates durable state, governed execution, intelligence providers, capabilities, interfaces, and constitutional rules into explicit architectural layers.',
    summary:
      'Each layer has bounded responsibility. Cross-layer communication occurs through defined contracts rather than hidden implementation coupling.',
    stats: [
      { label: '07 Layers', value: '07' },
      { label: '05 Cross-Cutting Systems', value: '05' },
      { label: 'Explicit Contract Boundaries', value: '∞' },
    ],
  },

  properties: [
    {
      id: 'layered',
      index: '01',
      title: 'Layered',
      description:
        'Each subsystem owns a defined class of responsibility and depends only on approved contracts.',
    },
    {
      id: 'capability-driven',
      index: '02',
      title: 'Capability Driven',
      description:
        'External action enters the runtime through registered, typed, observable capability boundaries.',
    },
    {
      id: 'memory-first',
      index: '03',
      title: 'Memory First',
      description:
        'Durable context, observations, decisions, and execution history are managed as system resources.',
    },
    {
      id: 'model-independent',
      index: '04',
      title: 'Model Independent',
      description:
        'Models act as replaceable intelligence providers rather than owning orchestration or system state.',
    },
    {
      id: 'specification-driven',
      index: '05',
      title: 'Specification Driven',
      description:
        'Constitutional laws, lifecycle behavior, interfaces, and compatibility rules are publicly specified.',
    },
  ],

  layers: [
    {
      id: 'shell',
      index: '07',
      label: 'Shell',
      shortDescription: 'Human, application, and machine interfaces into Rohinik.',
      responsibility:
        'The Shell accepts requests, exposes system state, presents results, and adapts external protocols into Rohinik-native interactions.',
      owns: [
        'Human and application interfaces',
        'CLI, API, SDK, and studio surfaces',
        'Input adaptation',
        'Presentation of system output',
      ],
      doesNotOwn: [
        'Execution planning',
        'Capability authorization',
        'Memory governance',
        'Model selection policy',
      ],
      communicatesWith: ['compiler', 'runtime', 'memory'],
      specifications: [],
    },
    {
      id: 'compiler',
      index: '06',
      label: 'Compiler',
      shortDescription: 'Transforms intent and declarations into inspectable execution structures.',
      responsibility:
        'The Compiler converts accepted intent, declarative input, and system context into typed plans that can be validated before execution.',
      owns: [
        'Intent normalization',
        'Plan construction',
        'Static validation',
        'Executable intermediate representations',
      ],
      doesNotOwn: [
        'Direct capability execution',
        'Long-term memory storage',
        'Provider lifecycle',
        'Authorization policy ownership',
      ],
      communicatesWith: ['shell', 'memory', 'kernel', 'runtime'],
      specifications: [],
    },
    {
      id: 'memory',
      index: '05',
      label: 'Memory',
      shortDescription: 'Durable state, context, observations, and retained knowledge.',
      responsibility:
        'Memory governs how information is stored, scoped, retrieved, validated, retained, and made available to the rest of the platform.',
      owns: [
        'Context storage and retrieval',
        'Memory scopes',
        'Retention policies',
        'Provenance and validation',
        'Execution and observation history',
      ],
      doesNotOwn: [
        'Capability execution',
        'Runtime scheduling',
        'Model inference',
        'User-interface presentation',
      ],
      communicatesWith: ['shell', 'compiler', 'intelligence', 'runtime', 'kernel'],
      specifications: [],
    },
    {
      id: 'intelligence',
      index: '04',
      label: 'Intelligence',
      shortDescription: 'Reasoning providers, models, evaluation, and selection policy.',
      responsibility:
        'The Intelligence layer coordinates reasoning and model providers under runtime, memory, and governance constraints.',
      owns: [
        'Provider abstraction',
        'Model invocation',
        'Reasoning coordination',
        'Provider selection',
        'Evaluation and fallback policy',
      ],
      doesNotOwn: [
        'System-wide durable state',
        'Unrestricted tool access',
        'Capability registration',
        'Constitutional rules',
      ],
      communicatesWith: ['memory', 'runtime', 'kernel'],
      specifications: [],
    },
    {
      id: 'runtime',
      index: '03',
      label: 'Runtime',
      shortDescription: 'Governed execution, lifecycle, scheduling, recovery, and observation.',
      responsibility:
        'The Runtime executes approved plans and capabilities while enforcing lifecycle, recovery, observation, and failure semantics.',
      owns: [
        'Execution coordination',
        'Runtime lifecycle',
        'Capability invocation',
        'Failure and recovery procedures',
        'Execution observation',
      ],
      doesNotOwn: [
        'Constitutional definition',
        'Persistent content authorship',
        'User-interface composition',
        'Model-specific business logic',
      ],
      communicatesWith: ['compiler', 'memory', 'intelligence', 'kernel'],
      specifications: [],
    },
    {
      id: 'kernel',
      index: '02',
      label: 'Kernel',
      shortDescription:
        'Registries, contracts, identity, isolation, policy, and observation primitives.',
      responsibility:
        'The Kernel provides the stable mechanisms upon which runtime and higher layers depend.',
      owns: [
        'Capability registry',
        'Provider registry',
        'Identifiers and contracts',
        'Isolation primitives',
        'Policy enforcement mechanisms',
        'Observation infrastructure',
      ],
      doesNotOwn: [
        'Application-specific workflows',
        'Homepage or interface behavior',
        'Model-generated content',
        'Governance decisions themselves',
      ],
      communicatesWith: ['compiler', 'memory', 'intelligence', 'runtime', 'foundation'],
      specifications: [],
    },
    {
      id: 'foundation',
      index: '01',
      label: 'Foundation',
      shortDescription:
        'Constitutional laws, invariants, taxonomy, specifications, and governance.',
      responsibility:
        'The Foundation defines the rules that implementations must obey and the process by which those rules evolve.',
      owns: [
        'Constitutional laws',
        'Principles and invariants',
        'Identifier taxonomy',
        'Specification authority',
        'Governance and compatibility rules',
      ],
      doesNotOwn: [
        'Runtime implementation details',
        'Provider selection',
        'Application state',
        'Capability execution',
      ],
      communicatesWith: ['kernel'],
      specifications: ['AFS-0001'],
    },
  ],

  crossCuttingSystems: [
    {
      id: 'governance',
      title: 'Governance',
      description: 'Defines authority, approval, compatibility, and evolution across every layer.',
    },
    {
      id: 'identity',
      title: 'Identity',
      description:
        'Provides stable identifiers for specifications, capabilities, providers, executions, and system entities.',
    },
    {
      id: 'observation',
      title: 'Observation',
      description:
        'Records state transitions, execution events, failures, decisions, and provider behavior.',
    },
    {
      id: 'security',
      title: 'Security and Policy',
      description:
        'Constrains which actors and components may invoke capabilities or access state.',
    },
    {
      id: 'lifecycle',
      title: 'Lifecycle',
      description:
        'Defines initialization, readiness, degradation, shutdown, and failure semantics.',
    },
  ],

  executionPath: [
    {
      index: '01',
      label: 'Accept',
      layer: 'Shell',
      description: 'Receive a request from a human, application, or machine interface.',
    },
    {
      index: '02',
      label: 'Resolve',
      layer: 'Memory',
      description: 'Load relevant context, identity, policy, and retained system state.',
    },
    {
      index: '03',
      label: 'Compile',
      layer: 'Compiler',
      description: 'Transform intent into a typed, inspectable execution plan.',
    },
    {
      index: '04',
      label: 'Validate',
      layer: 'Kernel',
      description: 'Resolve contracts, capabilities, permissions, and invariants.',
    },
    {
      index: '05',
      label: 'Reason',
      layer: 'Intelligence',
      description:
        'Invoke reasoning providers only where deterministic mechanisms are insufficient.',
    },
    {
      index: '06',
      label: 'Execute',
      layer: 'Runtime',
      description: 'Invoke approved capabilities under lifecycle and recovery controls.',
    },
    {
      index: '07',
      label: 'Observe',
      layer: 'Kernel',
      description: 'Record execution events, decisions, failures, and state transitions.',
    },
    {
      index: '08',
      label: 'Retain',
      layer: 'Memory',
      description: 'Persist validated outcomes according to scope and retention policy.',
    },
    {
      index: '09',
      label: 'Present',
      layer: 'Shell',
      description: 'Return the result and relevant execution state to the caller.',
    },
  ],

  boundaries: [
    {
      id: 'shell-compiler',
      from: 'Shell',
      to: 'Compiler',
      contract: 'Intent and declaration boundary',
      rule: 'The Shell may submit accepted input but may not construct executable runtime state directly.',
    },
    {
      id: 'compiler-runtime',
      from: 'Compiler',
      to: 'Runtime',
      contract: 'Plan boundary',
      rule: 'The Runtime accepts validated executable structures rather than untyped prompts or arbitrary instructions.',
    },
    {
      id: 'runtime-kernel',
      from: 'Runtime',
      to: 'Kernel',
      contract: 'Execution mechanism boundary',
      rule: 'Runtime behavior must use kernel registries, lifecycle mechanisms, and observation primitives.',
    },
    {
      id: 'runtime-intelligence',
      from: 'Runtime',
      to: 'Intelligence',
      contract: 'Provider invocation boundary',
      rule: 'Models and reasoning providers are invoked through governed provider contracts.',
    },
    {
      id: 'all-memory',
      from: 'All layers',
      to: 'Memory',
      contract: 'State boundary',
      rule: 'Durable information enters memory through explicit scope, provenance, and retention rules.',
    },
    {
      id: 'kernel-foundation',
      from: 'Kernel',
      to: 'Foundation',
      contract: 'Constitutional compliance boundary',
      rule: 'Kernel mechanisms must implement the laws, invariants, and contracts defined by authoritative specifications.',
    },
  ],

  references: {
    heading: 'Continue into the architecture.',
    links: [
      {
        id: 'specifications',
        label: 'Specifications',
        description: 'Read the authoritative laws, contracts, and lifecycle requirements.',
        href: '/specifications',
      },
      {
        id: 'rs-1',
        label: 'RS-1',
        description: 'Review the Rohinik reference-system architecture.',
        href: '/rs-1',
      },
      {
        id: 'governance',
        label: 'Governance',
        description: 'Understand how architectural decisions become authoritative.',
        href: '/governance',
      },
      {
        id: 'documentation',
        label: 'Documentation',
        description: 'Move from architectural concepts to implementation guidance.',
        href: '/documentation',
      },
    ],
  },
} as const;

import type { EcosystemContent, ImplementationStatus } from './types';

export type { ImplementationStatus };

export const IMPLEMENTATION_STATUS = {
  AVAILABLE: 'available',
  FOUNDATION_IMPLEMENTATION: 'foundation-implementation',
  IN_DEVELOPMENT: 'in-development',
  PLANNED: 'planned',
} as const;

export const IMPLEMENTATION_STATUS_LABEL: Record<ImplementationStatus, string> = {
  available: 'Available',
  'foundation-implementation': 'Foundation Implementation',
  'in-development': 'In Development',
  planned: 'Planned',
};

export const ecosystemContent = {
  hero: {
    eyebrow: 'Rohinik Foundation',
    title: 'The Ecosystem',
    subtitle: 'An open, specification-driven ecosystem for capability-based AI infrastructure.',
    graph: {
      nodes: [
        {
          id: 'constitution',
          label: 'Foundation Constitution',
          x: 280,
          y: 400,
          width: 240,
          height: 40,
          emphasis: true,
        },
        { id: 'specifications', label: 'Specifications', x: 100, y: 300, width: 180, height: 40 },
        {
          id: 'reference-standards',
          label: 'Reference Standards',
          x: 310,
          y: 300,
          width: 180,
          height: 40,
        },
        { id: 'architecture', label: 'Architecture', x: 520, y: 300, width: 180, height: 40 },
        {
          id: 'runtime',
          label: 'Rohinik Runtime',
          x: 310,
          y: 210,
          width: 180,
          height: 40,
          emphasis: true,
        },
        { id: 'sdks', label: 'SDKs', x: 80, y: 120, width: 120, height: 40 },
        { id: 'packages', label: 'Packages', x: 220, y: 120, width: 120, height: 40 },
        { id: 'capabilities', label: 'Capabilities', x: 360, y: 120, width: 120, height: 40 },
        { id: 'providers', label: 'Providers', x: 500, y: 120, width: 120, height: 40 },
        { id: 'applications', label: 'Applications', x: 280, y: 40, width: 240, height: 40 },
      ],
      edges: [
        { id: 'e1', from: 'constitution', to: 'specifications' },
        { id: 'e2', from: 'constitution', to: 'reference-standards' },
        { id: 'e3', from: 'constitution', to: 'architecture' },
        { id: 'e4', from: 'specifications', to: 'runtime' },
        { id: 'e5', from: 'reference-standards', to: 'runtime' },
        { id: 'e6', from: 'architecture', to: 'runtime' },
        { id: 'e7', from: 'runtime', to: 'sdks' },
        { id: 'e8', from: 'runtime', to: 'packages' },
        { id: 'e9', from: 'runtime', to: 'capabilities' },
        { id: 'e10', from: 'runtime', to: 'providers' },
        { id: 'e11', from: 'sdks', to: 'applications' },
        { id: 'e12', from: 'packages', to: 'applications' },
        { id: 'e13', from: 'capabilities', to: 'applications' },
        { id: 'e14', from: 'providers', to: 'applications' },
      ],
    },
  },
  introduction: {
    purpose: [
      'Defines a common substrate for capability-based AI infrastructure through open specifications.',
      'Provides reference implementations that demonstrate architectural correctness without becoming normative.',
      'Enables any conforming provider, SDK, or capability to participate through published contracts.',
      'Establishes an authority chain from the Foundation Constitution down to community implementations.',
    ],
    notIntendedTo: [
      'Lock developers into a specific runtime, cloud provider, or vendor.',
      'Replace or compete with general-purpose AI frameworks.',
      'Define the internal architecture of capability implementations.',
      'Centralize control of the ecosystem beyond the published specifications.',
    ],
  },
  overview: {
    cards: [
      {
        id: 'specifications',
        label: 'Specifications',
        description:
          'Normative documents that define the architectural contracts of the Rohinik ecosystem.',
        href: '/specifications',
        status: 'available',
      },
      {
        id: 'reference-standards',
        label: 'Reference Standards',
        description:
          'Canonical implementations that demonstrate specification correctness and provide interoperability baselines.',
        href: '/reference-standards/rs-1',
        status: 'available',
      },
      {
        id: 'capability-ecosystem',
        label: 'Capability Ecosystem',
        description: 'A marketplace for verified capabilities across twelve architectural domains.',
        href: '#capabilities',
        status: 'planned',
      },
      {
        id: 'provider-ecosystem',
        label: 'Provider Ecosystem',
        description:
          'Provider integrations conforming to published specifications across eight infrastructure domains.',
        href: '#providers',
        status: 'planned',
      },
      {
        id: 'developer-tooling',
        label: 'Developer Tooling',
        description: 'CLI, compiler, language server, playground, debugger, and testing framework.',
        href: '#tooling',
        status: 'planned',
      },
      {
        id: 'community',
        label: 'Community',
        description: 'Contributors, maintainers, and organizations building the open ecosystem.',
        href: '#community',
        status: 'planned',
      },
    ],
  },
  principles: [
    {
      index: '01',
      title: 'Open by Design',
      description:
        'All specifications, reference implementations, and architectural contracts are published openly. No closed extensions, no vendor-only APIs.',
    },
    {
      index: '02',
      title: 'Provider Neutral',
      description:
        'Rohinik defines contracts, not preferred providers. Any conforming implementation may participate in the ecosystem.',
    },
    {
      index: '03',
      title: 'Capability First',
      description:
        'Capabilities are the primary unit of composition. The ecosystem is structured around capability domains, not layers or services.',
    },
    {
      index: '04',
      title: 'Specification Driven',
      description:
        'Every architectural decision traces to a published specification. Implementations follow specifications; specifications never follow implementations.',
    },
  ],
  foundation: {
    chain: [
      {
        id: 'constitution',
        label: 'Foundation Constitution',
        description:
          'The root authority document. Defines the governance structure, constitutional invariants, and the mandate for open specifications.',
      },
      {
        id: 'specifications',
        label: 'Specifications',
        description:
          'Normative architectural contracts. Defines capability interfaces, provider contracts, and runtime behavior.',
        href: '/specifications',
      },
      {
        id: 'reference-standards',
        label: 'Reference Standards',
        description:
          'Canonical implementations that demonstrate specification correctness. Not normative — they clarify and verify, never extend.',
        href: '/reference-standards/rs-1',
      },
      {
        id: 'rs-1',
        label: 'Reference Implementation (RS-1)',
        description:
          "The Foundation's reference implementation of the current specification set. Provides the interoperability baseline for the ecosystem.",
        href: '/reference-standards/rs-1',
      },
      {
        id: 'community-implementations',
        label: 'Community Implementations',
        description:
          'Independent implementations that conform to the published specifications. May implement any subset of the specification surface.',
      },
    ],
    callout:
      "Governance is not in this chain. The Foundation Constitution defines governance separately from the specification authority chain. Conformance is to the specifications, not to the Foundation's own implementation.",
  },
  referenceStandards: {
    items: [
      {
        id: 'rs-1',
        label: 'RS-1',
        description:
          'Canonical implementation of the Rohinik Foundation Specifications. Demonstrates architectural correctness and provides an interoperability baseline.',
        status: 'available',
        href: '/reference-standards/rs-1',
      },
      {
        id: 'rs-2',
        label: 'RS-2',
        description:
          'Distributed runtime reference standard. Will define the canonical implementation of the multi-node specification.',
        status: 'planned',
      },
      {
        id: 'rs-3',
        label: 'RS-3',
        description:
          'Federation reference standard. Will define the canonical implementation of the cross-organization federation specification.',
        status: 'planned',
      },
    ],
    callout:
      'Reference Standards are not normative. They demonstrate, clarify, and verify specifications — they do not extend them.',
  },
  capabilityEcosystem: {
    domains: [
      {
        id: 'memory',
        label: 'Memory',
        description:
          'Short-term and long-term memory capabilities for agent state and context persistence.',
        status: 'planned',
      },
      {
        id: 'intelligence',
        label: 'Intelligence',
        description: 'LLM-backed reasoning and generation capabilities.',
        status: 'planned',
      },
      {
        id: 'search',
        label: 'Search',
        description: 'Semantic and keyword search across structured and unstructured data sources.',
        status: 'planned',
      },
      {
        id: 'reasoning',
        label: 'Reasoning',
        description: 'Structured reasoning, planning, and multi-step decision capabilities.',
        status: 'planned',
      },
      {
        id: 'vision',
        label: 'Vision',
        description: 'Image understanding, OCR, and visual reasoning capabilities.',
        status: 'planned',
      },
      {
        id: 'audio',
        label: 'Audio',
        description: 'Speech-to-text, text-to-speech, and audio analysis capabilities.',
        status: 'planned',
      },
      {
        id: 'storage',
        label: 'Storage',
        description: 'Structured and unstructured data persistence capabilities.',
        status: 'planned',
      },
      {
        id: 'networking',
        label: 'Networking',
        description: 'HTTP, WebSocket, and message queue interaction capabilities.',
        status: 'planned',
      },
      {
        id: 'security',
        label: 'Security',
        description: 'Secrets management, policy enforcement, and audit capabilities.',
        status: 'planned',
      },
      {
        id: 'identity',
        label: 'Identity',
        description: 'Authentication, authorization, and identity resolution capabilities.',
        status: 'planned',
      },
      {
        id: 'observability',
        label: 'Observability',
        description: 'Tracing, metrics, logging, and alerting capabilities.',
        status: 'planned',
      },
      {
        id: 'scheduling',
        label: 'Scheduling',
        description: 'Cron, event-driven, and workflow scheduling capabilities.',
        status: 'planned',
      },
    ],
    callout:
      'The Capability Marketplace will allow verified capabilities to be published, discovered, versioned, and installed. The domains above represent the planned architectural scope of that ecosystem.',
  },
  providerEcosystem: {
    domains: [
      {
        id: 'llm',
        label: 'LLM Providers',
        purpose:
          'Language model inference and fine-tuning through the Intelligence capability contract.',
        status: 'planned',
      },
      {
        id: 'cloud',
        label: 'Cloud Platforms',
        purpose:
          'Compute, storage, and networking primitives mapped to Rohinik capability contracts.',
        status: 'planned',
      },
      {
        id: 'databases',
        label: 'Databases',
        purpose:
          'Relational, document, vector, and graph databases through the Storage capability contract.',
        status: 'planned',
      },
      {
        id: 'search-engines',
        label: 'Search Engines',
        purpose: 'Full-text and semantic search through the Search capability contract.',
        status: 'planned',
      },
      {
        id: 'messaging',
        label: 'Messaging Systems',
        purpose: 'Message queues and event streams through the Networking capability contract.',
        status: 'planned',
      },
      {
        id: 'devops',
        label: 'DevOps Platforms',
        purpose: 'CI/CD, container orchestration, and infrastructure-as-code integration.',
        status: 'planned',
      },
      {
        id: 'identity-providers',
        label: 'Identity Providers',
        purpose: 'OAuth, SAML, and LDAP integration through the Identity capability contract.',
        status: 'planned',
      },
      {
        id: 'observability-platforms',
        label: 'Observability Platforms',
        purpose: 'Traces, metrics, and logs through the Observability capability contract.',
        status: 'planned',
      },
    ],
    callout:
      'Rohinik defines provider contracts, not preferred providers. Any implementation conforming to the published specifications may participate in the ecosystem.',
  },
  tooling: {
    tools: [
      {
        id: 'cli',
        label: 'CLI',
        purpose:
          'Project scaffolding, capability management, runtime control, and ecosystem interaction.',
        status: 'planned',
      },
      {
        id: 'package-manager',
        label: 'Package Manager',
        purpose: 'Capability and provider package resolution, versioning, and installation.',
        status: 'planned',
      },
      {
        id: 'compiler',
        label: 'Compiler',
        purpose: 'Specification validation and capability interface compilation.',
        status: 'planned',
      },
      {
        id: 'language-server',
        label: 'Language Server',
        purpose:
          'IDE integration: capability autocomplete, contract validation, and spec navigation.',
        status: 'planned',
      },
      {
        id: 'playground',
        label: 'Playground',
        purpose: 'Interactive environment for exploring capabilities and testing runtime behavior.',
        status: 'planned',
      },
      {
        id: 'debugger',
        label: 'Debugger',
        purpose: 'Capability trace inspection and runtime state debugging.',
        status: 'planned',
      },
      {
        id: 'testing-framework',
        label: 'Testing Framework',
        purpose: 'Conformance testing for capability and provider implementations.',
        status: 'planned',
      },
      {
        id: 'observability-tools',
        label: 'Observability Tools',
        purpose: 'Built-in tracing, metrics dashboards, and log aggregation for Rohinik runtimes.',
        status: 'planned',
      },
    ],
  },
  sdks: {
    items: [
      { id: 'typescript', language: 'TypeScript', status: 'foundation-implementation' },
      { id: 'java', language: 'Java', status: 'planned' },
      { id: 'python', language: 'Python', status: 'planned' },
      { id: 'go', language: 'Go', status: 'planned' },
      { id: 'rust', language: 'Rust', status: 'planned' },
      { id: 'csharp', language: 'C#', status: 'planned' },
      { id: 'cpp', language: 'C++', status: 'planned' },
      { id: 'swift', language: 'Swift', status: 'planned' },
      { id: 'kotlin', language: 'Kotlin', status: 'planned' },
    ],
    note: 'The Foundation Reference Standards are implemented in TypeScript. Additional SDKs will be developed independently while preserving architectural compatibility with the published specifications.',
  },
  community: {
    participation: [
      {
        id: 'contributing',
        label: 'Contributing',
        description:
          'Submit RFCs, report issues, improve documentation, and contribute to reference implementations.',
        callToAction: 'Read the contributing guide',
      },
      {
        id: 'maintaining',
        label: 'Maintaining',
        description: 'Become a maintainer of a capability domain, SDK, or ecosystem tool.',
        callToAction: 'View open maintainer roles',
      },
      {
        id: 'organizations',
        label: 'Organizations',
        description:
          'Join as a Foundation member organization. Support the ecosystem through governance participation and resource contribution.',
        callToAction: 'Learn about membership',
      },
    ],
    links: [
      {
        id: 'github',
        label: 'GitHub',
        href: 'https://github.com/rohinik-org',
        description: 'Source code, issues, and pull requests.',
      },
      {
        id: 'discussions',
        label: 'Discussions',
        href: 'https://github.com/rohinik-org/discussions',
        description: 'Community Q&A and ecosystem proposals.',
      },
      {
        id: 'rfcs',
        label: 'RFCs',
        href: 'https://github.com/rohinik-org/rfcs',
        description: 'Specification change proposals and architectural decisions.',
      },
      {
        id: 'issues',
        label: 'Issues',
        href: 'https://github.com/rohinik-org/issues',
        description: 'Bug reports and feature requests.',
      },
      {
        id: 'discord',
        label: 'Discord',
        href: 'https://discord.gg/rohinik',
        description: 'Real-time community chat.',
      },
      {
        id: 'blog',
        label: 'Blog',
        href: '/blog',
        description: 'Foundation announcements and ecosystem updates.',
      },
    ],
  },
  roadmap: {
    milestones: [
      {
        id: 'foundation',
        label: 'Foundation',
        description:
          'Foundation Constitution, Specifications (AFS-0001), and RS-1 reference implementation.',
        status: 'completed',
      },
      {
        id: 'runtime',
        label: 'Runtime',
        description: 'Rohinik Runtime v1: capability loading, provider wiring, and TypeScript SDK.',
        status: 'active',
      },
      {
        id: 'marketplace',
        label: 'Marketplace',
        description:
          'Capability Marketplace: publish, discover, version, and install capabilities.',
        status: 'planned',
      },
      {
        id: 'enterprise',
        label: 'Enterprise',
        description: 'Identity, security, observability, and multi-tenant runtime support.',
        status: 'planned',
      },
      {
        id: 'distributed',
        label: 'Distributed Runtime',
        description: 'Multi-node runtime with distributed capability execution and RS-2.',
        status: 'planned',
      },
      {
        id: 'federation',
        label: 'Federation',
        description: 'Cross-organization ecosystem federation and RS-3.',
        status: 'planned',
      },
    ],
  },
  getInvolved: {
    actions: [
      {
        id: 'read-specs',
        label: 'Read Specifications',
        description: 'Understand the architectural contracts that govern the ecosystem.',
        href: '/specifications',
      },
      {
        id: 'build-capabilities',
        label: 'Build Capabilities',
        description: 'Implement a capability conforming to the published specifications.',
        href: '/reference-standards/rs-1',
      },
      {
        id: 'publish-packages',
        label: 'Publish Packages',
        description: 'Package and publish capabilities for the Capability Marketplace.',
        href: '#capabilities',
      },
      {
        id: 'implement-provider',
        label: 'Implement a Provider',
        description:
          'Build a provider implementation conforming to the provider contract specifications.',
        href: '#providers',
      },
      {
        id: 'become-maintainer',
        label: 'Become Maintainer',
        description: 'Take ownership of a capability domain, SDK, or ecosystem tool.',
        href: '#community',
      },
      {
        id: 'contribute',
        label: 'Contribute',
        description:
          'Submit RFCs, fix issues, improve documentation, and help build the ecosystem.',
        href: 'https://github.com/rohinik-org',
      },
    ],
  },
} as const satisfies EcosystemContent;

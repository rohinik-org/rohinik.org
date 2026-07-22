export const homepageContent = {
  hero: {
    eyebrow: 'ROHINIK FOUNDATION',
    headline: 'The Intelligent Computing Platform',
    description:
      'An open computing architecture built on deterministic memory, composable capabilities, and specification-driven execution. Not a wrapper. Not a framework. A platform.',
    ctas: [
      { label: 'READ THE ARCHITECTURE', href: '/architecture' },
      { label: 'BROWSE SPECIFICATIONS', href: '/specifications' },
    ],
    principles: ['Memory First', 'Capability First', 'LLM Last'],
  },

  why: {
    heading: 'Why Rohinik Exists',
    statements: [
      {
        id: 'memory',
        label: 'MEMORY',
        heading: 'Deterministic, not probabilistic',
        body: 'Every agent state, every capability invocation, every execution trace — written to a structured memory graph. Recall is exact. Audit is complete. LLMs read memory; they do not own it.',
      },
      {
        id: 'capabilities',
        label: 'CAPABILITIES',
        heading: 'Composed, not prompted',
        body: 'Capabilities are registered, typed, versioned, and governed. An agent selects from a registry — not from inference. The capability boundary is the system boundary.',
      },
      {
        id: 'models',
        label: 'MODELS',
        heading: 'Consumed, not trusted',
        body: 'Language models are inference endpoints. They generate; they do not decide. Every model output is validated against a contract before it touches state. The model is the last call, not the first.',
      },
    ],
  },

  architecture: {
    heading: 'Seven-Layer Architecture',
    subheading: 'From Foundation to Shell — each layer has one job.',
    layers: [
      {
        id: 'shell',
        index: 1,
        label: 'Shell',
        description:
          'User-facing interface layer. CLI, SDK, web. Translates intent into platform requests.',
        href: '/architecture#shell',
      },
      {
        id: 'compiler',
        index: 2,
        label: 'Compiler',
        description:
          'Transforms natural language intent into typed capability graphs. Deterministic, auditable, no guessing.',
        href: '/architecture#compiler',
      },
      {
        id: 'memory',
        index: 3,
        label: 'Memory',
        description:
          'Structured memory graph. Every agent state, capability trace, and execution event is a first-class record.',
        href: '/architecture#memory',
      },
      {
        id: 'intelligence',
        index: 4,
        label: 'Intelligence',
        description:
          'The boundary where language models are consumed. Models read context; they do not write state.',
        href: '/architecture#intelligence',
      },
      {
        id: 'runtime',
        index: 5,
        label: 'Runtime',
        description:
          'Executes capability graphs. Manages capability lifecycle, concurrency, and error boundaries.',
        href: '/architecture#runtime',
      },
      {
        id: 'kernel',
        index: 6,
        label: 'Kernel',
        description:
          'Core platform services: scheduling, resource allocation, lifecycle management, policy enforcement.',
        href: '/architecture#kernel',
      },
      {
        id: 'foundation',
        index: 7,
        label: 'Foundation',
        description:
          'Specification governance, standards registry, and the normative contracts all layers implement against.',
        href: '/architecture#foundation',
      },
    ],
  },

  principles: {
    heading: 'Core Principles',
    items: [
      {
        index: '01',
        title: 'Specification-Driven',
        description:
          'Every interface, every contract, every capability is defined by a specification before it is implemented. Code is an artifact of the spec, not the other way around.',
      },
      {
        index: '02',
        title: 'Memory First',
        description:
          'State lives in structured memory, not in model context windows. Memory is queryable, versionable, and owned by the platform — not by any model.',
      },
      {
        index: '03',
        title: 'Capability Composition',
        description:
          'Behaviour is assembled from versioned, typed capabilities in a registry. Composition is explicit. There is no hidden prompt engineering.',
      },
      {
        index: '04',
        title: 'Governed Execution',
        description:
          'Every execution passes through a governance layer before it reaches state. Policies are declared, not ad-hoc. Every decision is traceable.',
      },
    ],
  },

  execution: {
    heading: 'Execution Lifecycle',
    subheading: 'Seven deterministic stages. Every invocation follows this path.',
    stages: [
      {
        id: 'intent',
        index: 1,
        label: 'Intent',
        description: 'User or agent expresses an intent. Structured, not free-form.',
      },
      {
        id: 'context',
        index: 2,
        label: 'Context',
        description: 'Memory graph is queried. Relevant state is assembled.',
      },
      {
        id: 'compile',
        index: 3,
        label: 'Compile',
        description: 'Intent is compiled into a typed capability graph.',
      },
      {
        id: 'govern',
        index: 4,
        label: 'Govern',
        description: 'Governance layer validates the graph against policies.',
      },
      {
        id: 'execute',
        index: 5,
        label: 'Execute',
        description: 'Runtime executes the capability graph.',
      },
      {
        id: 'observe',
        index: 6,
        label: 'Observe',
        description: 'Every action is traced and written to the observation log.',
      },
      {
        id: 'remember',
        index: 7,
        label: 'Remember',
        description: 'Execution results are committed to the memory graph.',
      },
    ],
  },

  specifications: {
    heading: 'Specification Registry',
    subheading: 'Rohinik is specified before it is built.',
    items: [
      {
        id: 'registry',
        label: 'Specification Registry',
        description: 'All platform specifications, versioned, classified, and governed.',
        href: '/specifications',
      },
      {
        id: 'rs1',
        label: 'RS-1 — Runtime Standard 1',
        description: 'The normative runtime specification for the first Rohinik generation.',
        href: '/rs-1',
      },
      {
        id: 'governance',
        label: 'Governance Model',
        description: 'How specifications are proposed, reviewed, ratified, and retired.',
        href: '/governance',
      },
    ],
  },

  governance: {
    heading: 'Open Governance',
    body: 'Rohinik is governed by its specification process. Every decision is made in public, recorded in an ADR, and traceable to a ratified specification. No black boxes.',
    cta: { label: 'READ GOVERNANCE MODEL', href: '/governance' },
  },

  community: {
    heading: 'Build on Rohinik',
    items: [
      {
        id: 'documentation',
        label: 'Documentation',
        description: 'Platform guides, API references, and integration tutorials.',
        href: '/documentation',
      },
      {
        id: 'ecosystem',
        label: 'Ecosystem',
        description: 'Capability registry, extensions, packages, skills, and memories.',
        href: '/ecosystem',
      },
      {
        id: 'community',
        label: 'Community',
        description: 'Contributors, working groups, SIGs, and public discussion.',
        href: '/community',
      },
    ],
  },
} as const;

export type HomepageContent = typeof homepageContent;

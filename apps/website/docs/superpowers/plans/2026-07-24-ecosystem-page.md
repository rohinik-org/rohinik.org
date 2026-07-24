# Ecosystem Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/ecosystem` page for the Rohinik Foundation website as a 13-section engineering-spec-style page.

**Architecture:** Content-first: all data lives in `content/ecosystem/types.ts` + `content/ecosystem/ecosystem.ts` as `as const satisfies EcosystemContent`. Thirteen sync RSC components in `components/ecosystem/` each consume the content object directly (same pattern as RS-1). `app/ecosystem/page.tsx` composes them in order.

**Tech Stack:** Next.js 15 App Router, React 19 RSC, Tailwind v4, Vitest + React Testing Library + jest-axe. Import alias `@/*` resolves to `apps/website/*`.

---

## File Map

**Create:**
- `apps/website/content/ecosystem/types.ts` — all interfaces and enums
- `apps/website/content/ecosystem/ecosystem.ts` — `as const satisfies EcosystemContent`
- `apps/website/components/ecosystem/EcosystemHero.tsx`
- `apps/website/components/ecosystem/EcosystemMap.tsx`
- `apps/website/components/ecosystem/EcosystemIntroduction.tsx`
- `apps/website/components/ecosystem/EcosystemOverviewGrid.tsx`
- `apps/website/components/ecosystem/EcosystemPrinciples.tsx`
- `apps/website/components/ecosystem/FoundationArchitecture.tsx`
- `apps/website/components/ecosystem/ReferenceStandardsSection.tsx`
- `apps/website/components/ecosystem/CapabilityEcosystem.tsx`
- `apps/website/components/ecosystem/ProviderEcosystem.tsx`
- `apps/website/components/ecosystem/DeveloperTooling.tsx`
- `apps/website/components/ecosystem/SDKSection.tsx`
- `apps/website/components/ecosystem/CommunitySection.tsx`
- `apps/website/components/ecosystem/RoadmapSection.tsx`
- `apps/website/components/ecosystem/GetInvolvedSection.tsx`
- `apps/website/app/ecosystem/page.tsx`
- `apps/website/__tests__/components/ecosystem/EcosystemPage.test.tsx`
- `apps/website/__tests__/components/ecosystem/EcosystemMap.test.tsx`
- `apps/website/__tests__/components/ecosystem/ImplementationStatus.test.tsx`

---

## Codebase Patterns (read before implementing)

- `apps/website/content/reference-standards/types.ts` — interface pattern
- `apps/website/content/reference-standards/rs1.ts` — `as const satisfies`, `COVERAGE_STATUS`
- `apps/website/components/reference-standard/ScopeBoundary.tsx` — vertical `<ol>` with square markers + connector lines
- `apps/website/components/reference-standard/DevelopmentLifecycle.tsx` — `sm:border-r` horizontal pipeline, no `→` text
- `apps/website/components/reference-standard/RSReferences.tsx` — link list with `hover:border-l-2 hover:border-secondary`
- `apps/website/components/reference-standard/DesignPrinciples.tsx` — grid with `i%3`/`i%2` border math
- `apps/website/app/reference-standards/rs-1/page.tsx` — metadata + composition pattern
- `apps/website/__tests__/components/rs1/RSPage.test.tsx` — test structure to follow

**Design invariants (hard rules):**
- No `'use client'` anywhere
- No rounded corners on structural elements (no `rounded-*`)
- No box shadows
- Tailwind v4 tokens only — no arbitrary hex values
- All sections: `border-b border-outline-variant`, alternating `bg-surface` / `bg-surface-container-low`
- Grid: `grid-cols-1 md:grid-cols-*` mobile-first

---

### Task 1: Content types

**Files:**
- Create: `apps/website/content/ecosystem/types.ts`

- [ ] **Step 1: Write the failing test**

Create `apps/website/__tests__/components/ecosystem/ImplementationStatus.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import {
  IMPLEMENTATION_STATUS,
  IMPLEMENTATION_STATUS_LABEL,
  ecosystemContent,
} from '@/content/ecosystem/ecosystem';
import type { ImplementationStatus } from '@/content/ecosystem/types';

describe('IMPLEMENTATION_STATUS constants', () => {
  it('AVAILABLE === "available"', () => {
    expect(IMPLEMENTATION_STATUS.AVAILABLE).toBe('available');
  });
  it('FOUNDATION_IMPLEMENTATION === "foundation-implementation"', () => {
    expect(IMPLEMENTATION_STATUS.FOUNDATION_IMPLEMENTATION).toBe('foundation-implementation');
  });
  it('IN_DEVELOPMENT === "in-development"', () => {
    expect(IMPLEMENTATION_STATUS.IN_DEVELOPMENT).toBe('in-development');
  });
  it('PLANNED === "planned"', () => {
    expect(IMPLEMENTATION_STATUS.PLANNED).toBe('planned');
  });
});

describe('IMPLEMENTATION_STATUS_LABEL', () => {
  it('has an entry for every ImplementationStatus value', () => {
    const statuses: ImplementationStatus[] = [
      'available',
      'foundation-implementation',
      'in-development',
      'planned',
    ];
    for (const s of statuses) {
      expect(IMPLEMENTATION_STATUS_LABEL[s]).toBeTruthy();
    }
  });
  it('labels are human-readable strings', () => {
    expect(IMPLEMENTATION_STATUS_LABEL['available']).toBe('Available');
    expect(IMPLEMENTATION_STATUS_LABEL['foundation-implementation']).toBe('Foundation Implementation');
    expect(IMPLEMENTATION_STATUS_LABEL['in-development']).toBe('In Development');
    expect(IMPLEMENTATION_STATUS_LABEL['planned']).toBe('Planned');
  });
});

describe('ecosystemContent data invariants', () => {
  it('TypeScript SDK status === "foundation-implementation"', () => {
    const ts = ecosystemContent.sdks.items.find((s) => s.language === 'TypeScript');
    expect(ts).toBeDefined();
    expect(ts!.status).toBe('foundation-implementation');
  });
  it('all capability domains have status === "planned"', () => {
    for (const d of ecosystemContent.capabilityEcosystem.domains) {
      expect(d.status).toBe('planned');
    }
  });
  it('all provider domains have status === "planned"', () => {
    for (const d of ecosystemContent.providerEcosystem.domains) {
      expect(d.status).toBe('planned');
    }
  });
  it('all tooling items have status === "planned"', () => {
    for (const t of ecosystemContent.tooling.tools) {
      expect(t.status).toBe('planned');
    }
  });
  it('overview cards: Specifications and Reference Standards are "available", rest are "planned"', () => {
    const specs = ecosystemContent.overview.cards.find((c) => c.label === 'Specifications');
    const rs = ecosystemContent.overview.cards.find((c) => c.label === 'Reference Standards');
    expect(specs!.status).toBe('available');
    expect(rs!.status).toBe('available');
    const rest = ecosystemContent.overview.cards.filter(
      (c) => c.label !== 'Specifications' && c.label !== 'Reference Standards',
    );
    for (const c of rest) {
      expect(c.status).toBe('planned');
    }
  });
  it('roadmap: Foundation milestone status === "completed"', () => {
    const foundation = ecosystemContent.roadmap.milestones.find((m) => m.label === 'Foundation');
    expect(foundation!.status).toBe('completed');
  });
  it('roadmap: Runtime milestone status === "active"', () => {
    const runtime = ecosystemContent.roadmap.milestones.find((m) => m.label === 'Runtime');
    expect(runtime!.status).toBe('active');
  });
  it('has exactly 12 capability domains', () => {
    expect(ecosystemContent.capabilityEcosystem.domains).toHaveLength(12);
  });
  it('has exactly 8 provider domains', () => {
    expect(ecosystemContent.providerEcosystem.domains).toHaveLength(8);
  });
  it('has exactly 8 tooling items', () => {
    expect(ecosystemContent.tooling.tools).toHaveLength(8);
  });
  it('has exactly 9 SDKs', () => {
    expect(ecosystemContent.sdks.items).toHaveLength(9);
  });
  it('has exactly 6 roadmap milestones', () => {
    expect(ecosystemContent.roadmap.milestones).toHaveLength(6);
  });
  it('has exactly 6 get-involved actions', () => {
    expect(ecosystemContent.getInvolved.actions).toHaveLength(6);
  });
  it('has exactly 6 overview cards', () => {
    expect(ecosystemContent.overview.cards).toHaveLength(6);
  });
  it('has exactly 4 principles', () => {
    expect(ecosystemContent.principles).toHaveLength(4);
  });
  it('foundation chain has 5 nodes', () => {
    expect(ecosystemContent.foundation.chain).toHaveLength(5);
  });
  it('foundation chain first node is Foundation Constitution', () => {
    expect(ecosystemContent.foundation.chain[0].label).toBe('Foundation Constitution');
  });
  it('foundation chain last node is Community Implementations', () => {
    const last = ecosystemContent.foundation.chain[ecosystemContent.foundation.chain.length - 1];
    expect(last.label).toBe('Community Implementations');
  });
  it('RS-1 reference standard is available', () => {
    const rs1 = ecosystemContent.referenceStandards.items.find((r) => r.id === 'rs-1');
    expect(rs1!.status).toBe('available');
    expect(rs1!.href).toBe('/reference-standards/rs-1');
  });
  it('RS-2 and RS-3 are planned with no href', () => {
    const rs2 = ecosystemContent.referenceStandards.items.find((r) => r.id === 'rs-2');
    const rs3 = ecosystemContent.referenceStandards.items.find((r) => r.id === 'rs-3');
    expect(rs2!.status).toBe('planned');
    expect(rs3!.status).toBe('planned');
    expect(rs2!.href).toBeUndefined();
    expect(rs3!.href).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd apps/website && npx vitest run __tests__/components/ecosystem/ImplementationStatus.test.tsx
```

Expected: FAIL — cannot find module `@/content/ecosystem/ecosystem`

- [ ] **Step 3: Create `content/ecosystem/types.ts`**

```ts
export type ImplementationStatus =
  | 'available'
  | 'foundation-implementation'
  | 'in-development'
  | 'planned';

export interface EcosystemNode {
  readonly id: string;
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly emphasis?: boolean;
}

export interface EcosystemEdge {
  readonly id: string;
  readonly from: string;
  readonly to: string;
}

export interface EcosystemGraph {
  readonly nodes: ReadonlyArray<EcosystemNode>;
  readonly edges: ReadonlyArray<EcosystemEdge>;
}

export interface EcosystemOverviewCard {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly href: string;
  readonly status: ImplementationStatus;
}

export interface EcosystemPrinciple {
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

export interface FoundationNode {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly href?: string;
}

export interface ReferenceStandardSummary {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly status: ImplementationStatus;
  readonly href?: string;
}

export interface CapabilityDomain {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly status: ImplementationStatus;
}

export interface ProviderDomain {
  readonly id: string;
  readonly label: string;
  readonly purpose: string;
  readonly status: ImplementationStatus;
}

export interface Tool {
  readonly id: string;
  readonly label: string;
  readonly purpose: string;
  readonly status: ImplementationStatus;
}

export interface SDK {
  readonly id: string;
  readonly language: string;
  readonly status: ImplementationStatus;
}

export interface ParticipationRole {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly callToAction: string;
}

export interface CommunityLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly description: string;
}

export interface RoadmapMilestone {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly status: 'completed' | 'active' | 'planned';
}

export interface GetInvolvedAction {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly href: string;
}

export interface EcosystemContent {
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle: string;
    readonly graph: EcosystemGraph;
  };
  readonly introduction: {
    readonly purpose: ReadonlyArray<string>;
    readonly notIntendedTo: ReadonlyArray<string>;
  };
  readonly overview: {
    readonly cards: ReadonlyArray<EcosystemOverviewCard>;
  };
  readonly principles: ReadonlyArray<EcosystemPrinciple>;
  readonly foundation: {
    readonly chain: ReadonlyArray<FoundationNode>;
    readonly callout: string;
  };
  readonly referenceStandards: {
    readonly items: ReadonlyArray<ReferenceStandardSummary>;
    readonly callout: string;
  };
  readonly capabilityEcosystem: {
    readonly domains: ReadonlyArray<CapabilityDomain>;
    readonly callout: string;
  };
  readonly providerEcosystem: {
    readonly domains: ReadonlyArray<ProviderDomain>;
    readonly callout: string;
  };
  readonly tooling: {
    readonly tools: ReadonlyArray<Tool>;
  };
  readonly sdks: {
    readonly items: ReadonlyArray<SDK>;
    readonly note: string;
  };
  readonly community: {
    readonly participation: ReadonlyArray<ParticipationRole>;
    readonly links: ReadonlyArray<CommunityLink>;
  };
  readonly roadmap: {
    readonly milestones: ReadonlyArray<RoadmapMilestone>;
  };
  readonly getInvolved: {
    readonly actions: ReadonlyArray<GetInvolvedAction>;
  };
}
```

- [ ] **Step 4: Commit types**

```bash
git add apps/website/content/ecosystem/types.ts
git commit -m "feat(ecosystem): add content types"
```

---

### Task 2: Content data

**Files:**
- Create: `apps/website/content/ecosystem/ecosystem.ts`

- [ ] **Step 1: Create `content/ecosystem/ecosystem.ts`**

```ts
import type {
  EcosystemContent,
  ImplementationStatus,
} from './types';

export type { ImplementationStatus };

export const IMPLEMENTATION_STATUS = {
  AVAILABLE: 'available',
  FOUNDATION_IMPLEMENTATION: 'foundation-implementation',
  IN_DEVELOPMENT: 'in-development',
  PLANNED: 'planned',
} as const;

export const IMPLEMENTATION_STATUS_LABEL: Record<ImplementationStatus, string> = {
  'available': 'Available',
  'foundation-implementation': 'Foundation Implementation',
  'in-development': 'In Development',
  'planned': 'Planned',
};

export const ecosystemContent = {
  hero: {
    eyebrow: 'Rohinik Foundation',
    title: 'The Ecosystem',
    subtitle: 'An open, specification-driven ecosystem for capability-based AI infrastructure.',
    graph: {
      nodes: [
        { id: 'constitution', label: 'Foundation Constitution', x: 280, y: 400, width: 240, height: 40, emphasis: true },
        { id: 'specifications', label: 'Specifications', x: 100, y: 300, width: 180, height: 40 },
        { id: 'reference-standards', label: 'Reference Standards', x: 310, y: 300, width: 180, height: 40 },
        { id: 'architecture', label: 'Architecture', x: 520, y: 300, width: 180, height: 40 },
        { id: 'runtime', label: 'Rohinik Runtime', x: 310, y: 210, width: 180, height: 40, emphasis: true },
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
        description: 'Normative documents that define the architectural contracts of the Rohinik ecosystem.',
        href: '/specifications',
        status: 'available',
      },
      {
        id: 'reference-standards',
        label: 'Reference Standards',
        description: 'Canonical implementations that demonstrate specification correctness and provide interoperability baselines.',
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
        description: 'Provider integrations conforming to published specifications across eight infrastructure domains.',
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
      description: 'All specifications, reference implementations, and architectural contracts are published openly. No closed extensions, no vendor-only APIs.',
    },
    {
      index: '02',
      title: 'Provider Neutral',
      description: 'Rohinik defines contracts, not preferred providers. Any conforming implementation may participate in the ecosystem.',
    },
    {
      index: '03',
      title: 'Capability First',
      description: 'Capabilities are the primary unit of composition. The ecosystem is structured around capability domains, not layers or services.',
    },
    {
      index: '04',
      title: 'Specification Driven',
      description: 'Every architectural decision traces to a published specification. Implementations follow specifications; specifications never follow implementations.',
    },
  ],
  foundation: {
    chain: [
      {
        id: 'constitution',
        label: 'Foundation Constitution',
        description: 'The root authority document. Defines the governance structure, constitutional invariants, and the mandate for open specifications.',
      },
      {
        id: 'specifications',
        label: 'Specifications',
        description: 'Normative architectural contracts. Defines capability interfaces, provider contracts, and runtime behavior.',
        href: '/specifications',
      },
      {
        id: 'reference-standards',
        label: 'Reference Standards',
        description: 'Canonical implementations that demonstrate specification correctness. Not normative — they clarify and verify, never extend.',
        href: '/reference-standards/rs-1',
      },
      {
        id: 'rs-1',
        label: 'Reference Implementation (RS-1)',
        description: 'The Foundation\'s reference implementation of the current specification set. Provides the interoperability baseline for the ecosystem.',
        href: '/reference-standards/rs-1',
      },
      {
        id: 'community-implementations',
        label: 'Community Implementations',
        description: 'Independent implementations that conform to the published specifications. May implement any subset of the specification surface.',
      },
    ],
    callout: 'Governance is not in this chain. The Foundation Constitution defines governance separately from the specification authority chain. Conformance is to the specifications, not to the Foundation\'s own implementation.',
  },
  referenceStandards: {
    items: [
      {
        id: 'rs-1',
        label: 'RS-1',
        description: 'Canonical implementation of the Rohinik Foundation Specifications. Demonstrates architectural correctness and provides an interoperability baseline.',
        status: 'available',
        href: '/reference-standards/rs-1',
      },
      {
        id: 'rs-2',
        label: 'RS-2',
        description: 'Distributed runtime reference standard. Will define the canonical implementation of the multi-node specification.',
        status: 'planned',
      },
      {
        id: 'rs-3',
        label: 'RS-3',
        description: 'Federation reference standard. Will define the canonical implementation of the cross-organization federation specification.',
        status: 'planned',
      },
    ],
    callout: 'Reference Standards are not normative. They demonstrate, clarify, and verify specifications — they do not extend them.',
  },
  capabilityEcosystem: {
    domains: [
      { id: 'memory', label: 'Memory', description: 'Short-term and long-term memory capabilities for agent state and context persistence.', status: 'planned' },
      { id: 'intelligence', label: 'Intelligence', description: 'LLM-backed reasoning and generation capabilities.', status: 'planned' },
      { id: 'search', label: 'Search', description: 'Semantic and keyword search across structured and unstructured data sources.', status: 'planned' },
      { id: 'reasoning', label: 'Reasoning', description: 'Structured reasoning, planning, and multi-step decision capabilities.', status: 'planned' },
      { id: 'vision', label: 'Vision', description: 'Image understanding, OCR, and visual reasoning capabilities.', status: 'planned' },
      { id: 'audio', label: 'Audio', description: 'Speech-to-text, text-to-speech, and audio analysis capabilities.', status: 'planned' },
      { id: 'storage', label: 'Storage', description: 'Structured and unstructured data persistence capabilities.', status: 'planned' },
      { id: 'networking', label: 'Networking', description: 'HTTP, WebSocket, and message queue interaction capabilities.', status: 'planned' },
      { id: 'security', label: 'Security', description: 'Secrets management, policy enforcement, and audit capabilities.', status: 'planned' },
      { id: 'identity', label: 'Identity', description: 'Authentication, authorization, and identity resolution capabilities.', status: 'planned' },
      { id: 'observability', label: 'Observability', description: 'Tracing, metrics, logging, and alerting capabilities.', status: 'planned' },
      { id: 'scheduling', label: 'Scheduling', description: 'Cron, event-driven, and workflow scheduling capabilities.', status: 'planned' },
    ],
    callout: 'The Capability Marketplace will allow verified capabilities to be published, discovered, versioned, and installed. The domains above represent the planned architectural scope of that ecosystem.',
  },
  providerEcosystem: {
    domains: [
      { id: 'llm', label: 'LLM Providers', purpose: 'Language model inference and fine-tuning through the Intelligence capability contract.', status: 'planned' },
      { id: 'cloud', label: 'Cloud Platforms', purpose: 'Compute, storage, and networking primitives mapped to Rohinik capability contracts.', status: 'planned' },
      { id: 'databases', label: 'Databases', purpose: 'Relational, document, vector, and graph databases through the Storage capability contract.', status: 'planned' },
      { id: 'search-engines', label: 'Search Engines', purpose: 'Full-text and semantic search through the Search capability contract.', status: 'planned' },
      { id: 'messaging', label: 'Messaging Systems', purpose: 'Message queues and event streams through the Networking capability contract.', status: 'planned' },
      { id: 'devops', label: 'DevOps Platforms', purpose: 'CI/CD, container orchestration, and infrastructure-as-code integration.', status: 'planned' },
      { id: 'identity-providers', label: 'Identity Providers', purpose: 'OAuth, SAML, and LDAP integration through the Identity capability contract.', status: 'planned' },
      { id: 'observability-platforms', label: 'Observability Platforms', purpose: 'Traces, metrics, and logs through the Observability capability contract.', status: 'planned' },
    ],
    callout: 'Rohinik defines provider contracts, not preferred providers. Any implementation conforming to the published specifications may participate in the ecosystem.',
  },
  tooling: {
    tools: [
      { id: 'cli', label: 'CLI', purpose: 'Project scaffolding, capability management, runtime control, and ecosystem interaction.', status: 'planned' },
      { id: 'package-manager', label: 'Package Manager', purpose: 'Capability and provider package resolution, versioning, and installation.', status: 'planned' },
      { id: 'compiler', label: 'Compiler', purpose: 'Specification validation and capability interface compilation.', status: 'planned' },
      { id: 'language-server', label: 'Language Server', purpose: 'IDE integration: capability autocomplete, contract validation, and spec navigation.', status: 'planned' },
      { id: 'playground', label: 'Playground', purpose: 'Interactive environment for exploring capabilities and testing runtime behavior.', status: 'planned' },
      { id: 'debugger', label: 'Debugger', purpose: 'Capability trace inspection and runtime state debugging.', status: 'planned' },
      { id: 'testing-framework', label: 'Testing Framework', purpose: 'Conformance testing for capability and provider implementations.', status: 'planned' },
      { id: 'observability-tools', label: 'Observability Tools', purpose: 'Built-in tracing, metrics dashboards, and log aggregation for Rohinik runtimes.', status: 'planned' },
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
        description: 'Submit RFCs, report issues, improve documentation, and contribute to reference implementations.',
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
        description: 'Join as a Foundation member organization. Support the ecosystem through governance participation and resource contribution.',
        callToAction: 'Learn about membership',
      },
    ],
    links: [
      { id: 'github', label: 'GitHub', href: 'https://github.com/rohinik-org', description: 'Source code, issues, and pull requests.' },
      { id: 'discussions', label: 'Discussions', href: 'https://github.com/rohinik-org/discussions', description: 'Community Q&A and ecosystem proposals.' },
      { id: 'rfcs', label: 'RFCs', href: 'https://github.com/rohinik-org/rfcs', description: 'Specification change proposals and architectural decisions.' },
      { id: 'issues', label: 'Issues', href: 'https://github.com/rohinik-org/issues', description: 'Bug reports and feature requests.' },
      { id: 'discord', label: 'Discord', href: 'https://discord.gg/rohinik', description: 'Real-time community chat.' },
      { id: 'blog', label: 'Blog', href: '/blog', description: 'Foundation announcements and ecosystem updates.' },
    ],
  },
  roadmap: {
    milestones: [
      { id: 'foundation', label: 'Foundation', description: 'Foundation Constitution, Specifications (AFS-0001), and RS-1 reference implementation.', status: 'completed' },
      { id: 'runtime', label: 'Runtime', description: 'Rohinik Runtime v1: capability loading, provider wiring, and TypeScript SDK.', status: 'active' },
      { id: 'marketplace', label: 'Marketplace', description: 'Capability Marketplace: publish, discover, version, and install capabilities.', status: 'planned' },
      { id: 'enterprise', label: 'Enterprise', description: 'Identity, security, observability, and multi-tenant runtime support.', status: 'planned' },
      { id: 'distributed', label: 'Distributed Runtime', description: 'Multi-node runtime with distributed capability execution and RS-2.', status: 'planned' },
      { id: 'federation', label: 'Federation', description: 'Cross-organization ecosystem federation and RS-3.', status: 'planned' },
    ],
  },
  getInvolved: {
    actions: [
      { id: 'read-specs', label: 'Read Specifications', description: 'Understand the architectural contracts that govern the ecosystem.', href: '/specifications' },
      { id: 'build-capabilities', label: 'Build Capabilities', description: 'Implement a capability conforming to the published specifications.', href: '/reference-standards/rs-1' },
      { id: 'publish-packages', label: 'Publish Packages', description: 'Package and publish capabilities for the Capability Marketplace.', href: '#capabilities' },
      { id: 'implement-provider', label: 'Implement a Provider', description: 'Build a provider implementation conforming to the provider contract specifications.', href: '#providers' },
      { id: 'become-maintainer', label: 'Become Maintainer', description: 'Take ownership of a capability domain, SDK, or ecosystem tool.', href: '#community' },
      { id: 'contribute', label: 'Contribute', description: 'Submit RFCs, fix issues, improve documentation, and help build the ecosystem.', href: 'https://github.com/rohinik-org' },
    ],
  },
} as const satisfies EcosystemContent;
```

- [ ] **Step 2: Run the test**

```bash
cd apps/website && npx vitest run __tests__/components/ecosystem/ImplementationStatus.test.tsx
```

Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add apps/website/content/ecosystem/ecosystem.ts apps/website/__tests__/components/ecosystem/ImplementationStatus.test.tsx
git commit -m "feat(ecosystem): add content data and ImplementationStatus tests"
```

---

### Task 3: EcosystemMap component + test

**Files:**
- Create: `apps/website/components/ecosystem/EcosystemMap.tsx`
- Create: `apps/website/__tests__/components/ecosystem/EcosystemMap.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/website/__tests__/components/ecosystem/EcosystemMap.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EcosystemMap } from '@/components/ecosystem/EcosystemMap';
import { ecosystemContent } from '@/content/ecosystem/ecosystem';

const graph = ecosystemContent.hero.graph;

describe('EcosystemMap', () => {
  it('renders SVG with role="img"', () => {
    render(<EcosystemMap graph={graph} />);
    expect(document.querySelector('svg[role="img"]')).toBeInTheDocument();
  });

  it('aria-labelledby points to existing title id', () => {
    render(<EcosystemMap graph={graph} />);
    const svg = document.querySelector('svg');
    const labelledBy = svg?.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy!)).toBeInTheDocument();
  });

  it('renders a <title> element', () => {
    render(<EcosystemMap graph={graph} />);
    expect(document.querySelector('svg title')).toBeInTheDocument();
  });

  it('renders a <desc> element', () => {
    render(<EcosystemMap graph={graph} />);
    expect(document.querySelector('svg desc')).toBeInTheDocument();
  });

  it('renders all node labels from graph data', () => {
    render(<EcosystemMap graph={graph} />);
    for (const node of graph.nodes) {
      expect(screen.getByText(node.label)).toBeInTheDocument();
    }
  });

  it('node count matches graph.nodes.length', () => {
    render(<EcosystemMap graph={graph} />);
    // Each node renders a <rect> element
    const rects = document.querySelectorAll('svg rect');
    expect(rects.length).toBe(graph.nodes.length);
  });

  it('no hardcoded label strings — all labels come from props', () => {
    const minimalGraph = {
      nodes: [{ id: 'test-node', label: 'Test Label XYZ', x: 10, y: 10, width: 100, height: 30 }],
      edges: [],
    };
    render(<EcosystemMap graph={minimalGraph} />);
    expect(screen.getByText('Test Label XYZ')).toBeInTheDocument();
    // Ensure original labels not present when not in graph
    expect(screen.queryByText('Foundation Constitution')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd apps/website && npx vitest run __tests__/components/ecosystem/EcosystemMap.test.tsx
```

Expected: FAIL — cannot find module `@/components/ecosystem/EcosystemMap`

- [ ] **Step 3: Create `components/ecosystem/EcosystemMap.tsx`**

```tsx
import type { EcosystemGraph, EcosystemNode, EcosystemEdge } from '@/content/ecosystem/types';

interface EcosystemMapProps {
  graph: EcosystemGraph;
}

function nodeCenterX(node: EcosystemNode): number {
  return node.x + node.width / 2;
}

function nodeCenterY(node: EcosystemNode): number {
  return node.y + node.height / 2;
}

export function EcosystemMap({ graph }: EcosystemMapProps) {
  const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 800 480"
      role="img"
      aria-labelledby="ecosystem-map-title"
      className="w-full h-auto"
    >
      <title id="ecosystem-map-title">Rohinik Ecosystem Architecture Map</title>
      <desc>
        A directed graph showing the Rohinik ecosystem layers: Foundation Constitution at the base,
        Specifications, Reference Standards, and Architecture in the middle tier, Rohinik Runtime at
        center, SDKs, Packages, Capabilities, and Providers above, and Applications at the top.
      </desc>
      {graph.edges.map((edge: EcosystemEdge) => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);
        if (!from || !to) return null;
        return (
          <line
            key={edge.id}
            x1={nodeCenterX(from)}
            y1={nodeCenterY(from)}
            x2={nodeCenterX(to)}
            y2={nodeCenterY(to)}
            stroke="var(--sem-outline-variant)"
            strokeWidth="1"
          />
        );
      })}
      {graph.nodes.map((node: EcosystemNode) => (
        <g key={node.id}>
          <rect
            x={node.x}
            y={node.y}
            width={node.width}
            height={node.height}
            fill="var(--sem-surface)"
            stroke={node.emphasis ? 'var(--sem-secondary)' : 'var(--sem-outline-variant)'}
            strokeWidth="1"
          />
          <text
            x={nodeCenterX(node)}
            y={nodeCenterY(node)}
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="12"
            fill={node.emphasis ? 'var(--sem-secondary)' : 'var(--sem-on-surface)'}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd apps/website && npx vitest run __tests__/components/ecosystem/EcosystemMap.test.tsx
```

Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add apps/website/components/ecosystem/EcosystemMap.tsx apps/website/__tests__/components/ecosystem/EcosystemMap.test.tsx
git commit -m "feat(ecosystem): add EcosystemMap SVG component"
```

---

### Task 4: EcosystemHero + EcosystemIntroduction + EcosystemOverviewGrid + EcosystemPrinciples

**Files:**
- Create: `apps/website/components/ecosystem/EcosystemHero.tsx`
- Create: `apps/website/components/ecosystem/EcosystemIntroduction.tsx`
- Create: `apps/website/components/ecosystem/EcosystemOverviewGrid.tsx`
- Create: `apps/website/components/ecosystem/EcosystemPrinciples.tsx`

These four components are grouped because they form the top of the page and can be tested together in the page test (Task 12). Implement each component in full, then run all current tests at the end.

- [ ] **Step 1: Create `components/ecosystem/EcosystemHero.tsx`**

```tsx
import { ecosystemContent } from '@/content/ecosystem/ecosystem';
import { EcosystemMap } from './EcosystemMap';

export function EcosystemHero() {
  const { hero } = ecosystemContent;
  return (
    <section
      id="overview"
      aria-labelledby="ecosystem-hero-heading"
      className="border-b border-outline-variant bg-surface relative overflow-hidden"
    >
      <div className="absolute inset-0 dot-grid" />
      <div className="relative max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-4">
          {hero.eyebrow}
        </p>
        <h1
          id="ecosystem-hero-heading"
          className="font-headline text-headline-xl font-bold text-on-surface mb-6"
        >
          {hero.title}
        </h1>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-16">
          {hero.subtitle}
        </p>
        <div className="border border-outline-variant bg-surface-container-low p-4 md:p-8">
          <EcosystemMap graph={hero.graph} />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/ecosystem/EcosystemIntroduction.tsx`**

```tsx
import { ecosystemContent } from '@/content/ecosystem/ecosystem';

export function EcosystemIntroduction() {
  const { introduction } = ecosystemContent;
  return (
    <section
      id="what-is-the-ecosystem"
      aria-labelledby="introduction-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="introduction-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          What is the Ecosystem?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-6">
              Purpose
            </p>
            <ul className="space-y-4 list-none">
              {introduction.purpose.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-1.5 h-1.5 mt-2 bg-secondary shrink-0" aria-hidden="true" />
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-6">
              Not Intended To
            </p>
            <ul className="space-y-4 list-none">
              {introduction.notIntendedTo.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-1.5 h-1.5 mt-2 bg-outline shrink-0" aria-hidden="true" />
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/ecosystem/EcosystemOverviewGrid.tsx`**

```tsx
import Link from 'next/link';
import type { Route } from 'next';
import { ecosystemContent, IMPLEMENTATION_STATUS_LABEL } from '@/content/ecosystem/ecosystem';

export function EcosystemOverviewGrid() {
  const { cards } = ecosystemContent.overview;
  return (
    <section
      id="ecosystem-overview"
      aria-labelledby="overview-grid-heading"
      className="border-b border-outline-variant bg-surface"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="overview-grid-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Ecosystem Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-outline-variant divide-y md:divide-y-0">
          {cards.map((card, i) => (
            <Link
              key={card.id}
              href={card.href as Route}
              className={[
                'group p-8 hover:bg-surface-container transition-colors',
                i % 3 !== 2 ? 'lg:border-r border-outline-variant' : '',
                i % 2 === 0 ? 'md:border-r border-outline-variant lg:border-r-0' : '',
                i < 3 ? 'lg:border-b border-outline-variant' : '',
                i < 4 ? 'md:border-b border-outline-variant lg:border-b-0' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <p
                className={[
                  'font-mono text-label-caps uppercase tracking-widest mb-2',
                  card.status === 'available' || card.status === 'foundation-implementation'
                    ? 'text-secondary'
                    : 'text-on-surface-variant',
                ].join(' ')}
              >
                {IMPLEMENTATION_STATUS_LABEL[card.status]}
              </p>
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface group-hover:text-secondary transition-colors mb-3">
                {card.label}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `components/ecosystem/EcosystemPrinciples.tsx`**

```tsx
import { ecosystemContent } from '@/content/ecosystem/ecosystem';

export function EcosystemPrinciples() {
  const { principles } = ecosystemContent;
  return (
    <section
      id="principles"
      aria-labelledby="principles-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="principles-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-outline-variant divide-y md:divide-y-0">
          {principles.map((p, i) => (
            <div
              key={p.index}
              className={[
                'p-8',
                i < principles.length - 1 ? 'md:border-r border-outline-variant' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span
                aria-hidden="true"
                className="font-mono text-label-caps text-on-surface-variant mb-4 block"
              >
                {p.index}
              </span>
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-3">
                {p.title}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run all current tests**

```bash
cd apps/website && npx vitest run
```

Expected: All tests pass (no component render tests yet — these run in Task 12).

- [ ] **Step 6: Commit**

```bash
git add apps/website/components/ecosystem/EcosystemHero.tsx apps/website/components/ecosystem/EcosystemIntroduction.tsx apps/website/components/ecosystem/EcosystemOverviewGrid.tsx apps/website/components/ecosystem/EcosystemPrinciples.tsx
git commit -m "feat(ecosystem): add hero, introduction, overview grid, principles components"
```

---

### Task 5: FoundationArchitecture + ReferenceStandardsSection

**Files:**
- Create: `apps/website/components/ecosystem/FoundationArchitecture.tsx`
- Create: `apps/website/components/ecosystem/ReferenceStandardsSection.tsx`

- [ ] **Step 1: Create `components/ecosystem/FoundationArchitecture.tsx`**

Pattern: identical to `ScopeBoundary.tsx` (vertical `<ol>` with square markers and connector lines). Read `apps/website/components/reference-standard/ScopeBoundary.tsx` for the exact pattern.

```tsx
import Link from 'next/link';
import type { Route } from 'next';
import { ecosystemContent } from '@/content/ecosystem/ecosystem';

export function FoundationArchitecture() {
  const { chain, callout } = ecosystemContent.foundation;
  return (
    <section
      id="foundation"
      aria-labelledby="foundation-heading"
      className="border-b border-outline-variant bg-surface"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="foundation-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Foundation Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <ol className="relative list-none" aria-label="Foundation authority chain">
            {chain.map((node, i) => (
              <li key={node.id} className="flex gap-4 pb-0">
                <div className="flex flex-col items-center">
                  <div
                    className={[
                      'w-2 h-2 border shrink-0 mt-1',
                      node.id === 'rs-1'
                        ? 'border-secondary bg-secondary'
                        : 'border-outline-variant bg-surface',
                    ].join(' ')}
                  />
                  {i < chain.length - 1 && (
                    <div className="w-px flex-1 min-h-[2rem] bg-outline-variant" />
                  )}
                </div>
                <div className="pb-5">
                  {node.href ? (
                    <Link
                      href={node.href as Route}
                      className="font-mono text-label-caps uppercase tracking-widest font-semibold mb-1 text-secondary hover:underline block"
                    >
                      {node.label}
                    </Link>
                  ) : (
                    <p className="font-mono text-label-caps uppercase tracking-widest font-semibold mb-1 text-on-surface">
                      {node.label}
                    </p>
                  )}
                  <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                    {node.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div
            role="note"
            aria-labelledby="foundation-callout-heading"
            className="border border-outline-variant p-6 self-start"
          >
            <p
              id="foundation-callout-heading"
              className="font-mono text-technical-code text-on-surface leading-relaxed"
            >
              {callout}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/ecosystem/ReferenceStandardsSection.tsx`**

Pattern: horizontal flex row with `sm:border-r` CSS connectors (same as `DevelopmentLifecycle.tsx`). Read `apps/website/components/reference-standard/DevelopmentLifecycle.tsx` for the exact pattern.

```tsx
import Link from 'next/link';
import type { Route } from 'next';
import { ecosystemContent, IMPLEMENTATION_STATUS_LABEL } from '@/content/ecosystem/ecosystem';

export function ReferenceStandardsSection() {
  const { items, callout } = ecosystemContent.referenceStandards;
  return (
    <section
      id="reference-standards"
      aria-labelledby="reference-standards-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="reference-standards-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Reference Standards
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Canonical implementations that demonstrate specification correctness without becoming normative.
        </p>
        <div className="flex flex-col sm:flex-row gap-0 mb-8 border border-outline-variant divide-y sm:divide-y-0 list-none">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={[
                'flex-1 p-6',
                i < items.length - 1 ? 'sm:border-r sm:border-outline-variant' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <p
                className={[
                  'font-mono text-label-caps uppercase tracking-widest mb-1',
                  item.status === 'available' ? 'text-secondary' : 'text-on-surface-variant',
                ].join(' ')}
              >
                {IMPLEMENTATION_STATUS_LABEL[item.status]}
              </p>
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-2">
                {item.href ? (
                  <Link href={item.href as Route} className="hover:text-secondary transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}
              </h3>
              <p className="font-body text-technical-code text-on-surface-variant leading-snug">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div
          role="note"
          aria-labelledby="reference-standards-callout-heading"
          className="border border-outline-variant p-6 max-w-2xl"
        >
          <p
            id="reference-standards-callout-heading"
            className="font-mono text-technical-code text-on-surface leading-relaxed"
          >
            {callout}
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run all current tests**

```bash
cd apps/website && npx vitest run
```

Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add apps/website/components/ecosystem/FoundationArchitecture.tsx apps/website/components/ecosystem/ReferenceStandardsSection.tsx
git commit -m "feat(ecosystem): add FoundationArchitecture and ReferenceStandardsSection"
```

---

### Task 6: CapabilityEcosystem + ProviderEcosystem

**Files:**
- Create: `apps/website/components/ecosystem/CapabilityEcosystem.tsx`
- Create: `apps/website/components/ecosystem/ProviderEcosystem.tsx`

- [ ] **Step 1: Create `components/ecosystem/CapabilityEcosystem.tsx`**

12-domain category grid: 3-col at lg, 2-col at md, 1-col base. Each card: label + description + status badge. Use same `i%3`/`i%2` border logic as `DesignPrinciples.tsx`.

```tsx
import { ecosystemContent, IMPLEMENTATION_STATUS_LABEL } from '@/content/ecosystem/ecosystem';

export function CapabilityEcosystem() {
  const { domains, callout } = ecosystemContent.capabilityEcosystem;
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="border-b border-outline-variant bg-surface"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="capabilities-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Capability Ecosystem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-outline-variant divide-y md:divide-y-0 mb-8">
          {domains.map((domain, i) => (
            <div
              key={domain.id}
              className={[
                'p-6',
                i % 3 !== 2 ? 'lg:border-r border-outline-variant' : '',
                i % 2 === 0 ? 'md:border-r border-outline-variant lg:border-r-0' : '',
                i < 9 ? 'lg:border-b border-outline-variant' : '',
                i < 10 ? 'md:border-b border-outline-variant lg:border-b-0' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <p className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
                {IMPLEMENTATION_STATUS_LABEL[domain.status]}
              </p>
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-2">
                {domain.label}
              </h3>
              <p className="font-body text-technical-code text-on-surface-variant leading-snug">
                {domain.description}
              </p>
            </div>
          ))}
        </div>
        <div
          role="note"
          aria-labelledby="capabilities-callout-heading"
          className="border border-outline-variant p-6 max-w-2xl"
        >
          <p
            id="capabilities-callout-heading"
            className="font-mono text-technical-code text-on-surface leading-relaxed"
          >
            {callout}
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/ecosystem/ProviderEcosystem.tsx`**

Table: Provider Domain / Purpose / Status. Constitutional callout below.

```tsx
import { ecosystemContent, IMPLEMENTATION_STATUS_LABEL } from '@/content/ecosystem/ecosystem';

export function ProviderEcosystem() {
  const { domains, callout } = ecosystemContent.providerEcosystem;
  return (
    <section
      id="providers"
      aria-labelledby="providers-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="providers-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Provider Ecosystem
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full border border-outline-variant border-collapse">
            <thead>
              <tr className="bg-surface-container">
                <th className="text-left p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface border-b border-outline-variant">
                  Provider Domain
                </th>
                <th className="text-left p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface border-b border-outline-variant">
                  Purpose
                </th>
                <th className="text-left p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface border-b border-outline-variant">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {domains.map((domain) => (
                <tr key={domain.id} className="hover:bg-surface-container transition-colors">
                  <td className="p-4 font-mono text-technical-code text-on-surface font-semibold">
                    {domain.label}
                  </td>
                  <td className="p-4 font-body text-body-md text-on-surface-variant">
                    {domain.purpose}
                  </td>
                  <td className="p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface-variant">
                    {IMPLEMENTATION_STATUS_LABEL[domain.status]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          role="note"
          aria-labelledby="providers-callout-heading"
          className="border border-outline-variant p-6 max-w-2xl"
        >
          <p
            id="providers-callout-heading"
            className="font-mono text-technical-code text-on-surface leading-relaxed"
          >
            {callout}
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run all current tests**

```bash
cd apps/website && npx vitest run
```

Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add apps/website/components/ecosystem/CapabilityEcosystem.tsx apps/website/components/ecosystem/ProviderEcosystem.tsx
git commit -m "feat(ecosystem): add CapabilityEcosystem and ProviderEcosystem"
```

---

### Task 7: DeveloperTooling + SDKSection

**Files:**
- Create: `apps/website/components/ecosystem/DeveloperTooling.tsx`
- Create: `apps/website/components/ecosystem/SDKSection.tsx`

- [ ] **Step 1: Create `components/ecosystem/DeveloperTooling.tsx`**

Table: Tool / Purpose / Status. All items planned.

```tsx
import { ecosystemContent, IMPLEMENTATION_STATUS_LABEL } from '@/content/ecosystem/ecosystem';

export function DeveloperTooling() {
  const { tools } = ecosystemContent.tooling;
  return (
    <section
      id="tooling"
      aria-labelledby="tooling-heading"
      className="border-b border-outline-variant bg-surface"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="tooling-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Developer Tooling
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-outline-variant border-collapse">
            <thead>
              <tr className="bg-surface-container">
                <th className="text-left p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface border-b border-outline-variant">
                  Tool
                </th>
                <th className="text-left p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface border-b border-outline-variant">
                  Purpose
                </th>
                <th className="text-left p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface border-b border-outline-variant">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {tools.map((tool) => (
                <tr key={tool.id} className="hover:bg-surface-container transition-colors">
                  <td className="p-4 font-mono text-technical-code text-on-surface font-semibold">
                    {tool.label}
                  </td>
                  <td className="p-4 font-body text-body-md text-on-surface-variant">
                    {tool.purpose}
                  </td>
                  <td className="p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface-variant">
                    {IMPLEMENTATION_STATUS_LABEL[tool.status]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/ecosystem/SDKSection.tsx`**

Table: Language / Status. TypeScript row styled `text-secondary` (foundation-implementation). Note below table.

```tsx
import { ecosystemContent, IMPLEMENTATION_STATUS_LABEL } from '@/content/ecosystem/ecosystem';

export function SDKSection() {
  const { items, note } = ecosystemContent.sdks;
  return (
    <section
      id="sdks"
      aria-labelledby="sdks-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="sdks-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          SDKs
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full border border-outline-variant border-collapse">
            <thead>
              <tr className="bg-surface-container">
                <th className="text-left p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface border-b border-outline-variant">
                  Language
                </th>
                <th className="text-left p-4 font-mono text-label-caps uppercase tracking-widest text-on-surface border-b border-outline-variant">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {items.map((sdk) => (
                <tr key={sdk.id} className="hover:bg-surface-container transition-colors">
                  <td
                    className={[
                      'p-4 font-mono text-technical-code font-semibold',
                      sdk.status === 'foundation-implementation' ? 'text-secondary' : 'text-on-surface',
                    ].join(' ')}
                  >
                    {sdk.language}
                  </td>
                  <td
                    className={[
                      'p-4 font-mono text-label-caps uppercase tracking-widest',
                      sdk.status === 'foundation-implementation' ? 'text-secondary' : 'text-on-surface-variant',
                    ].join(' ')}
                  >
                    {IMPLEMENTATION_STATUS_LABEL[sdk.status]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
          {note}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run all current tests**

```bash
cd apps/website && npx vitest run
```

Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add apps/website/components/ecosystem/DeveloperTooling.tsx apps/website/components/ecosystem/SDKSection.tsx
git commit -m "feat(ecosystem): add DeveloperTooling and SDKSection"
```

---

### Task 8: CommunitySection + RoadmapSection + GetInvolvedSection

**Files:**
- Create: `apps/website/components/ecosystem/CommunitySection.tsx`
- Create: `apps/website/components/ecosystem/RoadmapSection.tsx`
- Create: `apps/website/components/ecosystem/GetInvolvedSection.tsx`

- [ ] **Step 1: Create `components/ecosystem/CommunitySection.tsx`**

Three participation role cards, then 6-link grid. Link list pattern: same as `RSReferences.tsx` (`hover:border-l-2 hover:border-secondary`).

```tsx
import Link from 'next/link';
import type { Route } from 'next';
import { ecosystemContent } from '@/content/ecosystem/ecosystem';

export function CommunitySection() {
  const { participation, links } = ecosystemContent.community;
  return (
    <section
      id="community"
      aria-labelledby="community-heading"
      className="border-b border-outline-variant bg-surface"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="community-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-outline-variant divide-y md:divide-y-0 mb-16">
          {participation.map((role, i) => (
            <div
              key={role.id}
              className={[
                'p-8',
                i < participation.length - 1 ? 'md:border-r border-outline-variant' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-3">
                {role.label}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed mb-4">
                {role.description}
              </p>
              <p className="font-mono text-label-caps uppercase tracking-widest text-secondary">
                {role.callToAction}
              </p>
            </div>
          ))}
        </div>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href as Route}
              className="group flex items-start gap-8 py-6 hover:bg-surface-container transition-colors border-l-2 border-transparent hover:border-secondary pl-4"
            >
              <div>
                <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface group-hover:text-secondary transition-colors mb-2">
                  {link.label}
                </div>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {link.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/ecosystem/RoadmapSection.tsx`**

Horizontal pipeline — identical `sm:border-r` CSS pattern as `DevelopmentLifecycle.tsx`, `<ol>` list. Active milestone uses `text-secondary` label. No `→` text arrows.

```tsx
import { ecosystemContent } from '@/content/ecosystem/ecosystem';

export function RoadmapSection() {
  const { milestones } = ecosystemContent.roadmap;
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="roadmap-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Roadmap
        </h2>
        <ol
          className="flex flex-col sm:flex-row gap-0 border border-outline-variant divide-y sm:divide-y-0 overflow-x-auto list-none"
          aria-label="Ecosystem roadmap milestones"
        >
          {milestones.map((milestone, i) => (
            <li
              key={milestone.id}
              className={[
                'flex-1 p-5 min-w-[140px]',
                i < milestones.length - 1 ? 'sm:border-r sm:border-outline-variant' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <p
                className={[
                  'font-mono text-label-caps uppercase tracking-widest mb-2',
                  milestone.status === 'completed' || milestone.status === 'active'
                    ? 'text-secondary'
                    : 'text-on-surface',
                ].join(' ')}
              >
                {milestone.label}
              </p>
              <p className="font-body text-technical-code text-on-surface-variant leading-snug">
                {milestone.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/ecosystem/GetInvolvedSection.tsx`**

6-card action grid (3-col at lg, 2-col at md). Each card: label + description + Link. Pattern: same as `DesignPrinciples.tsx` grid but with link affordance.

```tsx
import Link from 'next/link';
import type { Route } from 'next';
import { ecosystemContent } from '@/content/ecosystem/ecosystem';

export function GetInvolvedSection() {
  const { actions } = ecosystemContent.getInvolved;
  return (
    <section
      id="get-involved"
      aria-labelledby="get-involved-heading"
      className="border-b border-outline-variant bg-surface"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="get-involved-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Get Involved
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-outline-variant divide-y md:divide-y-0">
          {actions.map((action, i) => (
            <Link
              key={action.id}
              href={action.href as Route}
              className={[
                'group p-8 hover:bg-surface-container transition-colors',
                i % 3 !== 2 ? 'lg:border-r border-outline-variant' : '',
                i % 2 === 0 ? 'md:border-r border-outline-variant lg:border-r-0' : '',
                i < 3 ? 'lg:border-b border-outline-variant' : '',
                i < 4 ? 'md:border-b border-outline-variant lg:border-b-0' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <h3 className="font-headline text-headline-sm font-semibold text-on-surface group-hover:text-secondary transition-colors mb-3">
                {action.label}
              </h3>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run all current tests**

```bash
cd apps/website && npx vitest run
```

Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add apps/website/components/ecosystem/CommunitySection.tsx apps/website/components/ecosystem/RoadmapSection.tsx apps/website/components/ecosystem/GetInvolvedSection.tsx
git commit -m "feat(ecosystem): add CommunitySection, RoadmapSection, GetInvolvedSection"
```

---

### Task 9: app/ecosystem/page.tsx

**Files:**
- Create: `apps/website/app/ecosystem/page.tsx`

- [ ] **Step 1: Create `apps/website/app/ecosystem/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { EcosystemHero } from '@/components/ecosystem/EcosystemHero';
import { EcosystemIntroduction } from '@/components/ecosystem/EcosystemIntroduction';
import { EcosystemOverviewGrid } from '@/components/ecosystem/EcosystemOverviewGrid';
import { EcosystemPrinciples } from '@/components/ecosystem/EcosystemPrinciples';
import { FoundationArchitecture } from '@/components/ecosystem/FoundationArchitecture';
import { ReferenceStandardsSection } from '@/components/ecosystem/ReferenceStandardsSection';
import { CapabilityEcosystem } from '@/components/ecosystem/CapabilityEcosystem';
import { ProviderEcosystem } from '@/components/ecosystem/ProviderEcosystem';
import { DeveloperTooling } from '@/components/ecosystem/DeveloperTooling';
import { SDKSection } from '@/components/ecosystem/SDKSection';
import { CommunitySection } from '@/components/ecosystem/CommunitySection';
import { RoadmapSection } from '@/components/ecosystem/RoadmapSection';
import { GetInvolvedSection } from '@/components/ecosystem/GetInvolvedSection';

export const metadata: Metadata = {
  title: 'Ecosystem — Rohinik Foundation',
  description:
    'An open, specification-driven ecosystem for capability-based AI infrastructure. Specifications, Reference Standards, SDKs, Capabilities, Providers, and Tooling.',
};

export default function EcosystemPage() {
  return (
    <>
      <EcosystemHero />
      <EcosystemIntroduction />
      <EcosystemOverviewGrid />
      <EcosystemPrinciples />
      <FoundationArchitecture />
      <ReferenceStandardsSection />
      <CapabilityEcosystem />
      <ProviderEcosystem />
      <DeveloperTooling />
      <SDKSection />
      <CommunitySection />
      <RoadmapSection />
      <GetInvolvedSection />
    </>
  );
}
```

- [ ] **Step 2: Run all current tests**

```bash
cd apps/website && npx vitest run
```

Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add apps/website/app/ecosystem/page.tsx
git commit -m "feat(ecosystem): add /ecosystem page composition"
```

---

### Task 10: EcosystemPage integration tests

**Files:**
- Create: `apps/website/__tests__/components/ecosystem/EcosystemPage.test.tsx`

- [ ] **Step 1: Write the tests**

Create `apps/website/__tests__/components/ecosystem/EcosystemPage.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import EcosystemPage from '@/app/ecosystem/page';

expect.extend(toHaveNoViolations);

describe('EcosystemPage', () => {
  it('has exactly one H1', () => {
    render(<EcosystemPage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('H1 is "The Ecosystem"', () => {
    render(<EcosystemPage />);
    expect(screen.getByRole('heading', { level: 1, name: /^the ecosystem$/i })).toBeInTheDocument();
  });

  it('all 13 section id attributes present in DOM order', () => {
    render(<EcosystemPage />);
    const sectionIds = [
      'overview',
      'what-is-the-ecosystem',
      'ecosystem-overview',
      'principles',
      'foundation',
      'reference-standards',
      'capabilities',
      'providers',
      'tooling',
      'sdks',
      'community',
      'roadmap',
      'get-involved',
    ];
    const sections = sectionIds.map((id) => document.getElementById(id));
    for (const section of sections) {
      expect(section).toBeTruthy();
    }
    for (let i = 0; i < sections.length - 1; i++) {
      const a = sections[i];
      const b = sections[i + 1];
      if (a && b) {
        expect(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      }
    }
  });

  it('every section has aria-labelledby', () => {
    render(<EcosystemPage />);
    const sections = document.querySelectorAll('section');
    for (const section of sections) {
      expect(section.getAttribute('aria-labelledby')).toBeTruthy();
    }
  });

  it('no dead href="#" links', () => {
    render(<EcosystemPage />);
    const deadLinks = Array.from(document.querySelectorAll('a[href="#"]'));
    expect(deadLinks).toHaveLength(0);
  });

  it('has no axe violations', async () => {
    const { container } = render(<EcosystemPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

- [ ] **Step 2: Run the test**

```bash
cd apps/website && npx vitest run __tests__/components/ecosystem/EcosystemPage.test.tsx
```

Expected: All tests pass.

- [ ] **Step 3: Run full test suite**

```bash
cd apps/website && npx vitest run
```

Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add apps/website/__tests__/components/ecosystem/EcosystemPage.test.tsx
git commit -m "test(ecosystem): add EcosystemPage integration tests"
```

---

### Task 11: Type-check and full test run

**Files:** None

- [ ] **Step 1: Run TypeScript check**

```bash
cd apps/website && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Run full test suite**

```bash
cd apps/website && npx vitest run
```

Expected: All tests pass. Note exact count for the record.

- [ ] **Step 3: If any TypeScript errors, fix them**

Common ecosystem-specific issues:
- `href` values typed as `string` need `as Route` cast: `href={node.href as Route}`
- `ecosystemContent` fields — verify `.hero.graph` passes `EcosystemGraph` type to `EcosystemMap`
- `IMPLEMENTATION_STATUS_LABEL[card.status]` — `status` type must be `ImplementationStatus`, not `string`

- [ ] **Step 4: Commit any fixes**

```bash
git add -p
git commit -m "fix(ecosystem): resolve TypeScript type errors"
```

---

## Self-Review Checklist

After writing, verify against spec `docs/superpowers/specs/2026-07-24-ecosystem-page-design.md`:

- [x] All 13 components implemented with correct section IDs
- [x] `ImplementationStatus` type: 4 values, constants, label record
- [x] `EcosystemGraph`/`EcosystemNode`/`EcosystemEdge` types defined in `types.ts`
- [x] `EcosystemMap`: inline SVG, `role="img"`, `aria-labelledby`, `<title>`, `<desc>`, nodes/edges from props
- [x] `FoundationArchitecture`: 5-node chain, Constitution → Specs → Ref Standards → RS-1 → Community Implementations
- [x] `ReferenceStandardsSection`: RS-1 available + href, RS-2/RS-3 planned + no href
- [x] `CapabilityEcosystem`: 12 domains, all planned, callout
- [x] `ProviderEcosystem`: 8 domains, table, constitutional callout
- [x] `DeveloperTooling`: 8 tools, table
- [x] `SDKSection`: 9 SDKs, TypeScript = foundation-implementation, note below
- [x] `RoadmapSection`: 6 milestones, completed/active styled `text-secondary`, no `→`
- [x] `GetInvolvedSection`: 6 actions, grid with link affordance
- [x] 3 test files: EcosystemPage, EcosystemMap, ImplementationStatus
- [x] No `'use client'`, no rounded corners, no shadows
- [x] Page metadata: `title: 'Ecosystem — Rohinik Foundation'`
- [x] No dead `href="#"` links (check: overview card `#capabilities`, `#providers`, etc. are anchor links on the page itself — valid)

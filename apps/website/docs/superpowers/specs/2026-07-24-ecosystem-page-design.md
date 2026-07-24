# Ecosystem Page Design

> **Status:** Approved  
> **Date:** 2026-07-24  
> **Approach:** Option A+ — single `/ecosystem` page, independently extractable components, strongly typed content model

---

## Goal

Build the `/ecosystem` page for the Rohinik Foundation website. The page reads like an engineering ecosystem specification — similar to Rust, Kubernetes, Linux Foundation, or LLVM. Visitors immediately understand what exists, how it connects, and how they can participate.

## Architecture

### File structure

```
content/ecosystem/
  types.ts          — all interfaces and enums
  ecosystem.ts      — as const satisfies EcosystemContent

components/ecosystem/
  EcosystemHero.tsx
  EcosystemMap.tsx              — SVG diagram, graph-driven
  EcosystemIntroduction.tsx     — narrative: purpose / not section
  EcosystemOverviewGrid.tsx     — 6 overview cards
  EcosystemPrinciples.tsx       — 4 principles cards
  FoundationArchitecture.tsx    — authority chain
  ReferenceStandardsSection.tsx
  CapabilityEcosystem.tsx       — category grid + callout
  ProviderEcosystem.tsx         — domain table + constitutional callout
  DeveloperTooling.tsx          — tooling table
  SDKSection.tsx                — SDK table
  CommunitySection.tsx          — participation + links
  RoadmapSection.tsx            — milestone timeline
  GetInvolvedSection.tsx        — CTA grid

app/ecosystem/
  page.tsx                      — composes all components in order

__tests__/components/ecosystem/
  EcosystemPage.test.tsx
  EcosystemMap.test.tsx
  ImplementationStatus.test.tsx
```

### Page composition order

```tsx
<EcosystemHero />            // id="overview"
<EcosystemIntroduction />    // id="what-is-the-ecosystem"
<EcosystemOverviewGrid />    // id="ecosystem-overview"
<EcosystemPrinciples />      // id="principles"
<FoundationArchitecture />   // id="foundation"
<ReferenceStandardsSection // id="reference-standards"
<CapabilityEcosystem />      // id="capabilities"
<ProviderEcosystem />        // id="providers"
<DeveloperTooling />         // id="tooling"
<SDKSection />               // id="sdks"
<CommunitySection />         // id="community"
<RoadmapSection />           // id="roadmap"
<GetInvolvedSection />       // id="get-involved"
```

All components: sync RSC, no `'use client'`, no rounded corners, no shadows. All styling via Tailwind v4 design tokens only.

---

## Content Model

### `content/ecosystem/types.ts`

```ts
// Implementation maturity — reusable across SDKs, Marketplace, Providers, Tooling, Reference Standards, Packages
export type ImplementationStatus =
  | 'available'
  | 'foundation-implementation'
  | 'in-development'
  | 'planned';

// Ecosystem Map graph types
export interface EcosystemNode {
  readonly id: string;
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly emphasis?: boolean; // true = secondary color stroke
}

export interface EcosystemEdge {
  readonly id: string;
  readonly from: string; // node id
  readonly to: string;   // node id
}

export interface EcosystemGraph {
  readonly nodes: ReadonlyArray<EcosystemNode>;
  readonly edges: ReadonlyArray<EcosystemEdge>;
}

// Section types
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
  readonly label: string;       // Contributing / Maintaining / Organizations
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

// Root content type
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

### `content/ecosystem/ecosystem.ts` — key data decisions

**`ImplementationStatus` values:**
- `'available'` → renders "Available" in `text-secondary`
- `'foundation-implementation'` → renders "Foundation Implementation" in `text-secondary`
- `'in-development'` → renders "In Development" in `text-on-surface`
- `'planned'` → renders "Planned" in `text-on-surface-variant`

**Hero graph nodes** (SVG viewBox 800×480):
- Foundation Constitution (bottom, emphasis=true)
- Specifications, Reference Standards, Architecture (middle tier)
- Rohinik Runtime (center)
- SDKs, Packages, Capabilities, Providers (upper tier)
- Applications (top)

**Foundation authority chain** (FoundationArchitecture section):
```
Foundation Constitution
        ↓
Specifications
        ↓
Reference Standards
        ↓
Reference Implementation (RS-1)
        ↓
Community Implementations
```
Governance is NOT in this chain. Architecture is not a separate node — it is defined by the Specifications.

**Overview cards** (6 items):
Specifications (available) / Reference Standards (available) / Capability Ecosystem (planned) / Provider Ecosystem (planned) / Developer Tooling (planned) / Community (planned)

**Principles** (4):
1. Open by Design
2. Provider Neutral
3. Capability First
4. Specification Driven

**Reference Standards** — modeled as `ReferenceStandardSummary[]`:
- RS-1: `available`, links to `/reference-standards/rs-1`
- RS-2: `planned`, no href
- RS-3: `planned`, no href

**Capability domains** (12): Memory, Intelligence, Search, Reasoning, Vision, Audio, Storage, Networking, Security, Identity, Observability, Scheduling

**Provider domains** (8): LLM Providers, Cloud Platforms, Databases, Search Engines, Messaging Systems, DevOps Platforms, Identity Providers, Observability Platforms

**Tooling** (8): CLI, Package Manager, Compiler, Language Server, Playground, Debugger, Testing Framework, Observability Tools — all `planned`

**SDKs** (9): TypeScript (`foundation-implementation`), Java, Python, Go, Rust, C#, C++, Swift, Kotlin — rest `planned`

**Roadmap milestones** (6): Foundation (`completed`) → Runtime (`active`) → Marketplace (`planned`) → Enterprise (`planned`) → Distributed Runtime (`planned`) → Federation (`planned`)

**Get Involved actions** (6): Read Specifications / Build Capabilities / Publish Packages / Implement a Provider / Become Maintainer / Contribute

---

## Component Specifications

### `EcosystemMap`

```tsx
interface EcosystemMapProps {
  graph: EcosystemGraph;
}
export function EcosystemMap({ graph }: EcosystemMapProps)
```

- Inline `<svg viewBox="0 0 800 480" role="img" aria-labelledby="ecosystem-map-title">`
- `<title id="ecosystem-map-title">Rohinik Ecosystem Architecture Map</title>`
- `<desc>` describing the diagram for screen readers
- Nodes: `<rect>` + `<text>` positioned from `node.x/y/width/height`
- Edges: `<line>` from center of `from` node to center of `to` node
- Emphasis nodes: `stroke` uses `var(--sem-secondary)`, others use `var(--sem-outline-variant)`
- All text: `font-family: var(--font-mono)`, `font-size: 12`
- No JavaScript, no external libraries

### `FoundationArchitecture`

Vertical ordered list with square markers and connector lines. Pattern: identical to `ScopeBoundary` and `ConformanceModel` from RS-1. Last node (Community Implementations) has no connector below it.

### `ReferenceStandardsSection`

Cards in a horizontal flex row (same `sm:border-r` CSS connector pattern as `DevelopmentLifecycle` from RS-1). Each card: label, description, status badge, optional Link to href.

### `CapabilityEcosystem`

Section renamed from "Capability Marketplace". H2: "Capability Ecosystem". 12-domain category grid (3-col at lg, 2-col at md, 1-col base). Each card: label + description + `ImplementationStatus` badge. Callout below grid:

> "The Capability Marketplace will allow verified capabilities to be published, discovered, versioned, and installed. The domains below represent the planned architectural scope of that ecosystem."

### `ProviderEcosystem`

Section renamed from "Providers & Integrations". H2: "Provider Ecosystem". Table: Provider Domain / Purpose / Status. Constitutional callout:

> "Rohinik defines provider contracts, not preferred providers. Any implementation conforming to the published specifications may participate in the ecosystem."

### `SDKSection`

Table: Language / Status. TypeScript row status = "Foundation Implementation" (styled `text-secondary`). Note below table:

> "The Foundation Reference Standards are implemented in TypeScript. Additional SDKs will be developed independently while preserving architectural compatibility with the published specifications."

### `RoadmapSection`

Horizontal pipeline (identical `sm:border-r` CSS pattern, `<ol>` list). 6 milestones. Active milestone highlighted with `text-secondary` label. No `→` text arrows.

### `CommunitySection`

Three participation role cards (Contributing / Maintaining / Organizations), followed by a 6-link grid (GitHub, Discussions, RFCs, Issues, Discord, Blog). Pattern: same as `RSReferences` link list.

### `GetInvolvedSection`

6-card action grid (3-col at lg, 2-col at md). Each card: label + description + Link. Pattern: same as `DesignPrinciples` grid from RS-1 but with link affordance.

---

## `ImplementationStatus` display constants

```ts
// In types.ts or ecosystem.ts — exported for component use
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
```

---

## Testing

### `EcosystemPage.test.tsx`
- Single H1 present
- All 13 section `id` attributes present in DOM order
- Every section has `aria-labelledby`
- No dead `href="#"` links
- No axe violations

### `EcosystemMap.test.tsx`
- SVG element rendered with `role="img"`
- `aria-labelledby` points to existing `<title>` id
- All node labels from graph data rendered
- No hardcoded label strings in component (all from props)
- Node count matches `graph.nodes.length`

### `ImplementationStatus.test.tsx`
- `IMPLEMENTATION_STATUS` constants have correct string values
- `IMPLEMENTATION_STATUS_LABEL` has an entry for every `ImplementationStatus` value
- TypeScript SDK entry status === `'foundation-implementation'`
- All capability domains have `status === 'planned'`
- All provider domains have `status === 'planned'`
- All tooling items have `status === 'planned'`
- Overview cards: Specifications and Reference Standards are `'available'`, rest are `'planned'`
- Roadmap: Foundation milestone status === `'completed'`, Runtime === `'active'`

---

## Design constraints (same as all Foundation pages)

- No `'use client'` anywhere
- No rounded corners on structural elements
- No box shadows
- Tailwind v4 tokens only — no arbitrary hex values
- All grids: `grid-cols-1 md:grid-cols-*` responsive
- All sections: `border-b border-outline-variant`, alternating `bg-surface` / `bg-surface-container-low`
- Metadata: `title: 'Ecosystem — Rohinik Foundation'`

---

## Future extraction path

When a sub-section matures into its own page:
1. The content sub-object (`ecosystem.capabilityEcosystem`) becomes its own `content/capabilities/` file
2. The existing component (`CapabilityEcosystem.tsx`) becomes the hero/overview of the new page
3. The `/ecosystem` page replaces the full section with a summary card linking to the sub-page
4. No refactoring of types needed — `ImplementationStatus`, `CapabilityDomain`, etc. are already in `content/ecosystem/types.ts` and can be re-exported

This preserves zero breaking changes to existing consumers.

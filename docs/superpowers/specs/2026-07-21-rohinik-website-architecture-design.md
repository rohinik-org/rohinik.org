# Rohinik Website Architecture — Version 1.0

**Date:** 2026-07-21
**Status:** Frozen
**Change process:** ADR or governance proposal required for structural changes.

---

## Normative References

| ID | Document |
|---|---|
| DESIGN-0001 | Technical Blueprint (DESIGN.md) — visual design system, tokens, typography, components |
| RS-1 | Rohinik Standard 1 — runtime generation this site documents |

Changes to DESIGN-0001 are versioned independently. This document references it by ID, not by file path.

---

## Overview

rohinik.org is the public home of the Rohinik Foundation. It is an engineering documentation website — not a marketing website. It should feel closer to Rust, LLVM, Kubernetes, or CNCF than to OpenAI or Anthropic.

The website is a separate repository from the Rohinik runtime. Different release cadence, different contributors, different deployment pipeline.

---

## Non-Goals (v1.0)

The following are explicitly out of scope. Contributors must not introduce them without a governance proposal:

- User accounts or authentication
- Server-side database
- CMS or dynamic content editing
- Comment system or user-generated content
- Analytics requiring personal data
- Dynamic search server (all search is client-side from static JSON)

---

## Technology Stack

| Concern | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15, App Router | Static generation, RSC, clean MDX integration |
| Language | TypeScript (strict) | Type-safe content layer is core to this design |
| Styling | Tailwind CSS | All DESIGN-0001 tokens registered in `tailwind.config.ts` |
| MDX | `@next/mdx` | Native App Router integration, no extra dep layer |
| Frontmatter | `gray-matter` + Zod | Typed, validated, build-time hard failures |
| Dark mode | `next-themes` (class strategy) | Uses DESIGN-0001 `inverse-*` token set |
| Syntax highlighting | `shiki` | Matches monospaced blueprint aesthetic |
| Search UI | shadcn/ui `Command` + `Dialog` | Only shadcn components used — rest is custom per DESIGN-0001 |
| Package manager | pnpm + workspace | Ready for future `apps/` expansion |

shadcn/ui is used **only** for: `Command` (search palette `⌘K`), `Dialog` (search modal), `DropdownMenu` (mobile nav). All other components are custom.

---

## Repository Layout

```
rohinik/                              ← separate repo from runtime
├── apps/
│   └── website/
│       ├── app/                      ← Next.js 15 App Router
│       │   ├── (marketing)/          ← home, community, governance shell
│       │   ├── architecture/
│       │   ├── specifications/
│       │   │   └── [version]/[category]/[id]/
│       │   ├── rs-1/
│       │   ├── ecosystem/            ← registry, extensions, packages, skills
│       │   ├── documentation/
│       │   │   └── [...slug]/
│       │   ├── releases/             ← CLI, SDKs, changelogs, checksums
│       │   ├── community/
│       │   └── api/                  ← RSS feed only; search + sitemap are static in public/
│       ├── components/
│       │   ├── layout/
│       │   ├── home/
│       │   ├── spec/
│       │   ├── mdx/
│       │   └── ui/
│       ├── content/
│       │   └── en/                   ← localization-ready from day one
│       │       ├── docs/
│       │       ├── specs/
│       │       │   ├── afs/          assets/ subdirectory per spec (see Asset Pipeline)
│       │       │   ├── adr/
│       │       │   ├── law/
│       │       │   ├── req/
│       │       │   ├── inv/
│       │       │   ├── obs/
│       │       │   ├── sec/
│       │       │   └── ax/
│       │       ├── governance/
│       │       ├── tutorials/
│       │       └── blog/
│       ├── lib/
│       │   ├── content/
│       │   │   ├── schemas.ts        ← Zod schemas per content type
│       │   │   ├── loader.ts         ← reads MDX, parses, validates
│       │   │   ├── parser.ts         ← MDX compilation pipeline
│       │   │   ├── relationships.ts  ← resolves typed edges
│       │   │   └── navigation.ts     ← builds sidebar trees
│       │   ├── graph/
│       │   │   ├── spec-graph.ts     ← specification dependency graph
│       │   │   ├── content-graph.ts  ← full site content graph
│       │   │   └── dependency-graph.ts ← cycle/orphan detection
│       │   └── search.ts             ← builds scoped search indexes
│       ├── styles/
│       │   └── globals.css           ← CSS custom properties for dark mode
│       ├── public/                   ← globally shared assets only
│       └── package.json
├── package.json
└── pnpm-workspace.yaml
```

`apps/registry`, `apps/docs`, `apps/playground` can be added later with zero restructuring.

---

## Information Architecture (Frozen)

Top-level navigation — flat, 9 items, LLVM/Rust style:

```
Home · Architecture · Specifications · Governance · RS-1 · Ecosystem · Documentation · Releases · Community
```

### Canonical URL Rules

| Rule | Value |
|---|---|
| Trailing slash | No |
| Case | Lowercase only |
| Uppercase redirect | Yes (301) |
| ID-based redirect | Optional (for retired slugs) |

### URL and ID Immutability

| Field | Immutability rule |
|---|---|
| `id` | Immutable. Never changes after creation. |
| `slug` | Immutable after spec reaches `Approved`. |
| `title` | May change at any time. Does not affect routing. |

IDs are the stable identity. Slugs are the stable URL. Titles are human-readable labels that can be improved without breaking links.

### Version-aware specification routing

```
/specifications/            → latest stable (RS-1 default)
/specifications/rs-1/...    → pinned to RS-1
/specifications/rs-2/...    → future runtime generation
```

RS-1 is the default. The routing layer must support version prefixes from day one.

---

## Pages

| Route | Type | Content source |
|---|---|---|
| `/` | TSX | Component data from spec-graph + static content |
| `/architecture` | TSX | Hardcoded layer definitions + dynamic status |
| `/specifications` | TSX | Built from spec-graph at build time |
| `/specifications/[version]/[category]/[id]` | MDX + TSX shell | `content/en/specs/` |
| `/governance` | MDX | `content/en/governance/` |
| `/rs-1` | TSX | Aggregated from spec frontmatter |
| `/ecosystem` | TSX | Static + future registry data |
| `/documentation/[...slug]` | MDX | `content/en/docs/` |
| `/releases` | TSX | Static release data |
| `/community` | TSX | Static |

---

## Domain Model

All content is a `ContentNode`. Specific types extend it.

```typescript
type DocumentKind =
  | 'Specification'
  | 'Documentation'
  | 'Governance'
  | 'Tutorial'
  | 'Blog';

// Normative: AFS, LAW, REQ. Informative: tutorials, blog, architecture guides.
type DocumentClassification = 'Normative' | 'Informative';

type DocumentStatus =
  | 'Draft'
  | 'Review'
  | 'Candidate Standard'
  | 'Approved'
  | 'Deprecated'
  | 'Superseded'
  | 'Archived';

// Orthogonal to status — describes maturity for implementors.
type DocumentStability = 'Experimental' | 'Stable' | 'LTS' | 'Legacy';

interface ContentNode {
  id: string;                          // immutable, e.g. "AFS-0001"
  slug: string;                        // immutable after Approved
  title: string;                       // may change
  kind: DocumentKind;
  classification: DocumentClassification;
  category: string;
  status: DocumentStatus;
}

interface SpecOwner {
  type: 'SIG' | 'Foundation' | 'Working Group' | 'Individual';
  value: string;                       // e.g. "Runtime SIG", "Architecture Council"
}

interface SpecHistoryEntry {
  version: string;                     // Major.Minor
  date: string;                        // ISO 8601
  summary: string;                     // one sentence
}

interface Specification extends ContentNode {
  kind: 'Specification';
  version: string;                     // Major.Minor (see Version Semantics)
  stability: DocumentStability;
  stage: string;                       // validated against governance stage pattern
  owner: SpecOwner;
  authors: string[];
  reviewers: string[];
  created: string;                     // ISO 8601
  updated: string;                     // ISO 8601
  summary: string;                     // one paragraph; required
  tags: string[];
  keywords: string[];
  layer: ArchitectureLayer;
  packages: string[];
  history: SpecHistoryEntry[];
  decisions: string[];                 // ADR IDs, e.g. ["ADR-0001", "ADR-0007"]

  // Typed semantic relationships — no catch-all field permitted
  implements: string[];
  depends_on: string[];
  references: string[];
  supersedes: string[];
  superseded_by: string | null;
  see_also: string[];
}

type ArchitectureLayer =
  | 'Foundation'
  | 'Kernel'
  | 'Runtime'
  | 'Intelligence'
  | 'Memory'
  | 'Compiler'
  | 'Shell';
```

### Version Semantics

Specification versions follow `Major.Minor` format. Patch versions are not supported.

| Increment | When to use |
|---|---|
| Major | Incompatible changes to governance structure, interface contracts, or normative requirements |
| Minor | Additive changes: new sections, clarifications, additional examples |

Version `1.0` is the initial publication of every specification.

### Stability vs Status

`status` describes lifecycle position (Draft → Approved → Deprecated). `stability` describes maturity for implementors. They are orthogonal. Example: a spec can be `Approved` + `Experimental` (formally adopted, but the interface is still evolving) or `Approved` + `LTS` (formally adopted, interface frozen for a long period).

---

## Relationship Constraints

| Relationship | Meaning | Cycles allowed |
|---|---|---|
| `implements` | This spec implements another spec's interface or contract | No |
| `depends_on` | This spec requires another spec to be satisfied first | No |
| `references` | Informational reference to another spec | Yes |
| `supersedes` | This spec replaces a prior spec | No |
| `see_also` | Related reading, no formal dependency | Yes |

Build validation enforces cycle rules. Cycles in `implements`, `depends_on`, or `supersedes` break the build.

### ADR Traceability

`decisions: ["ADR-0001", "ADR-0007"]` is machine-readable. The site uses it to:
- Render an "Architectural Decisions" section on each spec page
- Render an "Implemented By" reverse-lookup on each ADR page

---

## Graph Architecture

Graphs are namespaced. Today only `SpecificationGraph` exists. Additional graphs can be added and interconnected without restructuring.

| Graph | Scope | Status |
|---|---|---|
| `SpecificationGraph` | All specifications, typed relationship edges | v1.0 |
| `DocumentationGraph` | Docs, tutorials, blog cross-references | Future |
| `PackageGraph` | Package-to-spec relationships | Future |
| `RuntimeGraph` | Runtime component relationships | Future |

`lib/graph/spec-graph.ts` builds `SpecificationGraph` at build time:

- **Nodes:** every specification (id, slug, status, stability, stage, layer)
- **Edges:** typed by relationship (`implements`, `depends_on`, `references`, `supersedes`, `see_also`)

Powers:
- Related specs panel on each spec page
- Dependency diagrams (SVG, generated)
- RS-1 implementation status dashboard
- Impact analysis for proposed changes
- "Referenced by" reverse lookups
- Automatic changelog generation from `history` entries
- ADR ↔ spec traceability from `decisions` field

---

## Generated Artifacts

All `.gitignore`'d. Rebuilt on every build. Builds are **deterministic**: byte-for-byte identical given identical inputs. JSON output is consistently sorted (IDs alphabetically, keys lexicographically). Graph traversal order is stable.

```
apps/website/.generated/
├── navigation.json          ← sidebar trees per section
├── spec-manifest.json       ← all specs: metadata, relationships, URLs, versions
├── spec-graph.json          ← adjacency list for client-side graph rendering
├── categories.json          ← category metadata + counts
├── search/
│   ├── specs.json
│   ├── docs.json
│   ├── blog.json
│   └── tutorials.json
└── sitemap.json
```

`spec-manifest.json` is the canonical data source for search, navigation, architecture diagrams, and future CLI integrations.

---

## Search API Contract

The search index schema is a contract between the generator (`lib/search.ts`) and the search UI. Both must conform to it.

```typescript
interface SearchEntry {
  id: string;          // spec ID or slug for non-spec content
  title: string;
  url: string;
  summary: string;
  kind: DocumentKind;
  classification: DocumentClassification;
  score?: number;      // populated at query time by client
}
```

**Result ranking priority** (highest to lowest):

1. Exact `id` match (e.g. `AFS-0001`)
2. Title match
3. Keywords match
4. Tags match
5. Summary match
6. Body text match

---

## Asset Pipeline

Spec-specific assets live adjacent to the MDX file, not in `public/`. `public/` is for globally shared assets only (favicon, OG image template, fonts).

```
content/en/specs/afs/
├── 0001.mdx
└── assets/
    ├── runtime.svg
    └── memory-layout.png
```

At build time, assets are copied to the output directory under a path matching the spec's URL. This keeps specifications self-contained and makes it possible to move or version a spec without hunting for orphaned images.

---

## Build Profiles

| Profile | Behavior |
|---|---|
| `development` | Warnings logged, broken links highlighted, soft failures |
| `preview` | Warnings logged, broken links highlighted, hard failures on errors |
| `production` | Zero warnings allowed; any warning is a build failure |

`NODE_ENV` or a `BUILD_PROFILE` env var controls this. Production CI always uses `production` profile.

---

## Build Validation

CI hard failures (build breaks):

**Metadata:**
- Missing required frontmatter fields
- Duplicate spec IDs
- Duplicate slugs
- Invalid `status`, `stability`, `kind`, `classification` (not in enum)
- Invalid `category`, `layer`
- Invalid `stage` format (validated against governance stage pattern)
- Invalid version format (must match `Major.Minor`)
- Duplicate URLs
- Invalid `owner.type`

**Relationships:**
- Any relationship field references a non-existent ID
- Circular `implements`, `depends_on`, or `supersedes` chains
- `decisions` references a non-existent ADR ID

**Content:**
- Empty headings
- Missing page title
- Missing `summary` field
- Invalid code block language identifier
- Duplicate heading anchors

**Navigation:**
- Unreachable pages
- Duplicate navigation entries
- Invalid sidebar references

**CI warnings** (production profile: treated as failures; other profiles: logged):
- Missing examples
- Missing `see_also`
- Missing related specifications
- Pages below minimum content threshold (configurable)
- Missing `history` entry for minor version bumps

---

## Component Architecture

```
components/
├── layout/
│   ├── TopNav.tsx            ← 9-item flat nav, glassmorphism bar
│   ├── Footer.tsx
│   └── DocSidebar.tsx        ← /documentation/* and /specifications/*
├── home/
│   ├── Hero.tsx              ← split: headline+CTA left, arch layer preview right
│   ├── ArchDiagram.tsx       ← stacked horizontal layers, click-to-expand
│   ├── RS1Dashboard.tsx      ← status grid from spec frontmatter
│   ├── SpecsOverview.tsx     ← category cards from spec-graph
│   ├── RepoMap.tsx           ← links to public repositories
│   ├── Roadmap.tsx           ← timeline component per DESIGN-0001
│   └── Ecosystem.tsx         ← drivers, skills, packs, templates, memories
├── spec/
│   ├── SpecCard.tsx          ← grid index card
│   ├── SpecHeader.tsx        ← id, title, version, status, stability, stage, owner badges
│   ├── RelatedDocs.tsx       ← driven by spec-graph typed edges
│   ├── SpecHistory.tsx       ← renders history[] as timeline
│   ├── SpecDecisions.tsx     ← renders decisions[] with ADR reverse-links
│   └── DependencyGraph.tsx   ← SVG from spec-graph
├── mdx/
│   └── components.tsx        ← MDX component overrides (headings, code, table)
└── ui/
    ├── Button.tsx
    ├── Badge.tsx             ← status chips, stability chips, classification chips
    ├── Card.tsx
    └── Timeline.tsx          ← DESIGN-0001: vertical line, square markers
```

---

## Design System Constraints

All UI must comply with DESIGN-0001 (`Technical Blueprint`). Non-negotiable:

- **0px border-radius** on all structural elements (buttons, cards, inputs)
- **No shadows** — depth via 1px `outline-muted` (#76777d33) borders + tonal layering
- **Three fonts only:** Hanken Grotesk (headlines), Inter (body), JetBrains Mono (labels/nav/buttons)
- **JetBrains Mono labels uppercase** always
- **Dot-grid radial-gradient** for large empty areas/hero backgrounds
- **TopAppBar:** `bg-white/90 backdrop-blur-xl`
- **Card hover:** border transitions to `primary` (#000000)
- **Active nav:** `secondary` (#00668a), inactive: `on-surface-variant`

Dark mode uses the DESIGN-0001 `inverse-*` token set exclusively. No new color decisions.

---

## Documentation Governance

Editorial standards for all contributors:

1. Every architectural decision must reference an ADR in the `decisions` field.
2. Every requirement traces to one or more specifications.
3. Specifications prefer diagrams over prose when diagrams improve understanding.
4. `id` is immutable. `slug` is immutable after `Approved`. `title` may change.
5. Catch-all `related:` field is not permitted — use typed relationship fields.
6. Every spec must include a `summary` field (one paragraph).
7. Every version change must include a `history` entry.
8. `owner` must use the structured `{ type, value }` format.
9. Normative documents (AFS, LAW, REQ) must declare `classification: Normative`.

---

## Functional Requirements

- Fully responsive (mobile-first, 3-col → 2-col → 1-col grid)
- WCAG AA accessibility
- Keyboard navigation throughout
- Lighthouse score ≥ 95
- Static generation (SSG via Next.js, deployed to Vercel) — no runtime server; search indexes as static JSON in `public/`
- SEO metadata + Open Graph images per page
- RSS feed for blog and specification updates
- Sitemap generation
- No placeholder lorem ipsum, no fake metrics, no fake testimonials

---

## Observability

Anonymous aggregate metrics (privacy-preserving):
- Most visited specifications
- Failed search queries
- Broken link frequency
- Popular documentation paths

Implementation: Plausible Analytics or equivalent privacy-first tool. Decision required before launch.

---

## Future Expansion Path

Adding new applications requires no restructuring:

```
apps/
├── website/     ← today
├── registry/    ← future
├── docs/        ← future subdomain
├── playground/  ← future
└── dashboard/   ← future
```

`packages/ui` is introduced only when a second consumer of the component library actually exists.

---

## Freeze

This document is frozen as **Rohinik Website Architecture v1.0**.

Future structural changes require an ADR or governance proposal. Implementation details may evolve provided they do not violate this specification.

Structural changes include: adding or removing top-level routes, changing the domain model interfaces, altering the generated artifact schema, modifying the build validation contract, or changing the graph namespace model.

Implementation details include: component internals, styling decisions within DESIGN-0001 constraints, build tooling choices, and library versions.

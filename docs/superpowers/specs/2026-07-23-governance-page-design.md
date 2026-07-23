# Governance Page Design

**Status:** FROZEN — ready for implementation planning
**Date:** 2026-07-23

---

## Goal

Replace the `/governance` stub with the constitutional center of the Rohinik Foundation site. A visitor should understand: who owns architectural authority, how specifications are created, how changes become authoritative, what can and cannot change, how compatibility and conformance are protected, and how to contribute.

This page reinforces one fundamental concept: **architecture is governed, implementations are free, specifications are authoritative, code follows specifications, specifications follow governance.**

---

## Architecture

- **Route:** `app/governance/page.tsx` — async server component (no data fetch; async for convention consistency)
- **Content model:** `content/governance.ts` — all copy and structured data, `as const`
- **Components:** `components/governance/` — one component per section, all server-rendered
- **Tests:** `__tests__/components/governance/` — three test files
- **Zero client components**

### File Map

```
app/governance/page.tsx
content/governance.ts
components/governance/
  GovernanceHero.tsx
  GovernanceAtAGlance.tsx
  GovernancePrinciples.tsx
  AuthorityModel.tsx
  GovernanceLifecycle.tsx
  ChangeProcess.tsx
  RolesResponsibilities.tsx
  CompatibilityRules.tsx
  ConformanceSection.tsx
  ContributionWorkflow.tsx
  GovernanceReferences.tsx
__tests__/components/governance/
  GovernancePage.test.tsx
  AuthorityModel.test.tsx
  ChangeProcess.test.tsx
```

### Page composition (canonical section order)

```tsx
export default async function GovernancePage() {
  return (
    <>
      <GovernanceHero />
      <GovernanceAtAGlance />
      <GovernancePrinciples />
      <AuthorityModel />
      <GovernanceLifecycle />
      <ChangeProcess />
      <RolesResponsibilities />
      <CompatibilityRules />
      <ConformanceSection />
      <ContributionWorkflow />
      <GovernanceReferences />
    </>
  );
}
```

No artificial `await` — page is async for convention, not necessity.

---

## Content Model (`content/governance.ts`)

```typescript
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
      { id: 'constitution',    kind: 'constitutional', label: 'Constitution',         authorityType: 'Constitutional', description: 'Defines immutable architectural laws.' },
      { id: 'board',           kind: 'governance',     label: 'Architecture Board',   authorityType: 'Governance',     description: 'Approves constitutional changes.' },
      { id: 'specifications',  kind: 'normative',      label: 'Specifications',       authorityType: 'Normative',      description: 'Authoritative public contract.' },
      { id: 'rs',              kind: 'reference',      label: 'Reference Standards',  authorityType: 'Reference',      description: 'Define canonical reference and conformance profiles.' },
      { id: 'implementations', kind: 'operational',    label: 'Implementations',      authorityType: 'Operational',    description: 'Free to implement the contract.' },
      { id: 'conformance',     kind: 'verification',   label: 'Conformance',          authorityType: 'Verification',   description: 'Determined against specifications.' },
    ],
  },

  principles: [
    { index: '01', title: 'Specifications precede implementations.',              description: 'No implementation is authoritative before its specification is published.' },
    { index: '02', title: 'Architectural authority is explicit.',                 description: 'Authority flows through defined levels. No implicit escalation.' },
    { index: '03', title: 'Compatibility is preserved deliberately.',             description: 'Every breaking change requires explicit governance approval.' },
    { index: '04', title: 'No implementation may redefine constitutional rules.', description: 'Constitutional laws are immutable outside the constitutional change process.' },
  ],

  authorityModel: [
    {
      id: 'constitution',
      parent: null,
      level: '01',
      name: 'Constitution',
      authority: 'Constitutional',
      owns: ['Immutable architectural laws', 'Constitutional change process'],
      cannot: ['Be amended outside the constitutional process', 'Be overridden by any specification'],
    },
    {
      id: 'board',
      parent: 'constitution',
      level: '02',
      name: 'Architecture Board',
      authority: 'Governance',
      owns: ['Approval of constitutional changes', 'Interpretation of architectural conflicts'],
      cannot: ['Override immutable laws without constitutional process', 'Direct implementation-specific design'],
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
      cannot: ['Claim conformance without satisfying mandatory specifications', 'Redefine normative terms'],
    },
  ],

  // Governance change lifecycle — distinct from specification document status lifecycle
  lifecycle: [
    { id: 'proposal',    stage: 'Proposal',    description: 'A written proposal initiates the governance change.' },
    { id: 'review',      stage: 'Review',      description: 'Architectural and constitutional impact is assessed.' },
    { id: 'decision',    stage: 'Decision',    description: 'Required authority grants or denies approval.' },
    { id: 'publication', stage: 'Publication', description: 'The decision is versioned and publicly recorded.' },
    { id: 'adoption',    stage: 'Adoption',    description: 'Specifications and implementations reflect the change.' },
    { id: 'maintenance', stage: 'Maintenance', description: 'The decision is maintained as an authoritative record.' },
  ],

  changeProcess: [
    { id: 'proposal',       step: '01', name: 'Proposal',            rule: 'A change begins as an explicit written proposal.' },
    { id: 'arch-review',    step: '02', name: 'Architecture Review', rule: 'Compatibility and constitutional impact are assessed.' },
    { id: 'draft',          step: '03', name: 'Draft',               rule: 'Normative language is prepared.' },
    { id: 'approval',       step: '04', name: 'Approval',            rule: 'Required authority grants approval.' },
    { id: 'publication',    step: '05', name: 'Publication',         rule: 'The authoritative document is versioned and released.' },
    { id: 'implementation', step: '06', name: 'Implementation',      rule: 'Implementations may adopt the published change.' },
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
    // PATCH omitted — not yet confirmed in authoritative governance text (AFS-0001 v1.0)
    versioning: [
      { id: 'major', level: 'Major', rule: 'Breaking changes to constitutional, invariant, or mandatory content.' },
      { id: 'minor', level: 'Minor', rule: 'Compatible additions that do not weaken existing requirements.' },
    ],
    evolution: [
      { id: 'deprecated', level: 'Deprecated', rule: 'Retained for reference; supersession path defined.' },
      { id: 'superseded', level: 'Superseded', rule: 'Replaced by a newer authoritative document.' },
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
      { id: 'discussion',     step: '01', name: 'Open Discussion' },
      { id: 'proposal',       step: '02', name: 'Proposal' },
      { id: 'specification',  step: '03', name: 'Specification' },
      { id: 'review',         step: '04', name: 'Review' },
      { id: 'approval',       step: '05', name: 'Approval' },
      { id: 'implementation', step: '06', name: 'Implementation' },
      { id: 'release',        step: '07', name: 'Release' },
    ],
    links: [
      { id: 'contribution-guide', label: 'Contribution Guide', href: '/documentation',                description: 'How to submit proposals and improvements.' },
      { id: 'architecture',       label: 'Architecture',       href: '/architecture',                 description: 'Understand the system you are contributing to.' },
      { id: 'specifications',     label: 'Specifications',     href: '/specifications',               description: 'Read the authoritative requirements.' },
      { id: 'github',             label: 'GitHub',             href: 'https://github.com/rohinik-org', description: 'Source, issues, and pull requests.' },
    ],
  },

  references: [
    { id: 'architecture',   label: 'Architecture',   href: '/architecture',   description: 'Understand the layered system.' },
    { id: 'specifications', label: 'Specifications', href: '/specifications', description: 'Read authoritative documents.' },
    { id: 'rs-1',           label: 'RS-1',           href: '/rs-1',           description: 'Reference implementation.' },
    { id: 'documentation',  label: 'Documentation',  href: '/documentation',  description: 'Implementation guides.' },
  ],
} as const;
```

### Content model invariant

`authorityModel` is the only structure whose `parent` relationships carry semantic meaning. All other arrays preserve ordering only. No component should infer hierarchy from array position in any other array.

Every non-null `parent` must resolve to an existing `authorityModel` record. No parent chain may contain a cycle. Exactly one record must have `parent === null` (the root: `constitution`).

---

## Component Specifications

### GovernanceHero

- `<section id="overview" aria-labelledby="governance-heading">`
- H1 (`id="governance-heading"`) from `hero.title`
- Eyebrow: `hero.eyebrow` (mono caps, secondary color)
- Description paragraph
- `hero.register` rendered as `<dl>` with four `<div>` items — each term is a label, each definition is a short fixed description derived at render time
- Dot-grid radial-gradient background (same as SpecificationsHero)
- Border-bottom

### GovernanceAtAGlance

- `<section id="at-a-glance" aria-labelledby="at-a-glance-heading">`
- H2 heading: "Governance at a Glance"
- Horizontal rail on desktop: 6 bordered nodes with `border` connectors (not `→` text characters) between them
- Each node layout (top to bottom): `authorityType` (mono caps label, secondary color), `label` (mono bold), `description` (technical-code, muted)
- `kind` field available for future styling; not used visually in first release
- Collapses to vertical single-column on mobile — connectors hidden on mobile
- Light bg (`bg-surface-container-low`)

### GovernancePrinciples

- `<section id="principles" aria-labelledby="principles-heading">`
- H2 heading
- 2×2 grid on desktop, 1-col on mobile
- Each principle: `index` (mono, `aria-hidden="true"` — decorative), `title` (headline-sm bold), `description` (body)
- Bordered grid cells, `divide-y` / `divide-x`
- Matches Homepage principles visual pattern

### AuthorityModel

- `<section id="authority" aria-labelledby="authority-heading">`
- H2 heading
- Semantic `<ol>` — 7 levels, vertical chain with connecting line and square markers
- Each level has a stable anchor: `id="authority-{record.id}"` (e.g. `#authority-constitution`, `#authority-board`)
- Each item: `level` number (mono, decorative), `name` (headline-sm), `authority` label (mono caps secondary)
- Below name: two sub-sections as `<dl>`: **Owns** (list) / **Cannot** (list)
- `parent` field not rendered — used only in tests
- Dark surface or `bg-surface-container-low` to give weight

### GovernanceLifecycle

- `<section id="lifecycle" aria-labelledby="lifecycle-heading">`
- H2 heading
- Semantic `<ol>` — 6 stages
- Horizontal bordered strip on desktop (same grammar as SpecificationLifecycle): each stage = `stage` name (mono caps), `description` (technical-code)
- Vertical stack on mobile
- Uses `id` fields for stable references

### ChangeProcess

- `<section id="change-process" aria-labelledby="change-process-heading">`
- H2 heading
- Semantic `<ol>` — 6 steps
- 2-col grid per row: left = `step` number + `name` (mono), right = `rule` (body)
- `divide-y` bordered rows
- `<aside aria-labelledby="governance-callout-heading">` below the list:
  ```
  "Code never becomes authoritative first. Specifications do."
  ```
- `aside` uses border, no background color change

### RolesResponsibilities

- `<section id="roles" aria-labelledby="roles-heading">`
- H2 heading
- `divide-y` bordered rows, one per role
- Each row: `name` (mono caps), `authority` label (mono caps secondary), then two sub-columns: **Owns** list / **Supports** list
- No names of people, no org chart, no photos

### CompatibilityRules

- `<section id="compatibility" aria-labelledby="compatibility-heading">`
- H2 heading
- Two sub-sections:
  - **Version Semantics** (H3): `compatibility.versioning` — desktop `<table>` with columns Level / Rule; mobile stacked rows
  - **Specification Evolution** (H3): `compatibility.evolution` — bordered `divide-y` register rows (not a table — only 2 items, not tabular)
- Table includes `<caption class="sr-only">`

### ConformanceSection

- `<section id="conformance" aria-labelledby="conformance-heading">`
- H2 heading
- `conformance.statement` in prominent bordered callout (`bg-surface-container-low`)
- `conformance.chain` as vertical chain with square markers and connecting line (same pattern as AuthorityHierarchy) — 4 items
- `conformance.chainNote` as a paragraph below the chain
- No claims about specific test suites

### ContributionWorkflow

- `<section id="contribution" aria-labelledby="contribution-heading">`
- H2 heading
- Side-by-side bordered panels on desktop:
  - Left: **Contribute to Specifications** — `specificationWorkflow` as `<ol>` with step numbers and names
  - Right: **Resources** — `links` as `divide-y` rows with label, description, `→`
- On mobile: vertical stack, workflow panel first
- No rounded corners, no promotional card styling

### GovernanceReferences

- `<section id="related" aria-labelledby="related-heading">`
- H2 heading: "Continue through the foundation."
- Same pattern as `SpecificationReferences` — `divide-y` bordered `<Link>` rows with `→` arrows
- 4 items from `references[]`

---

## Tests

### GovernancePage.test.tsx

- Exactly one H1
- H1 text matches "Architecture evolves through explicit decisions" (case-insensitive)
- All 10 section headings present: "Governance at a Glance", "Governance Principles", "Authority Model", "Governance Lifecycle", "Change Process", "Roles and Responsibilities", "Compatibility Rules", "Conformance", "Contribute", "Continue through the foundation."
- Canonical DOM order of sections (overview → at-a-glance → principles → authority → lifecycle → change-process → roles → compatibility → conformance → contribution → related)
- Every `<section>` has `aria-labelledby`
- No `href="#"` dead links
- Full-page axe

### AuthorityModel.test.tsx

- Renders 7 authority levels
- Exact order: Constitution → Architecture Board → Foundation Specification → Architectural Specifications → Runtime Specifications → Reference Implementation → Third-party Implementations
- Exactly one record has `parent === null` (Constitution is the unique root)
- Every non-null `parent` resolves to an existing `authorityModel.id` (no dangling references)
- No cycles in parent chain (depth-first traversal terminates for all nodes)
- Each level renders Owns and Cannot content
- Semantic `<ol>`
- Axe

### ChangeProcess.test.tsx

- Exactly 6 steps rendered
- Step numbers are sequential: 01, 02, 03, 04, 05, 06
- Publication step precedes Implementation step in DOM order
- No step text implies code becomes authoritative before Publication
- Governance callout `<aside>` contains "Specifications do" (or equivalent)
- Semantic `<ol>`
- Axe

---

## Validation Checklist

- No `'use client'` in any component
- No hex colors (`#xxxxxx`) in component or page files
- No `shadow-*`, `drop-shadow`, `gradient` classes
- No `rounded-*` classes
- No fake contributors or invented governance bodies
- No dead links (`href="#"`)
- No `→` characters as connector elements in GovernanceAtAGlance (use CSS borders/pseudo-elements)
- `aria-hidden="true"` on decorative index numbers (principles)
- `<ol>` for lifecycle, change process, contribution workflow
- `<aside>` for the governance callout in ChangeProcess
- Stable anchors on each authority level (`id="authority-{id}"`)
- Version Semantics uses `<table>` with `<caption class="sr-only">`
- Specification Evolution uses bordered rows (not a table)

---

## Definition of Done

- [ ] Governance hero rendered
- [ ] Governance at a glance panel rendered
- [ ] Governance principles rendered
- [ ] Authority hierarchy rendered with stable anchors
- [ ] Governance lifecycle explained
- [ ] Change process rendered with callout aside
- [ ] Roles and responsibilities documented
- [ ] Compatibility rules documented (versioning table + evolution register)
- [ ] Conformance explained with chain and note
- [ ] Contribution workflow rendered (side-by-side panels)
- [ ] Related resources added
- [ ] Server-rendered, zero client components
- [ ] DESIGN-0001 compliant (no hex, no shadows, no gradients, no rounded corners)
- [ ] Accessible (aria-labelledby on every section, ol for ordered content, aside for callout)
- [ ] Responsive (mobile single-column, desktop multi-column where specified)
- [ ] All three test files passing
- [ ] Typecheck passing
- [ ] Lint passing
- [ ] Build passing

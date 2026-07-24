# Specifications Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/specifications` placeholder with an authoritative registry page that displays the specification corpus, identifier taxonomy, authority hierarchy, ADR preview, and lifecycle rules.

**Architecture:** All components are server-rendered. Content lives in `content/specifications.ts` (static copy) and `lib/specifications/registry.ts` (typed registry fixture, designed for future generated-manifest replacement). The page route calls `getSpecificationRegistry()` and passes the result as props — zero client components in the first release.

**Tech Stack:** Next.js 15 App Router, React 19 server components, Tailwind CSS v4 (design tokens only), Vitest + Testing Library + jest-axe, TypeScript strict.

---

## File Map

| File | Role |
|---|---|
| `lib/specifications/types.ts` | Canonical types: `SpecificationRecord`, `SpecificationStatus`, `SpecificationAuthority` |
| `lib/specifications/registry.ts` | `getSpecificationRegistry()` — returns typed fixture, ready for generated-manifest swap |
| `content/specifications.ts` | Static copy: hero, corpusTerms, families, identifierTaxonomy, authorityChain, adrs, lifecycle, versioning, references |
| `app/specifications/page.tsx` | Route — async server component, calls registry, composes all sections |
| `components/specifications/SpecificationsHero.tsx` | Hero: eyebrow, H1, description, computed stats from registry |
| `components/specifications/CorpusSummary.tsx` | `<dl>` of four corpus terms |
| `components/specifications/SpecificationRegistry.tsx` | H2 + table of specification records |
| `components/specifications/SpecificationFamilies.tsx` | Bordered rows: AFS / ADR / RS families |
| `components/specifications/AuthorityHierarchy.tsx` | Ordered chain LAW→ERR with connecting rule |
| `components/specifications/IdentifierTaxonomy.tsx` | Table: prefix / meaning / authority / stability + permanence callout |
| `components/specifications/DecisionRecordPreview.tsx` | ADR compact register; no dead CTAs |
| `components/specifications/SpecificationLifecycle.tsx` | Status chain + versioning rules |
| `components/specifications/SpecificationReferences.tsx` | Four bordered reference rows |
| `__tests__/components/specifications/SpecificationsPage.test.tsx` | Page composition tests |
| `__tests__/components/specifications/SpecificationRegistry.test.tsx` | Registry invariant tests |
| `__tests__/components/specifications/AuthorityHierarchy.test.tsx` | Hierarchy order tests |
| `__tests__/components/specifications/IdentifierTaxonomy.test.tsx` | Taxonomy render + axe |

---

## Task 1: Types and registry

**Files:**
- Create: `apps/website/lib/specifications/types.ts`
- Create: `apps/website/lib/specifications/registry.ts`
- Test: `apps/website/__tests__/components/specifications/SpecificationRegistry.test.tsx`

- [ ] **Step 1: Write failing registry tests**

```typescript
// apps/website/__tests__/components/specifications/SpecificationRegistry.test.tsx
import { describe, expect, it } from 'vitest';
import { getSpecificationRegistry } from '@/lib/specifications/registry';

describe('getSpecificationRegistry', () => {
  it('returns a non-empty array', async () => {
    const specs = await getSpecificationRegistry();
    expect(specs.length).toBeGreaterThan(0);
  });

  it('contains unique specification identifiers', async () => {
    const specs = await getSpecificationRegistry();
    const ids = specs.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contains unique slugs', async () => {
    const specs = await getSpecificationRegistry();
    const slugs = specs.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every record has a non-empty version', async () => {
    const specs = await getSpecificationRegistry();
    for (const spec of specs) {
      expect(spec.version.length).toBeGreaterThan(0);
    }
  });

  it('every status is a recognised value', async () => {
    const ALLOWED = ['draft', 'review', 'candidate', 'frozen', 'deprecated', 'superseded'];
    const specs = await getSpecificationRegistry();
    for (const spec of specs) {
      expect(ALLOWED).toContain(spec.status);
    }
  });

  it('every authority is a recognised value', async () => {
    const ALLOWED = ['constitutional', 'foundational', 'architectural', 'normative', 'informative', 'operational'];
    const specs = await getSpecificationRegistry();
    for (const spec of specs) {
      expect(ALLOWED).toContain(spec.authority);
    }
  });

  it('normative records have an authority set', async () => {
    const specs = await getSpecificationRegistry();
    for (const spec of specs.filter((s) => s.normative)) {
      expect(spec.authority.length).toBeGreaterThan(0);
    }
  });

  it('publishes AFS-0001 as frozen version 1.0', async () => {
    const specs = await getSpecificationRegistry();
    const afs = specs.find(({ id }) => id === 'AFS-0001');
    expect(afs).toMatchObject({ version: '1.0', status: 'frozen', normative: true });
  });

  it('every href starts with /specifications/', async () => {
    const specs = await getSpecificationRegistry();
    for (const spec of specs) {
      expect(spec.href).toMatch(/^\/specifications\//);
    }
  });

  it('no specification is simultaneously frozen and superseded', async () => {
    const specs = await getSpecificationRegistry();
    for (const spec of specs) {
      expect(spec.status === 'frozen' && spec.supersededBy.length > 0).toBe(false);
    }
  });

  it('publishedAt uses ISO date format when present', async () => {
    const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;
    const specs = await getSpecificationRegistry();
    for (const spec of specs) {
      if (spec.publishedAt) expect(spec.publishedAt).toMatch(ISO_RE);
      if (spec.updatedAt) expect(spec.updatedAt).toMatch(ISO_RE);
    }
  });
});
```

- [ ] **Step 2: Run to confirm they fail**

```bash
cd apps/website && pnpm test -- --reporter=verbose 2>&1 | grep -A3 "SpecificationRegistry"
```
Expected: FAIL — `Cannot find module '@/lib/specifications/registry'`

- [ ] **Step 3: Create types**

```typescript
// apps/website/lib/specifications/types.ts
export type SpecificationStatus =
  | 'draft'
  | 'review'
  | 'candidate'
  | 'frozen'
  | 'deprecated'
  | 'superseded';

export type SpecificationAuthority =
  | 'constitutional'
  | 'foundational'
  | 'architectural'
  | 'normative'
  | 'informative'
  | 'operational';

export interface SpecificationRecord {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly family: string;
  readonly summary: string;
  readonly version: string;
  readonly status: SpecificationStatus;
  readonly authority: SpecificationAuthority;
  readonly publishedAt?: string;
  readonly updatedAt?: string;
  readonly normative: boolean;
  readonly href: string;
  readonly dependsOn: readonly string[];
  readonly supersedes: readonly string[];
  readonly supersededBy: readonly string[];
  readonly identifierClasses: readonly string[];
  readonly tags: readonly string[];
}
```

- [ ] **Step 4: Create registry**

```typescript
// apps/website/lib/specifications/registry.ts
// ponytail: typed fixture — replace with generated manifest at apps/website/.generated/specifications.json when content pipeline lands
import type { SpecificationRecord } from './types';

const FIXTURE: readonly SpecificationRecord[] = [
  {
    id: 'AFS-0001',
    slug: 'afs-0001',
    title: 'Rohinik Foundation Specification',
    family: 'AFS',
    summary:
      'Defines the constitutional laws, architectural foundations, canonical terminology, runtime responsibilities, requirements, lifecycle rules, security constraints, and governance model of Rohinik.',
    version: '1.0',
    status: 'frozen',
    authority: 'constitutional',
    publishedAt: '2026-07-14',
    updatedAt: '2026-07-14',
    normative: true,
    href: '/specifications/afs-0001',
    dependsOn: [],
    supersedes: [],
    supersededBy: [],
    identifierClasses: ['LAW', 'AX', 'P', 'DEF', 'INV', 'L', 'R', 'REQ', 'SEC', 'OBS', 'NOTE', 'BP', 'EX', 'ERR'],
    tags: ['foundation', 'architecture', 'runtime', 'governance', 'conformance'],
  },
];

export async function getSpecificationRegistry(): Promise<readonly SpecificationRecord[]> {
  return FIXTURE;
}
```

- [ ] **Step 5: Run tests — expect pass**

```bash
cd apps/website && pnpm test -- --reporter=verbose 2>&1 | grep -A3 "SpecificationRegistry"
```
Expected: all 11 tests pass.

- [ ] **Step 6: Commit**

```bash
git add apps/website/lib/specifications/types.ts apps/website/lib/specifications/registry.ts apps/website/__tests__/components/specifications/SpecificationRegistry.test.tsx
git commit -m "feat(website): specifications — typed registry with AFS-0001 fixture"
```

---

## Task 2: Content model

**Files:**
- Create: `apps/website/content/specifications.ts`

- [ ] **Step 1: Write the content module**

```typescript
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
    { prefix: 'LAW', name: 'Constitutional laws', description: 'Fundamental, immutable platform laws.' },
    { prefix: 'AX', name: 'Architectural axioms', description: 'Near-immutable foundational truths.' },
    { prefix: 'P', name: 'Architectural principles', description: 'Near-immutable design principles.' },
    { prefix: 'INV', name: 'Conformance invariants', description: 'Near-immutable conformance rules.' },
    { prefix: 'R', name: 'Runtime responsibilities', description: 'Stable layer ownership definitions.' },
    { prefix: 'DEF', name: 'Canonical definitions', description: 'Stable canonical terminology.' },
    { prefix: 'REQ', name: 'Normative requirements', description: 'Evolving normative obligations.' },
    { prefix: 'SEC', name: 'Security constraints', description: 'Evolving security requirements.' },
    { prefix: 'L', name: 'Lifecycle definitions', description: 'Stable lifecycle semantics.' },
    { prefix: 'OBS', name: 'Observations', description: 'Informative; not requirements.' },
    { prefix: 'NOTE', name: 'Notes', description: 'Clarifies normative content; adds no requirements.' },
    { prefix: 'BP', name: 'Best practices', description: 'Guidance; not requirements.' },
    { prefix: 'EX', name: 'Examples', description: 'Illustrative; not normative.' },
    { prefix: 'ERR', name: 'Error definitions', description: 'Operational error classifications.' },
  ],

  identifierTaxonomy: [
    { prefix: 'LAW', meaning: 'Fundamental laws', authority: 'Constitutional', stability: 'Immutable' },
    { prefix: 'AX', meaning: 'Architectural axioms', authority: 'Foundational', stability: 'Near-immutable' },
    { prefix: 'P', meaning: 'Architectural principles', authority: 'Architectural', stability: 'Near-immutable' },
    { prefix: 'DEF', meaning: 'Canonical definitions', authority: 'Canonical', stability: 'Stable' },
    { prefix: 'INV', meaning: 'Conformance invariants', authority: 'Conformance', stability: 'Near-immutable' },
    { prefix: 'L', meaning: 'Lifecycle definitions', authority: 'Lifecycle', stability: 'Stable' },
    { prefix: 'R', meaning: 'Runtime responsibilities', authority: 'Definitional', stability: 'Stable' },
    { prefix: 'REQ', meaning: 'Normative requirements', authority: 'Normative', stability: 'Evolves' },
    { prefix: 'SEC', meaning: 'Security constraints', authority: 'Security', stability: 'Evolves' },
    { prefix: 'OBS', meaning: 'Observations', authority: 'Informative', stability: 'Evolves' },
    { prefix: 'NOTE', meaning: 'Normative clarification notes', authority: 'Informative', stability: 'Evolves' },
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
```

- [ ] **Step 2: Typecheck**

```bash
cd apps/website && pnpm typecheck 2>&1 | head -20
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/website/content/specifications.ts
git commit -m "feat(website): specifications content model"
```

---

## Task 3: Page composition tests (failing first)

**Files:**
- Create: `apps/website/__tests__/components/specifications/SpecificationsPage.test.tsx`

- [ ] **Step 1: Write failing page tests**

```typescript
// apps/website/__tests__/components/specifications/SpecificationsPage.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SpecificationsPage from '@/app/specifications/page';

expect.extend(toHaveNoViolations);

describe('SpecificationsPage', () => {
  it('renders exactly one H1', async () => {
    render(await SpecificationsPage());
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('H1 identifies the page as the public contract', async () => {
    render(await SpecificationsPage());
    expect(
      screen.getByRole('heading', { level: 1, name: /public contract of the Rohinik platform/i }),
    ).toBeInTheDocument();
  });

  it('renders the specification registry heading', async () => {
    render(await SpecificationsPage());
    expect(screen.getByRole('heading', { name: /specification registry/i })).toBeInTheDocument();
  });

  it('renders the authority hierarchy heading', async () => {
    render(await SpecificationsPage());
    expect(screen.getByRole('heading', { name: /authority hierarchy/i })).toBeInTheDocument();
  });

  it('renders the identifier taxonomy heading', async () => {
    render(await SpecificationsPage());
    expect(screen.getByRole('heading', { name: /identifier.*taxonomy|taxonomy.*identifier/i })).toBeInTheDocument();
  });

  it('renders the specification lifecycle heading', async () => {
    render(await SpecificationsPage());
    expect(screen.getByRole('heading', { name: /specification lifecycle/i })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(await SpecificationsPage());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

- [ ] **Step 2: Run to confirm they fail**

```bash
cd apps/website && pnpm test -- --reporter=verbose 2>&1 | grep -A5 "SpecificationsPage"
```
Expected: FAIL — cannot find module `@/app/specifications/page` that exports the right structure.

- [ ] **Step 3: Commit failing tests**

```bash
git add apps/website/__tests__/components/specifications/SpecificationsPage.test.tsx
git commit -m "test(website): failing specifications page composition tests"
```

---

## Task 4: SpecificationsHero

**Files:**
- Create: `apps/website/components/specifications/SpecificationsHero.tsx`
- Test: `apps/website/__tests__/components/specifications/SpecificationsPage.test.tsx` (already written)

- [ ] **Step 1: Create component**

```tsx
// apps/website/components/specifications/SpecificationsHero.tsx
import { specificationsContent } from '@/content/specifications';
import type { SpecificationRecord } from '@/lib/specifications/types';

interface SpecificationsHeroProps {
  specifications: readonly SpecificationRecord[];
}

export function SpecificationsHero({ specifications }: SpecificationsHeroProps) {
  const { hero } = specificationsContent;

  const frozenCount = specifications.filter((s) => s.status === 'frozen').length;
  const familySet = new Set(specifications.map((s) => s.family));
  const identifierClassCount = specifications.flatMap((s) => s.identifierClasses).filter(
    (v, i, a) => a.indexOf(v) === i,
  ).length;

  return (
    <section
      id="overview"
      aria-labelledby="specifications-heading"
      className="border-b border-outline-variant bg-[radial-gradient(var(--color-outline-variant)_1px,transparent_1px)] bg-[size:24px_24px]"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-6">
          {hero.eyebrow}
        </p>
        <h1
          id="specifications-heading"
          className="font-headline text-headline-lg-mobile md:text-headline-xl font-bold text-on-surface mb-6 leading-tight tracking-tight max-w-5xl"
        >
          {hero.title}
        </h1>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          {hero.description}
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-outline-variant divide-y sm:divide-y-0 sm:divide-x divide-outline-variant">
          <div className="py-6 sm:pr-8">
            <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-2">
              Frozen Documents
            </dt>
            <dd className="font-mono text-headline-md font-bold text-on-surface">
              {String(frozenCount).padStart(2, '0')}
            </dd>
          </div>
          <div className="py-6 sm:px-8">
            <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-2">
              Active Families
            </dt>
            <dd className="font-mono text-headline-md font-bold text-on-surface">
              {String(familySet.size).padStart(2, '0')}
            </dd>
          </div>
          <div className="py-6 sm:pl-8">
            <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-2">
              Identifier Classes
            </dt>
            <dd className="font-mono text-headline-md font-bold text-on-surface">
              {String(identifierClassCount).padStart(2, '0')}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: No separate test needed** — covered by SpecificationsPage.test.tsx H1 tests. Run all:

```bash
cd apps/website && pnpm test -- --reporter=verbose 2>&1 | grep -A3 "SpecificationsPage"
```
Still FAIL — page route not updated yet.

---

## Task 5: CorpusSummary

**Files:**
- Create: `apps/website/components/specifications/CorpusSummary.tsx`

- [ ] **Step 1: Create component**

```tsx
// apps/website/components/specifications/CorpusSummary.tsx
import { specificationsContent } from '@/content/specifications';

export function CorpusSummary() {
  const { corpusTerms } = specificationsContent;
  return (
    <section aria-labelledby="corpus-summary-heading" className="border-b border-outline-variant">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="corpus-summary-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Specification Corpus
        </h2>
        <dl className="grid border-y border-outline-variant lg:grid-cols-4">
          {corpusTerms.map((item, i) => (
            <div
              key={item.term}
              className={[
                'py-7',
                i < corpusTerms.length - 1 ? 'border-b border-outline-variant lg:border-b-0 lg:border-r lg:px-7' : 'lg:px-7',
              ].join(' ')}
            >
              <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-4">
                {item.term}
              </dt>
              <dd className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

---

## Task 6: SpecificationRegistry

**Files:**
- Create: `apps/website/components/specifications/SpecificationRegistry.tsx`
- Test: `apps/website/__tests__/components/specifications/SpecificationsPage.test.tsx`

- [ ] **Step 1: Create component**

```tsx
// apps/website/components/specifications/SpecificationRegistry.tsx
import Link from 'next/link';
import type { SpecificationRecord, SpecificationStatus } from '@/lib/specifications/types';

interface SpecificationRegistryProps {
  specifications: readonly SpecificationRecord[];
}

const STATUS_CLASSES: Record<SpecificationStatus, string> = {
  frozen: 'border border-on-surface text-on-surface',
  draft: 'border border-dashed border-on-surface-variant text-on-surface-variant',
  review: 'border border-outline-variant text-on-surface-variant',
  candidate: 'border border-secondary text-secondary',
  deprecated: 'border border-outline-variant text-on-surface-variant line-through',
  superseded: 'border border-outline-variant text-on-surface-variant opacity-60',
};

function SpecificationStatus({ status }: { status: SpecificationStatus }) {
  return (
    <span
      className={[
        'font-mono text-label-caps uppercase tracking-widest px-2 py-1 inline-block',
        STATUS_CLASSES[status],
      ].join(' ')}
    >
      {status}
    </span>
  );
}

export function SpecificationRegistry({ specifications }: SpecificationRegistryProps) {
  return (
    <section
      id="registry"
      aria-labelledby="registry-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="registry-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Specification Registry
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          The authoritative list of published specification documents.
        </p>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border border-outline-variant" aria-label="Specification registry">
            <caption className="sr-only">Published Rohinik specifications</caption>
            <thead>
              <tr className="border-b border-outline-variant">
                {['ID', 'Specification', 'Version', 'Status', 'Authority'].map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {specifications.map((spec) => (
                <tr key={spec.id} className="hover:bg-surface-container transition-colors">
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface px-4 py-4 whitespace-nowrap">
                    {spec.id}
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-headline text-headline-sm font-semibold text-on-surface mb-1">
                      <Link href={spec.href} className="hover:text-secondary transition-colors">
                        {spec.title}
                      </Link>
                    </div>
                    <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                      {spec.summary}
                    </p>
                  </td>
                  <td className="font-mono text-label-caps text-on-surface-variant px-4 py-4 whitespace-nowrap">
                    {spec.version}
                  </td>
                  <td className="px-4 py-4">
                    <SpecificationStatus status={spec.status} />
                  </td>
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant px-4 py-4 capitalize">
                    {spec.authority}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked records */}
        <div className="lg:hidden divide-y divide-outline-variant border-t border-outline-variant">
          {specifications.map((spec) => (
            <article
              key={spec.id}
              aria-labelledby={`spec-${spec.slug}-title`}
              className="py-6"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                  {spec.id}
                </span>
                <SpecificationStatus status={spec.status} />
              </div>
              <h3
                id={`spec-${spec.slug}-title`}
                className="font-headline text-headline-sm font-semibold text-on-surface mb-1"
              >
                <Link href={spec.href} className="hover:text-secondary transition-colors">
                  {spec.title}
                </Link>
              </h3>
              <p className="font-mono text-technical-code text-on-surface-variant mb-3">
                Version {spec.version}
              </p>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed mb-4">
                {spec.summary}
              </p>
              <dl className="grid grid-cols-2 gap-3">
                <div>
                  <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
                    Authority
                  </dt>
                  <dd className="font-mono text-label-caps uppercase tracking-widest text-on-surface capitalize">
                    {spec.authority}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
                    Normative
                  </dt>
                  <dd className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                    {spec.normative ? 'Yes' : 'No'}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Task 7: SpecificationFamilies

**Files:**
- Create: `apps/website/components/specifications/SpecificationFamilies.tsx`

- [ ] **Step 1: Create component**

```tsx
// apps/website/components/specifications/SpecificationFamilies.tsx
import { specificationsContent } from '@/content/specifications';

export function SpecificationFamilies() {
  const { families } = specificationsContent;
  return (
    <section
      id="families"
      aria-labelledby="families-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="families-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Specification Families
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Document families group related specifications by scope and purpose.
        </p>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {families.map((family) => (
            <div
              key={family.id}
              className="grid grid-cols-1 md:grid-cols-[6rem_1fr] gap-4 md:gap-8 py-6"
            >
              <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                {family.id}
              </div>
              <div>
                <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-2">
                  {family.title}
                </div>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {family.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Task 8: AuthorityHierarchy + tests

**Files:**
- Create: `apps/website/components/specifications/AuthorityHierarchy.tsx`
- Create: `apps/website/__tests__/components/specifications/AuthorityHierarchy.test.tsx`

- [ ] **Step 1: Write failing hierarchy tests**

```typescript
// apps/website/__tests__/components/specifications/AuthorityHierarchy.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AuthorityHierarchy } from '@/components/specifications/AuthorityHierarchy';

expect.extend(toHaveNoViolations);

const EXPECTED_ORDER = ['LAW', 'AX', 'P', 'INV', 'R', 'DEF', 'REQ', 'SEC', 'L', 'OBS', 'NOTE', 'BP', 'EX', 'ERR'];

describe('AuthorityHierarchy', () => {
  it('renders a heading containing "authority hierarchy"', () => {
    render(<AuthorityHierarchy />);
    expect(screen.getByRole('heading', { name: /authority hierarchy/i })).toBeInTheDocument();
  });

  it('renders all 14 identifier prefixes', () => {
    render(<AuthorityHierarchy />);
    for (const prefix of EXPECTED_ORDER) {
      expect(screen.getByText(prefix)).toBeInTheDocument();
    }
  });

  it('renders prefixes in canonical AFS-0001 order', () => {
    render(<AuthorityHierarchy />);
    const items = screen.getAllByRole('listitem');
    const prefixes = items
      .map((li) => {
        const match = EXPECTED_ORDER.find((p) => li.textContent?.includes(p));
        return match ?? null;
      })
      .filter(Boolean);
    expect(prefixes).toEqual(EXPECTED_ORDER);
  });

  it('LAW is labelled as highest authority', () => {
    render(<AuthorityHierarchy />);
    expect(screen.getByText(/highest authority/i)).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<AuthorityHierarchy />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

- [ ] **Step 2: Run to confirm fail**

```bash
cd apps/website && pnpm test -- --reporter=verbose 2>&1 | grep -A3 "AuthorityHierarchy"
```
Expected: FAIL — component does not exist.

- [ ] **Step 3: Create component**

```tsx
// apps/website/components/specifications/AuthorityHierarchy.tsx
import { specificationsContent } from '@/content/specifications';

export function AuthorityHierarchy() {
  const { authorityChain } = specificationsContent;
  return (
    <section
      id="authority"
      aria-labelledby="authority-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="authority-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Authority Hierarchy
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Identifier precedence flows downward only. A lower-authority requirement cannot override
          a constitutional law.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-6">
              Highest Authority
            </p>
            <ol className="relative" aria-label="Authority hierarchy from highest to lowest">
              {authorityChain.map((item, i) => (
                <li key={item.prefix} className="flex gap-4 pb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 border border-on-surface bg-surface mt-1 shrink-0" />
                    {i < authorityChain.length - 1 && (
                      <div className="w-px flex-1 min-h-[2rem] bg-outline-variant" />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                        {item.prefix}
                      </span>
                      <span className="font-body text-technical-code text-on-surface-variant">
                        {item.name}
                      </span>
                    </div>
                    <p className="font-body text-technical-code text-on-surface-variant">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mt-2">
              Lowest Architectural Precedence
            </p>
          </div>
          <div className="border-t border-outline-variant lg:border-t-0 lg:border-l lg:pl-12 pt-8 lg:pt-0">
            <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-6">
              Normative versus Informative
            </h3>
            <div className="space-y-6">
              <div className="border border-outline-variant p-6">
                <p className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3">
                  Normative
                </p>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  Defines obligations, invariants, requirements, lifecycle semantics, or security
                  constraints that affect conformance.
                </p>
              </div>
              <div className="border border-outline-variant p-6">
                <p className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3">
                  Informative
                </p>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  Provides observation, explanation, guidance, examples, or implementation context
                  without adding requirements. OBS must not be interpreted as a requirement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
cd apps/website && pnpm test -- --reporter=verbose 2>&1 | grep -A5 "AuthorityHierarchy"
```
Expected: all 5 pass.

- [ ] **Step 5: Commit**

```bash
git add apps/website/components/specifications/AuthorityHierarchy.tsx apps/website/__tests__/components/specifications/AuthorityHierarchy.test.tsx
git commit -m "feat(website): AuthorityHierarchy — canonical LAW→ERR chain with normative/informative panel"
```

---

## Task 9: IdentifierTaxonomy + tests

**Files:**
- Create: `apps/website/components/specifications/IdentifierTaxonomy.tsx`
- Create: `apps/website/__tests__/components/specifications/IdentifierTaxonomy.test.tsx`

- [ ] **Step 1: Write failing tests**

```typescript
// apps/website/__tests__/components/specifications/IdentifierTaxonomy.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { IdentifierTaxonomy } from '@/components/specifications/IdentifierTaxonomy';

expect.extend(toHaveNoViolations);

describe('IdentifierTaxonomy', () => {
  it('renders a heading containing "identifier taxonomy"', () => {
    render(<IdentifierTaxonomy />);
    expect(screen.getByRole('heading', { name: /identifier.*taxonomy|taxonomy.*identifier/i })).toBeInTheDocument();
  });

  it('renders a semantic table', () => {
    render(<IdentifierTaxonomy />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('table has 14 data rows', () => {
    render(<IdentifierTaxonomy />);
    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');
    // 1 thead + 14 data rows
    expect(rows).toHaveLength(15);
  });

  it('LAW appears in the first data row', () => {
    render(<IdentifierTaxonomy />);
    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');
    expect(rows[1]).toHaveTextContent('LAW');
  });

  it('ERR appears in the last data row', () => {
    render(<IdentifierTaxonomy />);
    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');
    expect(rows[14]).toHaveTextContent('ERR');
  });

  it('shows identifier permanence callout', () => {
    render(<IdentifierTaxonomy />);
    expect(screen.getByText(/permanent references/i)).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<IdentifierTaxonomy />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

- [ ] **Step 2: Run to confirm fail**

```bash
cd apps/website && pnpm test -- --reporter=verbose 2>&1 | grep -A3 "IdentifierTaxonomy"
```
Expected: FAIL.

- [ ] **Step 3: Create component**

```tsx
// apps/website/components/specifications/IdentifierTaxonomy.tsx
import { specificationsContent } from '@/content/specifications';

export function IdentifierTaxonomy() {
  const { identifierTaxonomy } = specificationsContent;
  return (
    <section
      id="identifiers"
      aria-labelledby="identifiers-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="identifiers-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Identifier Taxonomy
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-8">
          Each identifier prefix denotes a distinct class of specification statement. Prefixes are
          stable references — not document section labels.
        </p>

        {/* Permanence callout */}
        <div className="border border-outline-variant p-6 mb-10 bg-surface-container-low">
          <p className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-2">
            Identifier Stability
          </p>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Published identifiers are permanent references. Deprecation does not delete or renumber
            them. Frozen identifiers remain resolvable indefinitely.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table
            className="w-full border border-outline-variant"
            aria-label="Identifier taxonomy"
          >
            <caption className="sr-only">
              Rohinik identifier prefix taxonomy — 14 classes from LAW to ERR
            </caption>
            <thead>
              <tr className="border-b border-outline-variant">
                {['Prefix', 'Meaning', 'Authority', 'Stability'].map((col) => (
                  <th
                    key={col}
                    scope="col"
                    className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {identifierTaxonomy.map((row) => (
                <tr key={row.prefix} className="hover:bg-surface-container transition-colors">
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface px-4 py-3">
                    {row.prefix}
                  </td>
                  <td className="font-body text-body-md text-on-surface-variant px-4 py-3">
                    {row.meaning}
                  </td>
                  <td className="font-mono text-technical-code text-on-surface-variant px-4 py-3">
                    {row.authority}
                  </td>
                  <td className="font-mono text-technical-code text-on-surface-variant px-4 py-3">
                    {row.stability}
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

- [ ] **Step 4: Run tests**

```bash
cd apps/website && pnpm test -- --reporter=verbose 2>&1 | grep -A5 "IdentifierTaxonomy"
```
Expected: all 7 pass.

- [ ] **Step 5: Commit**

```bash
git add apps/website/components/specifications/IdentifierTaxonomy.tsx apps/website/__tests__/components/specifications/IdentifierTaxonomy.test.tsx
git commit -m "feat(website): IdentifierTaxonomy — 14-row table with permanence callout"
```

---

## Task 10: DecisionRecordPreview

**Files:**
- Create: `apps/website/components/specifications/DecisionRecordPreview.tsx`

- [ ] **Step 1: Create component**

```tsx
// apps/website/components/specifications/DecisionRecordPreview.tsx
import { specificationsContent } from '@/content/specifications';

export function DecisionRecordPreview() {
  const { adrs } = specificationsContent;
  return (
    <section
      id="decisions"
      aria-labelledby="decisions-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="decisions-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Architectural Decision Records
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          ADRs explain why significant architectural decisions were made. They are distinct from
          normative specifications — an ADR records rationale, not obligations.
        </p>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {adrs.map((adr) => (
            <div
              key={adr.id}
              className="grid grid-cols-1 md:grid-cols-[7rem_1fr] gap-2 md:gap-8 py-5"
            >
              <span className="font-mono text-label-caps uppercase tracking-widest text-secondary">
                {adr.id}
              </span>
              <span className="font-body text-body-md text-on-surface">{adr.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Task 11: SpecificationLifecycle

**Files:**
- Create: `apps/website/components/specifications/SpecificationLifecycle.tsx`

- [ ] **Step 1: Create component**

```tsx
// apps/website/components/specifications/SpecificationLifecycle.tsx
import { specificationsContent } from '@/content/specifications';

export function SpecificationLifecycle() {
  const { lifecycle, versioningRules } = specificationsContent;
  return (
    <section
      id="lifecycle"
      aria-labelledby="lifecycle-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="lifecycle-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Specification Lifecycle
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Specification maturity progresses through defined stages. Document lifecycle status is
          independent of runtime lifecycle semantics.
        </p>

        {/* Status chain */}
        <div className="flex flex-col sm:flex-row gap-0 mb-16 border border-outline-variant divide-y sm:divide-y-0 sm:divide-x divide-outline-variant overflow-x-auto">
          {lifecycle.map((stage, i) => (
            <div key={stage.status} className="flex-1 p-5 min-w-[120px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                  {stage.status}
                </span>
                {i < lifecycle.length - 1 && (
                  <span className="hidden sm:inline font-mono text-label-caps text-on-surface-variant">
                    →
                  </span>
                )}
              </div>
              <p className="font-body text-technical-code text-on-surface-variant leading-snug">
                {stage.description}
              </p>
            </div>
          ))}
        </div>

        {/* Versioning rules */}
        <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-6">
          Versioning Rules
        </h3>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {versioningRules.map((v) => (
            <div
              key={v.level}
              className="grid grid-cols-1 md:grid-cols-[6rem_1fr] gap-2 md:gap-8 py-5"
            >
              <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                {v.level}
              </span>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {v.rule}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Task 12: SpecificationReferences

**Files:**
- Create: `apps/website/components/specifications/SpecificationReferences.tsx`

- [ ] **Step 1: Create component**

```tsx
// apps/website/components/specifications/SpecificationReferences.tsx
import Link from 'next/link';
import type { Route } from 'next';
import { specificationsContent } from '@/content/specifications';

export function SpecificationReferences() {
  const { references } = specificationsContent;
  return (
    <section
      id="related"
      aria-labelledby="related-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="related-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Continue through the foundation.
        </h2>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {references.map((ref) => (
            <Link
              key={ref.href}
              href={ref.href as Route}
              className="group flex items-start justify-between gap-8 py-6 hover:bg-surface-container transition-colors px-0"
            >
              <div>
                <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface group-hover:text-secondary transition-colors mb-2">
                  {ref.label}
                </div>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {ref.description}
                </p>
              </div>
              <span className="font-mono text-label-caps text-on-surface-variant group-hover:text-secondary transition-colors shrink-0 mt-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Task 13: Minimal AFS-0001 detail route

**Files:**
- Create: `apps/website/app/specifications/afs-0001/page.tsx`

The registry links `/specifications/afs-0001`. This must not be a dead link.

- [ ] **Step 1: Create minimal valid detail page**

```tsx
// apps/website/app/specifications/afs-0001/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AFS-0001 — Rohinik Foundation Specification',
};

export default function AFS0001Page() {
  return (
    <main id="main-content">
      <section className="border-b border-outline-variant">
        <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
          <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-6">
            AFS-0001
          </p>
          <h1 className="font-headline text-headline-lg-mobile md:text-headline-xl font-bold text-on-surface mb-6 leading-tight tracking-tight">
            Rohinik Foundation Specification
          </h1>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-outline-variant pt-8 mb-12">
            {[
              { label: 'Version', value: '1.0' },
              { label: 'Status', value: 'Frozen' },
              { label: 'Authority', value: 'Constitutional' },
              { label: 'Normative', value: 'Yes' },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
                  {label}
                </dt>
                <dd className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed max-w-2xl mb-8">
            The full specification document is available through the governance and documentation
            channels. This page will host the structured specification content when the content
            pipeline is complete.
          </p>
          <Link
            href="/specifications"
            className="font-mono text-label-caps uppercase tracking-widest text-secondary hover:text-on-surface transition-colors"
          >
            ← Back to Specifications
          </Link>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify route resolves**

```bash
cd apps/website && pnpm build 2>&1 | grep "afs-0001"
```
Expected: `/specifications/afs-0001` listed in build output.

- [ ] **Step 3: Commit**

```bash
git add apps/website/app/specifications/afs-0001/page.tsx
git commit -m "feat(website): minimal AFS-0001 detail route — prevents dead registry link"
```

---

## Task 14: Compose the page route

**Files:**
- Modify: `apps/website/app/specifications/page.tsx`

- [ ] **Step 1: Replace the placeholder**

```tsx
// apps/website/app/specifications/page.tsx
import type { Metadata } from 'next';
import { AuthorityHierarchy } from '@/components/specifications/AuthorityHierarchy';
import { CorpusSummary } from '@/components/specifications/CorpusSummary';
import { DecisionRecordPreview } from '@/components/specifications/DecisionRecordPreview';
import { IdentifierTaxonomy } from '@/components/specifications/IdentifierTaxonomy';
import { SpecificationFamilies } from '@/components/specifications/SpecificationFamilies';
import { SpecificationLifecycle } from '@/components/specifications/SpecificationLifecycle';
import { SpecificationReferences } from '@/components/specifications/SpecificationReferences';
import { SpecificationRegistry } from '@/components/specifications/SpecificationRegistry';
import { SpecificationsHero } from '@/components/specifications/SpecificationsHero';
import { getSpecificationRegistry } from '@/lib/specifications/registry';

export const metadata: Metadata = {
  title: 'Specifications',
  description:
    'Browse the authoritative Rohinik specification corpus, identifier taxonomy, authority hierarchy, and architectural decision records.',
};

export default async function SpecificationsPage() {
  const specifications = await getSpecificationRegistry();

  return (
    <>
      <SpecificationsHero specifications={specifications} />
      <CorpusSummary />
      <SpecificationRegistry specifications={specifications} />
      <SpecificationFamilies />
      <AuthorityHierarchy />
      <IdentifierTaxonomy />
      <DecisionRecordPreview />
      <SpecificationLifecycle />
      <SpecificationReferences />
    </>
  );
}
```

- [ ] **Step 2: Run all specification tests**

```bash
cd apps/website && pnpm test -- --reporter=verbose 2>&1 | grep -E "specifications|SpecificationsPage|AuthorityHierarchy|IdentifierTaxonomy|SpecificationRegistry"
```
Expected: all tests in `__tests__/components/specifications/` pass.

- [ ] **Step 3: Typecheck**

```bash
cd apps/website && pnpm typecheck 2>&1 | head -20
```
Expected: no errors.

- [ ] **Step 4: Lint**

```bash
cd apps/website && pnpm lint 2>&1 | head -20
```
Expected: no errors.

- [ ] **Step 5: Commit all remaining components + page**

```bash
git add \
  apps/website/app/specifications/page.tsx \
  apps/website/components/specifications/SpecificationsHero.tsx \
  apps/website/components/specifications/CorpusSummary.tsx \
  apps/website/components/specifications/SpecificationRegistry.tsx \
  apps/website/components/specifications/SpecificationFamilies.tsx \
  apps/website/components/specifications/DecisionRecordPreview.tsx \
  apps/website/components/specifications/SpecificationLifecycle.tsx \
  apps/website/components/specifications/SpecificationReferences.tsx
git commit -m "feat(website): specifications page — registry, families, ADR preview, lifecycle, references"
```

---

## Task 15: Build verification

**Files:** None created — validation only.

- [ ] **Step 1: Run full test suite**

```bash
cd apps/website && pnpm test 2>&1 | tail -10
```
Expected: all test files pass, total count ≥ 155 tests.

- [ ] **Step 2: Production build**

```bash
cd apps/website && pnpm build 2>&1 | tail -20
```
Expected: `/specifications` and `/specifications/afs-0001` appear in route list, no build errors.

- [ ] **Step 3: Validate no client components introduced**

```bash
rg "'use client'|\"use client\"" apps/website/components/specifications/
```
Expected: No output.

- [ ] **Step 4: Validate no hex colors or shadows**

```bash
rg "#[0-9a-fA-F]{3,8}" apps/website/components/specifications/ apps/website/app/specifications/
rg "shadow-|drop-shadow|gradient" apps/website/components/specifications/ apps/website/app/specifications/
```
Expected: No output from either command.

- [ ] **Step 5: Validate no dead links**

```bash
rg "href=\"#\"" apps/website/components/specifications/
```
Expected: No output.

- [ ] **Step 6: Final commit**

```bash
git add apps/website
git commit -m "chore(website): specifications page — build verified, all checks pass"
```
Only create this commit if there are actually unstaged changes. If nothing is outstanding, skip.

---

## Self-Review

**Spec coverage:**
- ✅ Sections 1–3: types + registry + route
- ✅ Section 4: SpecificationsHero with computed stats
- ✅ Section 5: CorpusSummary with `<dl>` semantic markup
- ✅ Section 6: SpecificationRegistry — desktop table + mobile stacked
- ✅ Section 7: SpecificationStatus component (inline in SpecificationRegistry)
- ✅ Section 8: Registry controls deferred (only 1 record — spec says server-only initially)
- ✅ Section 9: SpecificationFamilies
- ✅ Section 10: AuthorityHierarchy with LAW→ERR chain + highest/lowest labels
- ✅ Section 11: IdentifierTaxonomy table + permanence callout
- ✅ Section 12: Normative vs informative panel inside AuthorityHierarchy
- ✅ Section 13: DecisionRecordPreview — 5 ADRs, no dead CTA (no `/decisions` route yet)
- ✅ Section 14: SpecificationLifecycle with status chain + versioning rules
- ✅ Section 15: SpecificationRow — handled inline in SpecificationRegistry
- ✅ Section 16: AFS-0001 detail route (Task 13) — prevents dead link
- ✅ Section 17: SpecificationReferences — 4 bordered rows
- ✅ Section 18: Content model matches spec exactly
- ✅ Section 19: Responsive — mobile layout in SpecificationRegistry stacked records
- ✅ Section 20: All components server-only; no `'use client'` in first release
- ✅ Section 21: 4 test files, registry invariants, hierarchy order, taxonomy row count, axe
- ✅ Sections 22–23: Validation commands in Task 15

**Type consistency check:**
- `SpecificationRecord` defined in `lib/specifications/types.ts` — used consistently in `registry.ts`, `SpecificationsHero`, `SpecificationRegistry`
- `SpecificationStatus` used in `STATUS_CLASSES` map and `SpecificationStatus` component — both reference the same type
- `getSpecificationRegistry()` returns `Promise<readonly SpecificationRecord[]>` — page calls it with `await`, passes result as `specifications` prop — prop types match

**No placeholders found.**

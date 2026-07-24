# Governance Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/governance` stub with a fully-composed, accessible, zero-client-component governance page that explains who owns architectural authority, how changes become authoritative, what can and cannot change, and how to contribute.

**Architecture:** Static server-rendered Next.js 15 page. Content lives in `content/governance.ts` (`as const`). Eleven components in `components/governance/`. Three test files in `__tests__/components/governance/`. Page route is `app/governance/page.tsx`.

**Tech Stack:** Next.js 15 App Router, React 19 server components, TypeScript strict, Tailwind CSS v4 design tokens, Vitest + Testing Library + jest-axe.

---

## File Map

| Action | Path |
|--------|------|
| Create | `content/governance.ts` |
| Create | `__tests__/components/governance/GovernancePage.test.tsx` |
| Create | `__tests__/components/governance/AuthorityModel.test.tsx` |
| Create | `__tests__/components/governance/ChangeProcess.test.tsx` |
| Create | `components/governance/GovernanceHero.tsx` |
| Create | `components/governance/GovernanceAtAGlance.tsx` |
| Create | `components/governance/GovernancePrinciples.tsx` |
| Create | `components/governance/AuthorityModel.tsx` |
| Create | `components/governance/GovernanceLifecycle.tsx` |
| Create | `components/governance/ChangeProcess.tsx` |
| Create | `components/governance/RolesResponsibilities.tsx` |
| Create | `components/governance/CompatibilityRules.tsx` |
| Create | `components/governance/ConformanceSection.tsx` |
| Create | `components/governance/ContributionWorkflow.tsx` |
| Create | `components/governance/GovernanceReferences.tsx` |
| Replace | `app/governance/page.tsx` |

---

## Task 1: Content Model

**Files:**
- Create: `apps/website/content/governance.ts`

- [ ] **Step 1: Write the content file**

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
      { id: 'contribution-guide', label: 'Contribution Guide', href: '/documentation',                 description: 'How to submit proposals and improvements.' },
      { id: 'architecture',       label: 'Architecture',       href: '/architecture',                  description: 'Understand the system you are contributing to.' },
      { id: 'specifications',     label: 'Specifications',     href: '/specifications',                description: 'Read the authoritative requirements.' },
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

- [ ] **Step 2: Commit**

```bash
git add apps/website/content/governance.ts
git commit -m "feat(governance): add content model"
```

---

## Task 2: Failing Page Composition Tests

**Files:**
- Create: `apps/website/__tests__/components/governance/GovernancePage.test.tsx`

- [ ] **Step 1: Write the failing test file**

```typescript
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import GovernancePage from '@/app/governance/page';

expect.extend(toHaveNoViolations);

describe('GovernancePage', () => {
  it('has exactly one H1', () => {
    render(<GovernancePage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('H1 matches governance title', () => {
    render(<GovernancePage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /architecture evolves through explicit decisions/i }),
    ).toBeInTheDocument();
  });

  it('renders all section headings', () => {
    render(<GovernancePage />);
    const headings = [
      /governance at a glance/i,
      /governance principles/i,
      /authority model/i,
      /governance lifecycle/i,
      /change process/i,
      /roles and responsibilities/i,
      /compatibility rules/i,
      /conformance/i,
      /contribute/i,
      /continue through the foundation/i,
    ];
    for (const pattern of headings) {
      expect(screen.getByRole('heading', { name: pattern })).toBeInTheDocument();
    }
  });

  it('sections are in canonical DOM order', () => {
    render(<GovernancePage />);
    const sectionIds = [
      'overview',
      'at-a-glance',
      'principles',
      'authority',
      'lifecycle',
      'change-process',
      'roles',
      'compatibility',
      'conformance',
      'contribution',
      'related',
    ];
    const sections = sectionIds.map((id) => document.getElementById(id));
    for (const section of sections) {
      expect(section).toBeTruthy();
    }
    // Verify DOM order by comparing positions
    for (let i = 0; i < sections.length - 1; i++) {
      const a = sections[i]!;
      const b = sections[i + 1]!;
      expect(
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });

  it('every section has aria-labelledby', () => {
    render(<GovernancePage />);
    const sections = document.querySelectorAll('section');
    for (const section of sections) {
      expect(section.getAttribute('aria-labelledby')).toBeTruthy();
    }
  });

  it('no dead href="#" links', () => {
    render(<GovernancePage />);
    const links = document.querySelectorAll('a[href="#"]');
    expect(links).toHaveLength(0);
  });

  it('has no axe violations', async () => {
    const { container } = render(<GovernancePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

- [ ] **Step 2: Run tests — verify they fail**

```bash
cd apps/website && npx vitest run __tests__/components/governance/GovernancePage.test.tsx
```

Expected: FAIL (GovernancePage renders the old stub, not the new components)

- [ ] **Step 3: Commit failing tests**

```bash
git add apps/website/__tests__/components/governance/GovernancePage.test.tsx
git commit -m "test(governance): add failing page composition tests"
```

---

## Task 3: Failing AuthorityModel Tests

**Files:**
- Create: `apps/website/__tests__/components/governance/AuthorityModel.test.tsx`

- [ ] **Step 1: Write the failing test file**

```typescript
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AuthorityModel } from '@/components/governance/AuthorityModel';
import { governanceContent } from '@/content/governance';

expect.extend(toHaveNoViolations);

const EXPECTED_ORDER = [
  'Constitution',
  'Architecture Board',
  'Foundation Specification',
  'Architectural Specifications',
  'Runtime Specifications',
  'Reference Implementation',
  'Third-party Implementations',
];

describe('AuthorityModel', () => {
  it('renders 7 authority levels', () => {
    render(<AuthorityModel />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(7);
  });

  it('renders levels in correct order', () => {
    render(<AuthorityModel />);
    const items = screen.getAllByRole('listitem');
    const names = items.map((li) => {
      for (const name of EXPECTED_ORDER) {
        if (li.textContent?.includes(name)) return name;
      }
      return null;
    });
    expect(names).toEqual(EXPECTED_ORDER);
  });

  it('exactly one record has parent === null (Constitution is unique root)', () => {
    const roots = governanceContent.authorityModel.filter((r) => r.parent === null);
    expect(roots).toHaveLength(1);
    expect(roots[0]!.id).toBe('constitution');
  });

  it('every non-null parent resolves to an existing id', () => {
    const ids = new Set(governanceContent.authorityModel.map((r) => r.id));
    for (const record of governanceContent.authorityModel) {
      if (record.parent !== null) {
        expect(ids.has(record.parent)).toBe(true);
      }
    }
  });

  it('no cycles in parent chain', () => {
    const parentMap = new Map(
      governanceContent.authorityModel.map((r) => [r.id, r.parent]),
    );
    for (const record of governanceContent.authorityModel) {
      const visited = new Set<string>();
      let current: string | null = record.id;
      while (current !== null) {
        expect(visited.has(current)).toBe(false);
        visited.add(current);
        current = parentMap.get(current) ?? null;
      }
    }
  });

  it('each level renders Owns and Cannot content', () => {
    render(<AuthorityModel />);
    // All Owns and Cannot headings present
    const ownsHeadings = screen.getAllByText(/owns/i);
    const cannotHeadings = screen.getAllByText(/cannot/i);
    expect(ownsHeadings.length).toBeGreaterThanOrEqual(7);
    expect(cannotHeadings.length).toBeGreaterThanOrEqual(7);
  });

  it('uses a semantic ol element', () => {
    render(<AuthorityModel />);
    const ol = document.querySelector('ol');
    expect(ol).toBeInTheDocument();
  });

  it('each level has a stable anchor id', () => {
    render(<AuthorityModel />);
    for (const record of governanceContent.authorityModel) {
      const el = document.getElementById(`authority-${record.id}`);
      expect(el).toBeInTheDocument();
    }
  });

  it('has no axe violations', async () => {
    const { container } = render(<AuthorityModel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

- [ ] **Step 2: Run — verify fail**

```bash
cd apps/website && npx vitest run __tests__/components/governance/AuthorityModel.test.tsx
```

Expected: FAIL (component doesn't exist yet)

- [ ] **Step 3: Commit**

```bash
git add apps/website/__tests__/components/governance/AuthorityModel.test.tsx
git commit -m "test(governance): add failing AuthorityModel tests"
```

---

## Task 4: Failing ChangeProcess Tests

**Files:**
- Create: `apps/website/__tests__/components/governance/ChangeProcess.test.tsx`

- [ ] **Step 1: Write the failing test file**

```typescript
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ChangeProcess } from '@/components/governance/ChangeProcess';

expect.extend(toHaveNoViolations);

describe('ChangeProcess', () => {
  it('renders exactly 6 steps', () => {
    render(<ChangeProcess />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(6);
  });

  it('step numbers are sequential 01-06', () => {
    render(<ChangeProcess />);
    for (const n of ['01', '02', '03', '04', '05', '06']) {
      expect(screen.getByText(n)).toBeInTheDocument();
    }
  });

  it('Publication step precedes Implementation step in DOM order', () => {
    render(<ChangeProcess />);
    const pub = screen.getByText('Publication').closest('li')!;
    const impl = screen.getByText('Implementation').closest('li')!;
    expect(
      pub.compareDocumentPosition(impl) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('governance callout aside contains the specifications-first message', () => {
    render(<ChangeProcess />);
    const aside = document.querySelector('aside');
    expect(aside).toBeInTheDocument();
    expect(aside!.textContent).toMatch(/specifications do/i);
  });

  it('uses a semantic ol element', () => {
    render(<ChangeProcess />);
    const ol = document.querySelector('ol');
    expect(ol).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<ChangeProcess />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

- [ ] **Step 2: Run — verify fail**

```bash
cd apps/website && npx vitest run __tests__/components/governance/ChangeProcess.test.tsx
```

Expected: FAIL (component doesn't exist yet)

- [ ] **Step 3: Commit**

```bash
git add apps/website/__tests__/components/governance/ChangeProcess.test.tsx
git commit -m "test(governance): add failing ChangeProcess tests"
```

---

## Task 5: GovernanceHero

**Files:**
- Create: `apps/website/components/governance/GovernanceHero.tsx`

- [ ] **Step 1: Implement the component**

```tsx
import { governanceContent } from '@/content/governance';

const REGISTER_DESCRIPTIONS: Record<string, string> = {
  Constitution:     'Immutable architectural laws.',
  Specifications:   'Authoritative public contracts.',
  Governance:       'Oversight and change control.',
  Conformance:      'Verification against specifications.',
};

export function GovernanceHero() {
  const { hero } = governanceContent;
  return (
    <section
      id="overview"
      aria-labelledby="governance-heading"
      className="border-b border-outline-variant bg-[radial-gradient(var(--color-outline-variant)_1px,transparent_1px)] bg-[size:24px_24px]"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-6">
          {hero.eyebrow}
        </p>
        <h1
          id="governance-heading"
          className="font-headline text-headline-lg-mobile md:text-headline-xl font-bold text-on-surface mb-6 leading-tight tracking-tight max-w-5xl"
        >
          {hero.title}
        </h1>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          {hero.description}
        </p>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-outline-variant divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          {hero.register.map((term) => (
            <div key={term} className="py-6 px-0 md:px-6 first:pl-0">
              <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-2">
                {term}
              </dt>
              <dd className="font-mono text-technical-code text-on-surface">
                {REGISTER_DESCRIPTIONS[term] ?? term}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd apps/website && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors for GovernanceHero.tsx

- [ ] **Step 3: Commit**

```bash
git add apps/website/components/governance/GovernanceHero.tsx
git commit -m "feat(governance): add GovernanceHero"
```

---

## Task 6: GovernanceAtAGlance

**Files:**
- Create: `apps/website/components/governance/GovernanceAtAGlance.tsx`

- [ ] **Step 1: Implement the component**

CSS border connectors between nodes use a pseudo-element approach: each node except the last gets a right-border connector drawn via a wrapper that positions a thin line at the center-right. On mobile, collapses to vertical stack with connectors hidden.

```tsx
import { governanceContent } from '@/content/governance';

export function GovernanceAtAGlance() {
  const { nodes } = governanceContent.atAGlance;
  return (
    <section
      id="at-a-glance"
      aria-labelledby="at-a-glance-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="at-a-glance-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Governance at a Glance
        </h2>
        <div className="flex flex-col md:flex-row md:items-stretch gap-0 border border-outline-variant divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          {nodes.map((node) => (
            <div key={node.id} className="flex-1 p-6 flex flex-col gap-1">
              <span className="font-mono text-label-caps uppercase tracking-widest text-secondary">
                {node.authorityType}
              </span>
              <span className="font-mono text-technical-code font-bold text-on-surface">
                {node.label}
              </span>
              <p className="font-mono text-technical-code text-on-surface-variant leading-snug mt-1">
                {node.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd apps/website && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add apps/website/components/governance/GovernanceAtAGlance.tsx
git commit -m "feat(governance): add GovernanceAtAGlance"
```

---

## Task 7: GovernancePrinciples

**Files:**
- Create: `apps/website/components/governance/GovernancePrinciples.tsx`

- [ ] **Step 1: Implement the component**

```tsx
import { governanceContent } from '@/content/governance';

export function GovernancePrinciples() {
  const { principles } = governanceContent;
  return (
    <section
      id="principles"
      aria-labelledby="principles-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="principles-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Governance Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 border border-outline-variant">
          {principles.map((p, i) => (
            <div
              key={p.index}
              className={[
                'p-8',
                i % 2 === 0 ? 'md:border-r border-outline-variant' : '',
                i < 2 ? 'md:border-b border-outline-variant' : '',
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

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd apps/website && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add apps/website/components/governance/GovernancePrinciples.tsx
git commit -m "feat(governance): add GovernancePrinciples"
```

---

## Task 8: AuthorityModel

**Files:**
- Create: `apps/website/components/governance/AuthorityModel.tsx`

- [ ] **Step 1: Implement the component**

Each `<li>` has `id="authority-{record.id}"`. Two `<dl>` sub-sections per item: Owns and Cannot. The `parent` field is not rendered.

```tsx
import { governanceContent } from '@/content/governance';

export function AuthorityModel() {
  const { authorityModel } = governanceContent;
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
          Authority Model
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Authority flows downward only. A lower-level record cannot override a higher-level one.
        </p>
        <ol className="relative" aria-label="Authority levels from highest to lowest">
          {authorityModel.map((record, i) => (
            <li
              id={`authority-${record.id}`}
              key={record.id}
              className="flex gap-4 pb-0"
            >
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 border border-on-surface bg-surface mt-1 shrink-0" />
                {i < authorityModel.length - 1 && (
                  <div className="w-px flex-1 min-h-[3rem] bg-outline-variant" />
                )}
              </div>
              <div className="pb-8 flex-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    aria-hidden="true"
                    className="font-mono text-label-caps text-on-surface-variant"
                  >
                    {record.level}
                  </span>
                  <h3 className="font-headline text-headline-sm font-semibold text-on-surface">
                    {record.name}
                  </h3>
                  <span className="font-mono text-label-caps uppercase tracking-widest text-secondary">
                    {record.authority}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <dl>
                    <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-2">
                      Owns
                    </dt>
                    {record.owns.map((item) => (
                      <dd
                        key={item}
                        className="font-body text-technical-code text-on-surface-variant leading-snug mb-1"
                      >
                        {item}
                      </dd>
                    ))}
                  </dl>
                  <dl>
                    <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-2">
                      Cannot
                    </dt>
                    {record.cannot.map((item) => (
                      <dd
                        key={item}
                        className="font-body text-technical-code text-on-surface-variant leading-snug mb-1"
                      >
                        {item}
                      </dd>
                    ))}
                  </dl>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run AuthorityModel tests — verify they pass**

```bash
cd apps/website && npx vitest run __tests__/components/governance/AuthorityModel.test.tsx
```

Expected: all 9 tests PASS

- [ ] **Step 3: Commit**

```bash
git add apps/website/components/governance/AuthorityModel.tsx
git commit -m "feat(governance): add AuthorityModel"
```

---

## Task 9: GovernanceLifecycle

**Files:**
- Create: `apps/website/components/governance/GovernanceLifecycle.tsx`

- [ ] **Step 1: Implement the component**

Horizontal bordered strip on desktop (same grammar as SpecificationLifecycle). Semantic `<ol>`. Uses `id` fields.

```tsx
import { governanceContent } from '@/content/governance';

export function GovernanceLifecycle() {
  const { lifecycle } = governanceContent;
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
          Governance Lifecycle
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Governance changes progress through defined stages before becoming authoritative.
        </p>
        <ol className="flex flex-col sm:flex-row gap-0 border border-outline-variant divide-y sm:divide-y-0 sm:divide-x divide-outline-variant overflow-x-auto list-none">
          {lifecycle.map((item) => (
            <li key={item.id} id={item.id} className="flex-1 p-5 min-w-[120px]">
              <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-2">
                {item.stage}
              </div>
              <p className="font-body text-technical-code text-on-surface-variant leading-snug">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd apps/website && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add apps/website/components/governance/GovernanceLifecycle.tsx
git commit -m "feat(governance): add GovernanceLifecycle"
```

---

## Task 10: ChangeProcess

**Files:**
- Create: `apps/website/components/governance/ChangeProcess.tsx`

- [ ] **Step 1: Implement the component**

Semantic `<ol>`. 2-col grid per row: left = step number + name, right = rule. `<aside aria-labelledby="governance-callout-heading">` with callout text below the list.

```tsx
import { governanceContent } from '@/content/governance';

export function ChangeProcess() {
  const { changeProcess } = governanceContent;
  return (
    <section
      id="change-process"
      aria-labelledby="change-process-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="change-process-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Change Process
        </h2>
        <ol
          className="divide-y divide-outline-variant border-t border-outline-variant list-none"
          aria-label="Governance change process steps"
        >
          {changeProcess.map((item) => (
            <li
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-2 md:gap-8 py-5"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-label-caps text-on-surface-variant">
                  {item.step}
                </span>
                <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface font-semibold">
                  {item.name}
                </span>
              </div>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {item.rule}
              </p>
            </li>
          ))}
        </ol>
        <aside
          aria-labelledby="governance-callout-heading"
          className="mt-8 border border-outline-variant p-6"
        >
          <p
            id="governance-callout-heading"
            className="font-mono text-technical-code text-on-surface leading-relaxed"
          >
            Code never becomes authoritative first. Specifications do.
          </p>
        </aside>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run ChangeProcess tests — verify they pass**

```bash
cd apps/website && npx vitest run __tests__/components/governance/ChangeProcess.test.tsx
```

Expected: all 6 tests PASS

- [ ] **Step 3: Commit**

```bash
git add apps/website/components/governance/ChangeProcess.tsx
git commit -m "feat(governance): add ChangeProcess"
```

---

## Task 11: RolesResponsibilities

**Files:**
- Create: `apps/website/components/governance/RolesResponsibilities.tsx`

- [ ] **Step 1: Implement the component**

```tsx
import { governanceContent } from '@/content/governance';

export function RolesResponsibilities() {
  const { roles } = governanceContent;
  return (
    <section
      id="roles"
      aria-labelledby="roles-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="roles-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Roles and Responsibilities
        </h2>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {roles.map((role) => (
            <div key={role.id} className="py-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface font-semibold">
                  {role.name}
                </span>
                <span className="font-mono text-label-caps uppercase tracking-widest text-secondary">
                  {role.authority}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <dl>
                  <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3">
                    Owns
                  </dt>
                  {role.owns.map((item) => (
                    <dd
                      key={item}
                      className="font-body text-body-md text-on-surface-variant leading-relaxed mb-1"
                    >
                      {item}
                    </dd>
                  ))}
                </dl>
                <dl>
                  <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3">
                    Supports
                  </dt>
                  {role.supports.map((item) => (
                    <dd
                      key={item}
                      className="font-body text-body-md text-on-surface-variant leading-relaxed mb-1"
                    >
                      {item}
                    </dd>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd apps/website && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add apps/website/components/governance/RolesResponsibilities.tsx
git commit -m "feat(governance): add RolesResponsibilities"
```

---

## Task 12: CompatibilityRules

**Files:**
- Create: `apps/website/components/governance/CompatibilityRules.tsx`

- [ ] **Step 1: Implement the component**

Version Semantics: desktop `<table>` with `<caption class="sr-only">`. Specification Evolution: bordered `divide-y` rows (not a table).

```tsx
import { governanceContent } from '@/content/governance';

export function CompatibilityRules() {
  const { versioning, evolution } = governanceContent.compatibility;
  return (
    <section
      id="compatibility"
      aria-labelledby="compatibility-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="compatibility-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Compatibility Rules
        </h2>

        <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-6">
          Version Semantics
        </h3>
        <div className="overflow-x-auto mb-16">
          <table className="w-full border border-outline-variant border-collapse">
            <caption className="sr-only">Version semantics for governance changes</caption>
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="text-left font-mono text-label-caps uppercase tracking-widest text-on-surface p-4 w-32">
                  Level
                </th>
                <th className="text-left font-mono text-label-caps uppercase tracking-widest text-on-surface p-4">
                  Rule
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {versioning.map((v) => (
                <tr key={v.id}>
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface p-4 align-top">
                    {v.level}
                  </td>
                  <td className="font-body text-body-md text-on-surface-variant p-4 leading-relaxed align-top">
                    {v.rule}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-headline text-headline-sm font-semibold text-on-surface mb-6">
          Specification Evolution
        </h3>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {evolution.map((e) => (
            <div
              key={e.id}
              className="grid grid-cols-1 md:grid-cols-[8rem_1fr] gap-2 md:gap-8 py-5"
            >
              <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                {e.level}
              </span>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {e.rule}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd apps/website && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add apps/website/components/governance/CompatibilityRules.tsx
git commit -m "feat(governance): add CompatibilityRules"
```

---

## Task 13: ConformanceSection

**Files:**
- Create: `apps/website/components/governance/ConformanceSection.tsx`

- [ ] **Step 1: Implement the component**

Statement in bordered callout. 4-item chain with square markers and connecting line. `chainNote` paragraph below.

```tsx
import { governanceContent } from '@/content/governance';

export function ConformanceSection() {
  const { conformance } = governanceContent;
  return (
    <section
      id="conformance"
      aria-labelledby="conformance-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="conformance-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Conformance
        </h2>
        <div className="border border-outline-variant bg-surface-container-low p-6 mb-12 max-w-3xl">
          <p className="font-body text-body-md text-on-surface leading-relaxed">
            {conformance.statement}
          </p>
        </div>
        <ol
          className="relative list-none mb-6"
          aria-label="Conformance chain requirements"
        >
          {conformance.chain.map((item, i) => (
            <li key={item} className="flex gap-4 pb-0">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 border border-secondary bg-surface mt-1 shrink-0" />
                {i < conformance.chain.length - 1 && (
                  <div className="w-px flex-1 min-h-[2rem] bg-outline-variant" />
                )}
              </div>
              <div className="pb-5 font-body text-body-md text-on-surface leading-relaxed">
                {item}
              </div>
            </li>
          ))}
        </ol>
        <p className="font-body text-technical-code text-on-surface-variant leading-relaxed max-w-2xl">
          {conformance.chainNote}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd apps/website && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add apps/website/components/governance/ConformanceSection.tsx
git commit -m "feat(governance): add ConformanceSection"
```

---

## Task 14: ContributionWorkflow

**Files:**
- Create: `apps/website/components/governance/ContributionWorkflow.tsx`

- [ ] **Step 1: Implement the component**

Side-by-side bordered panels on desktop. Left: `<ol>` workflow. Right: `divide-y` links. Mobile: vertical stack.

```tsx
import Link from 'next/link';
import type { Route } from 'next';
import { governanceContent } from '@/content/governance';

export function ContributionWorkflow() {
  const { specificationWorkflow, links } = governanceContent.contribution;
  return (
    <section
      id="contribution"
      aria-labelledby="contribution-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="contribution-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Contribute
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 border border-outline-variant divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          <div className="p-8">
            <h3 className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-6">
              Contribute to Specifications
            </h3>
            <ol className="list-none divide-y divide-outline-variant border-t border-outline-variant">
              {specificationWorkflow.map((item) => (
                <li
                  key={item.id}
                  className="grid grid-cols-[3rem_1fr] gap-2 py-3"
                >
                  <span className="font-mono text-label-caps text-on-surface-variant">
                    {item.step}
                  </span>
                  <span className="font-mono text-technical-code text-on-surface">
                    {item.name}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="p-8">
            <h3 className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-6">
              Resources
            </h3>
            <div className="divide-y divide-outline-variant border-t border-outline-variant">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href as Route}
                  className="group flex items-start justify-between gap-4 py-4 hover:bg-surface-container transition-colors"
                >
                  <div>
                    <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface group-hover:text-secondary transition-colors mb-1">
                      {link.label}
                    </div>
                    <p className="font-body text-technical-code text-on-surface-variant leading-snug">
                      {link.description}
                    </p>
                  </div>
                  <span className="font-mono text-label-caps text-on-surface-variant group-hover:text-secondary transition-colors shrink-0 mt-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd apps/website && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add apps/website/components/governance/ContributionWorkflow.tsx
git commit -m "feat(governance): add ContributionWorkflow"
```

---

## Task 15: GovernanceReferences

**Files:**
- Create: `apps/website/components/governance/GovernanceReferences.tsx`

- [ ] **Step 1: Implement the component**

Same pattern as `SpecificationReferences`. `divide-y` bordered `<Link>` rows with `→` arrows.

```tsx
import Link from 'next/link';
import type { Route } from 'next';
import { governanceContent } from '@/content/governance';

export function GovernanceReferences() {
  const { references } = governanceContent;
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

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd apps/website && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
git add apps/website/components/governance/GovernanceReferences.tsx
git commit -m "feat(governance): add GovernanceReferences"
```

---

## Task 16: Page Composition

**Files:**
- Modify: `apps/website/app/governance/page.tsx`

- [ ] **Step 1: Replace the stub with the composed page**

```tsx
import type { Metadata } from 'next';
import { GovernanceHero } from '@/components/governance/GovernanceHero';
import { GovernanceAtAGlance } from '@/components/governance/GovernanceAtAGlance';
import { GovernancePrinciples } from '@/components/governance/GovernancePrinciples';
import { AuthorityModel } from '@/components/governance/AuthorityModel';
import { GovernanceLifecycle } from '@/components/governance/GovernanceLifecycle';
import { ChangeProcess } from '@/components/governance/ChangeProcess';
import { RolesResponsibilities } from '@/components/governance/RolesResponsibilities';
import { CompatibilityRules } from '@/components/governance/CompatibilityRules';
import { ConformanceSection } from '@/components/governance/ConformanceSection';
import { ContributionWorkflow } from '@/components/governance/ContributionWorkflow';
import { GovernanceReferences } from '@/components/governance/GovernanceReferences';

export const metadata: Metadata = { title: 'Governance' };

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

- [ ] **Step 2: Run all three test files — verify they pass**

```bash
cd apps/website && npx vitest run __tests__/components/governance/
```

Expected: all tests PASS

- [ ] **Step 3: Run full test suite — no regressions**

```bash
cd apps/website && npx vitest run
```

Expected: all tests PASS (previously 174+)

- [ ] **Step 4: TypeScript check**

```bash
cd apps/website && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 5: Lint check**

```bash
cd apps/website && npx eslint app/governance/ components/governance/ content/governance.ts __tests__/components/governance/
```

Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add apps/website/app/governance/page.tsx
git commit -m "feat(governance): compose page route"
```

---

## Task 17: Build Verification

**Files:** none

- [ ] **Step 1: Run Next.js build**

```bash
cd apps/website && npx next build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully` with no errors, `/governance` appears in the route table.

- [ ] **Step 2: Open governance page in browser**

```bash
cd apps/website && npx next start &
```

Navigate to `http://localhost:3000/governance`. Verify:
- Hero with H1 "Architecture evolves through explicit decisions."
- All 10 section headings present
- Governance at a Glance shows 6 horizontal nodes (desktop)
- Authority Model shows 7 levels with Owns/Cannot content
- Change Process shows 6 steps + governance callout aside
- Contribution Workflow shows side-by-side panels on desktop
- No rounded corners, no shadows, no colored backgrounds beyond design tokens
- Mobile layout collapses correctly

- [ ] **Step 3: Commit if any visual fixes needed; otherwise final commit**

```bash
git add -p  # stage only visual corrections if any
git commit -m "fix(governance): visual corrections from browser review"
```

Or if no fixes needed:

```bash
git tag governance-page-complete
```

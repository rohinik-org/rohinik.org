# Architecture Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/architecture` as the authoritative architectural reference for the Rohinik platform, replacing the current placeholder page stub.

**Architecture:** Static content model in `content/architecture.ts` drives all components. All components are server-rendered except `ArchitectureExplorer` (client, for layer selection state). No external diagram libraries, no animations, no canvas — pure HTML + Tailwind tokens.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS v4 (design tokens from DESIGN.md), Vitest + Testing Library + jest-axe, TypeScript.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `apps/website/content/architecture.ts` | Create | Single source of truth for all architecture content |
| `apps/website/app/architecture/page.tsx` | Replace | Route composition, metadata |
| `apps/website/components/architecture/ArchitectureHero.tsx` | Create | Page hero — server |
| `apps/website/components/architecture/ArchitectureSectionNav.tsx` | Create | In-page anchor nav bar — server |
| `apps/website/components/architecture/SystemProperties.tsx` | Create | 5-property register — server |
| `apps/website/components/architecture/ArchitectureExplorer.tsx` | Create | Layer selector + detail — client |
| `apps/website/components/architecture/CrossCuttingSystems.tsx` | Create | Cross-cutting systems — server |
| `apps/website/components/architecture/ExecutionPath.tsx` | Create | 9-stage execution table — server |
| `apps/website/components/architecture/BoundaryRegister.tsx` | Create | Boundary table — server |
| `apps/website/components/architecture/ArchitectureReferences.tsx` | Create | Footer links — server |
| `apps/website/__tests__/components/architecture/ArchitecturePage.test.tsx` | Create | Page composition tests |
| `apps/website/__tests__/components/architecture/ArchitectureExplorer.test.tsx` | Create | Explorer interaction + a11y tests |
| `apps/website/__tests__/components/architecture/ExecutionPath.test.tsx` | Create | Stage order + content tests |
| `apps/website/__tests__/components/architecture/BoundaryRegister.test.tsx` | Create | Boundary table completeness tests |

---

## Task 1: Content model

**Files:**
- Create: `apps/website/content/architecture.ts`

- [ ] **Step 1: Create the content model**

```typescript
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
      shortDescription: 'Registries, contracts, identity, isolation, policy, and observation primitives.',
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
      shortDescription: 'Constitutional laws, invariants, taxonomy, specifications, and governance.',
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
      description: 'Constrains which actors and components may invoke capabilities or access state.',
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
```

- [ ] **Step 2: Verify TypeScript compiles**

Run from `apps/website/`:
```bash
pnpm typecheck
```
Expected: no errors (content file has no imports, will pass clean)

- [ ] **Step 3: Commit**

```bash
git add apps/website/content/architecture.ts
git commit -m "feat(website): add architecture content model"
```

---

## Task 2: Page-level tests (failing first)

**Files:**
- Create: `apps/website/__tests__/components/architecture/ArchitecturePage.test.tsx`

- [ ] **Step 1: Create the test file**

```typescript
// apps/website/__tests__/components/architecture/ArchitecturePage.test.tsx

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ArchitecturePage from '@/app/architecture/page';

expect.extend(toHaveNoViolations);

describe('ArchitecturePage', () => {
  it('renders exactly one H1', () => {
    render(<ArchitecturePage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('H1 contains architecture title text', () => {
    render(<ArchitecturePage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /layered intelligent computing system/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all major section headings', () => {
    render(<ArchitecturePage />);
    for (const name of [
      /system properties/i,
      /architectural layers/i,
      /cross-cutting systems/i,
      /execution path/i,
      /architectural boundaries/i,
      /continue into the architecture/i,
    ]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
  });

  it('has no axe violations', async () => {
    const { container } = render(<ArchitecturePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

- [ ] **Step 2: Run — expect FAIL (page is still the stub)**

```bash
cd apps/website && pnpm test -- --run __tests__/components/architecture/ArchitecturePage.test.tsx
```
Expected: FAIL — page renders PageShell placeholder, not architecture sections

- [ ] **Step 3: Commit failing test**

```bash
git add apps/website/__tests__/components/architecture/ArchitecturePage.test.tsx
git commit -m "test(website): failing architecture page composition tests"
```

---

## Task 3: ArchitectureHero component

**Files:**
- Create: `apps/website/components/architecture/ArchitectureHero.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/website/components/architecture/ArchitectureHero.tsx

import { architectureContent } from '@/content/architecture';

export function ArchitectureHero() {
  const { hero, layers, crossCuttingSystems } = architectureContent;
  return (
    <section
      id="overview"
      aria-labelledby="architecture-title"
      className="dot-grid border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-24 md:py-32">
        <p className="font-mono text-label-caps uppercase tracking-widest text-secondary mb-6">
          {hero.eyebrow}
        </p>
        <h1
          id="architecture-title"
          className="font-headline text-headline-lg-mobile md:text-headline-xl font-bold text-on-surface mb-6 leading-tight tracking-tight max-w-5xl"
        >
          {hero.title}
        </h1>
        <p className="font-body text-body-md text-on-surface-variant max-w-3xl leading-relaxed mb-4">
          {hero.description}
        </p>
        <p className="font-body text-body-md text-on-surface-variant max-w-3xl leading-relaxed mb-12">
          {hero.summary}
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-3 border-t border-outline-variant">
          <div className="border-b sm:border-b-0 sm:border-r border-outline-variant py-6 pr-8">
            <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
              Architecture Layers
            </dt>
            <dd className="font-mono text-headline-md font-bold text-on-surface">
              {String(layers.length).padStart(2, '0')}
            </dd>
          </div>
          <div className="border-b sm:border-b-0 sm:border-r border-outline-variant py-6 px-0 sm:px-8">
            <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
              Cross-Cutting Systems
            </dt>
            <dd className="font-mono text-headline-md font-bold text-on-surface">
              {String(crossCuttingSystems.length).padStart(2, '0')}
            </dd>
          </div>
          <div className="py-6 pl-0 sm:pl-8">
            <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-1">
              Contract Boundaries
            </dt>
            <dd className="font-mono text-headline-md font-bold text-on-surface">
              Explicit
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd apps/website && pnpm typecheck
```
Expected: no errors

---

## Task 4: ArchitectureSectionNav component

**Files:**
- Create: `apps/website/components/architecture/ArchitectureSectionNav.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/website/components/architecture/ArchitectureSectionNav.tsx

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'properties', label: 'Properties' },
  { id: 'layers', label: 'Layers' },
  { id: 'cross-cutting', label: 'Cross-Cutting' },
  { id: 'execution', label: 'Execution' },
  { id: 'boundaries', label: 'Boundaries' },
  { id: 'references', label: 'References' },
] as const;

export function ArchitectureSectionNav() {
  return (
    <nav
      aria-label="Architecture page sections"
      className="sticky top-16 z-40 border-b border-outline-variant bg-surface/95 backdrop-blur-xl"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)]">
        <ol className="flex overflow-x-auto gap-0 -mb-px">
          {sections.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                className="block font-mono text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-on-surface py-4 px-4 border-b-2 border-transparent hover:border-outline transition-colors whitespace-nowrap"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd apps/website && pnpm typecheck
```
Expected: no errors

---

## Task 5: SystemProperties component

**Files:**
- Create: `apps/website/components/architecture/SystemProperties.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/website/components/architecture/SystemProperties.tsx

import { architectureContent } from '@/content/architecture';

export function SystemProperties() {
  const { properties } = architectureContent;
  return (
    <section
      id="properties"
      aria-labelledby="properties-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="properties-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          System Properties
        </h2>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="grid grid-cols-1 md:grid-cols-[64px_280px_1fr] gap-4 md:gap-8 py-6"
            >
              <div className="font-mono text-label-caps text-on-surface-variant">{prop.index}</div>
              <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                {prop.title}
              </div>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd apps/website && pnpm typecheck
```
Expected: no errors

---

## Task 6: ArchitectureExplorer — failing tests first

**Files:**
- Create: `apps/website/__tests__/components/architecture/ArchitectureExplorer.test.tsx`

- [ ] **Step 1: Create the test file**

```typescript
// apps/website/__tests__/components/architecture/ArchitectureExplorer.test.tsx

import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ArchitectureExplorer } from '@/components/architecture/ArchitectureExplorer';
import { architectureContent } from '@/content/architecture';

expect.extend(toHaveNoViolations);

describe('ArchitectureExplorer', () => {
  it('renders 7 layer selector buttons', () => {
    render(<ArchitectureExplorer />);
    // Buttons in selector list
    const list = screen.getByRole('list', { name: /system stack/i });
    expect(within(list).getAllByRole('button')).toHaveLength(7);
  });

  it('first layer (Shell) is selected initially', () => {
    render(<ArchitectureExplorer />);
    const shellBtn = screen.getByRole('button', { name: /shell/i });
    expect(shellBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('all other layers start unselected', () => {
    render(<ArchitectureExplorer />);
    const notShell = ['Compiler', 'Memory', 'Intelligence', 'Runtime', 'Kernel', 'Foundation'];
    for (const label of notShell) {
      const btn = screen.getByRole('button', { name: new RegExp(label, 'i') });
      expect(btn).toHaveAttribute('aria-pressed', 'false');
    }
  });

  it('clicking Runtime updates the detail panel heading', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer />);
    await user.click(screen.getByRole('button', { name: /runtime/i }));
    expect(
      screen.getByRole('heading', { name: 'Runtime', level: 3 }),
    ).toBeInTheDocument();
  });

  it('Runtime detail shows responsibility text', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer />);
    await user.click(screen.getByRole('button', { name: /runtime/i }));
    expect(screen.getByText(/governed execution/i)).toBeInTheDocument();
  });

  it('detail panel has aria-live="polite"', () => {
    render(<ArchitectureExplorer />);
    const detail = document.getElementById('architecture-layer-detail');
    expect(detail).toHaveAttribute('aria-live', 'polite');
  });

  it('Runtime button gets aria-pressed=true after click', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer />);
    const runtimeBtn = screen.getByRole('button', { name: /runtime/i });
    await user.click(runtimeBtn);
    expect(runtimeBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('Shell button loses aria-pressed after Runtime is clicked', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer />);
    await user.click(screen.getByRole('button', { name: /runtime/i }));
    expect(screen.getByRole('button', { name: /shell/i })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('detail panel shows "Owns" section', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer />);
    await user.click(screen.getByRole('button', { name: /foundation/i }));
    expect(screen.getByRole('heading', { name: /owns/i })).toBeInTheDocument();
  });

  it('detail panel shows "Does not own" section', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer />);
    await user.click(screen.getByRole('button', { name: /foundation/i }));
    expect(screen.getByRole('heading', { name: /does not own/i })).toBeInTheDocument();
  });

  it('layers are in correct order: Shell first, Foundation last', () => {
    render(<ArchitectureExplorer />);
    const list = screen.getByRole('list', { name: /system stack/i });
    const items = within(list).getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Shell');
    expect(items[6]).toHaveTextContent('Foundation');
  });

  it('no duplicate IDs on the page', () => {
    render(<ArchitectureExplorer />);
    const allIds = Array.from(document.querySelectorAll('[id]')).map((el) => el.id);
    const unique = new Set(allIds);
    expect(allIds.length).toBe(unique.size);
  });

  it('has no axe violations in initial state', async () => {
    const { container } = render(<ArchitectureExplorer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no axe violations after selecting Runtime', async () => {
    const user = userEvent.setup();
    const { container } = render(<ArchitectureExplorer />);
    await user.click(screen.getByRole('button', { name: /runtime/i }));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

- [ ] **Step 2: Run — expect FAIL (component does not exist yet)**

```bash
cd apps/website && pnpm test -- --run __tests__/components/architecture/ArchitectureExplorer.test.tsx
```
Expected: FAIL — cannot find module `@/components/architecture/ArchitectureExplorer`

- [ ] **Step 3: Commit failing tests**

```bash
git add apps/website/__tests__/components/architecture/ArchitectureExplorer.test.tsx
git commit -m "test(website): failing ArchitectureExplorer interaction and a11y tests"
```

---

## Task 7: ArchitectureExplorer implementation

**Files:**
- Create: `apps/website/components/architecture/ArchitectureExplorer.tsx`

- [ ] **Step 1: Create the client component**

```tsx
// apps/website/components/architecture/ArchitectureExplorer.tsx
'use client';

import { useState } from 'react';
import { architectureContent } from '@/content/architecture';

export function ArchitectureExplorer() {
  const { layers } = architectureContent;
  const [selectedLayerId, setSelectedLayerId] = useState<string>(layers[0].id);
  const selectedLayer = layers.find((l) => l.id === selectedLayerId) ?? layers[0];

  return (
    <section
      id="layers"
      aria-labelledby="layers-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="layers-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Architectural Layers
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-0 border border-outline-variant">
          {/* Selector column */}
          <ol aria-label="System stack" className="divide-y divide-outline-variant">
            {layers.map((layer) => {
              const selected = layer.id === selectedLayerId;
              return (
                <li key={layer.id}>
                  <button
                    type="button"
                    id={`layer-selector-${layer.id}`}
                    aria-pressed={selected}
                    aria-controls="architecture-layer-detail"
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={[
                      'w-full text-left px-6 py-5 flex items-start gap-4 transition-colors border-l-2',
                      selected
                        ? 'border-l-secondary bg-surface-container text-on-surface'
                        : 'border-l-transparent hover:bg-surface-container text-on-surface-variant hover:text-on-surface',
                    ].join(' ')}
                  >
                    <span className="font-mono text-label-caps text-on-surface-variant shrink-0 pt-0.5 w-6">
                      {layer.index}
                    </span>
                    <div className="min-w-0">
                      <div
                        className={[
                          'font-mono text-label-caps uppercase tracking-widest mb-1',
                          selected ? 'text-secondary' : '',
                        ].join(' ')}
                      >
                        {layer.label}
                      </div>
                      <p className="font-body text-body-md text-on-surface-variant leading-snug text-[0.8125rem]">
                        {layer.shortDescription}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Detail panel */}
          <article
            id="architecture-layer-detail"
            aria-live="polite"
            aria-labelledby={`layer-detail-${selectedLayer.id}-title`}
            className="border-t lg:border-t-0 lg:border-l border-outline-variant px-8 py-8"
          >
            <p className="font-mono text-label-caps text-on-surface-variant mb-2">
              Layer {selectedLayer.index}
            </p>
            <h3
              id={`layer-detail-${selectedLayer.id}-title`}
              className="font-headline text-headline-sm font-bold text-on-surface mb-4"
            >
              {selectedLayer.label}
            </h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed mb-8">
              {selectedLayer.responsibility}
            </p>

            <section aria-labelledby={`layer-detail-${selectedLayer.id}-owns`} className="mb-6">
              <h4
                id={`layer-detail-${selectedLayer.id}-owns`}
                className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3"
              >
                Owns
              </h4>
              <ul className="space-y-1">
                {selectedLayer.owns.map((item) => (
                  <li
                    key={item}
                    className="font-body text-body-md text-on-surface-variant leading-relaxed flex gap-2"
                  >
                    <span className="text-secondary shrink-0" aria-hidden="true">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby={`layer-detail-${selectedLayer.id}-doesnotown`}
              className="mb-6"
            >
              <h4
                id={`layer-detail-${selectedLayer.id}-doesnotown`}
                className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3"
              >
                Does Not Own
              </h4>
              <ul className="space-y-1">
                {selectedLayer.doesNotOwn.map((item) => (
                  <li
                    key={item}
                    className="font-body text-body-md text-on-surface-variant leading-relaxed flex gap-2"
                  >
                    <span className="text-on-surface-variant shrink-0" aria-hidden="true">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby={`layer-detail-${selectedLayer.id}-connects`}>
              <h4
                id={`layer-detail-${selectedLayer.id}-connects`}
                className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3"
              >
                Communicates With
              </h4>
              <ul className="flex flex-wrap gap-2">
                {selectedLayer.communicatesWith.map((target) => (
                  <li
                    key={target}
                    className="font-mono text-label-caps uppercase tracking-widest text-on-surface border border-outline-variant px-3 py-1"
                  >
                    {target}
                  </li>
                ))}
              </ul>
            </section>

            {selectedLayer.specifications.length > 0 && (
              <section
                aria-labelledby={`layer-detail-${selectedLayer.id}-specs`}
                className="mt-6"
              >
                <h4
                  id={`layer-detail-${selectedLayer.id}-specs`}
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3"
                >
                  Related Specifications
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {selectedLayer.specifications.map((spec) => (
                    <li
                      key={spec}
                      className="font-mono text-label-caps text-secondary border border-secondary px-3 py-1"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run explorer tests — expect PASS**

```bash
cd apps/website && pnpm test -- --run __tests__/components/architecture/ArchitectureExplorer.test.tsx
```
Expected: all 13 tests PASS

- [ ] **Step 3: Commit**

```bash
git add apps/website/components/architecture/ArchitectureExplorer.tsx
git commit -m "feat(website): ArchitectureExplorer client component with layer selection"
```

---

## Task 8: CrossCuttingSystems component

**Files:**
- Create: `apps/website/components/architecture/CrossCuttingSystems.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/website/components/architecture/CrossCuttingSystems.tsx

import { architectureContent } from '@/content/architecture';

export function CrossCuttingSystems() {
  const { crossCuttingSystems } = architectureContent;
  return (
    <section
      id="cross-cutting"
      aria-labelledby="cross-cutting-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="cross-cutting-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Cross-Cutting Systems
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Some responsibilities span every architectural layer rather than belonging to one. These
          systems define rules, identifiers, observability, security, and lifecycle semantics across
          the entire platform.
        </p>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {crossCuttingSystems.map((system) => (
            <div
              key={system.id}
              className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 md:gap-12 py-6 items-start"
            >
              <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface">
                {system.title}
              </div>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                {system.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
cd apps/website && pnpm typecheck
```
Expected: no errors

---

## Task 9: ExecutionPath — failing tests first

**Files:**
- Create: `apps/website/__tests__/components/architecture/ExecutionPath.test.tsx`

- [ ] **Step 1: Create the test file**

```typescript
// apps/website/__tests__/components/architecture/ExecutionPath.test.tsx

import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ExecutionPath } from '@/components/architecture/ExecutionPath';

expect.extend(toHaveNoViolations);

const EXPECTED_STAGES = [
  'Accept',
  'Resolve',
  'Compile',
  'Validate',
  'Reason',
  'Execute',
  'Observe',
  'Retain',
  'Present',
] as const;

describe('ExecutionPath', () => {
  it('renders 9 stages in the correct order', () => {
    render(<ExecutionPath />);
    const table = screen.getByRole('table', { name: /execution path/i });
    const rows = within(table).getAllByRole('row');
    // First row is thead, then 9 data rows
    expect(rows).toHaveLength(10);
    for (let i = 0; i < EXPECTED_STAGES.length; i++) {
      expect(rows[i + 1]).toHaveTextContent(EXPECTED_STAGES[i]);
    }
  });

  it('Reason stage description does not imply mandatory LLM use', () => {
    render(<ExecutionPath />);
    const table = screen.getByRole('table', { name: /execution path/i });
    const rows = within(table).getAllByRole('row');
    const reasonRow = rows.find((r) => r.textContent?.includes('Reason'));
    expect(reasonRow).toBeDefined();
    // Must contain conditional language
    expect(reasonRow?.textContent).toMatch(/only|where|when|insufficient/i);
    // Must NOT state LLMs are always invoked
    expect(reasonRow?.textContent).not.toMatch(/always invoke|unconditionally/i);
  });

  it('table has a caption for screen readers', () => {
    render(<ExecutionPath />);
    expect(screen.getByRole('table', { name: /execution path/i })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<ExecutionPath />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

- [ ] **Step 2: Run — expect FAIL (component does not exist)**

```bash
cd apps/website && pnpm test -- --run __tests__/components/architecture/ExecutionPath.test.tsx
```
Expected: FAIL — cannot find module

- [ ] **Step 3: Commit failing tests**

```bash
git add apps/website/__tests__/components/architecture/ExecutionPath.test.tsx
git commit -m "test(website): failing ExecutionPath tests"
```

---

## Task 10: ExecutionPath implementation

**Files:**
- Create: `apps/website/components/architecture/ExecutionPath.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/website/components/architecture/ExecutionPath.tsx

import { architectureContent } from '@/content/architecture';

export function ExecutionPath() {
  const { executionPath } = architectureContent;
  return (
    <section
      id="execution"
      aria-labelledby="execution-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="execution-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Execution Path
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          How a request moves through the architecture from interface to result. Intelligence
          providers are invoked only where deterministic mechanisms are insufficient.
        </p>
        <div className="overflow-x-auto">
          <table
            className="w-full border border-outline-variant"
            aria-label="Rohinik execution path"
          >
            <caption className="sr-only">
              Rohinik execution path — nine stages from Accept to Present
            </caption>
            <thead>
              <tr className="border-b border-outline-variant">
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-12"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-36"
                >
                  Stage
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-36"
                >
                  Layer
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {executionPath.map((stage) => (
                <tr key={stage.index} className="hover:bg-surface-container transition-colors">
                  <td className="font-mono text-label-caps text-on-surface-variant px-4 py-4">
                    {stage.index}
                  </td>
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface px-4 py-4">
                    {stage.label}
                  </td>
                  <td className="font-mono text-label-caps uppercase tracking-widest text-secondary px-4 py-4">
                    {stage.layer}
                  </td>
                  <td className="font-body text-body-md text-on-surface-variant px-4 py-4 leading-relaxed">
                    {stage.description}
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

- [ ] **Step 2: Run ExecutionPath tests — expect PASS**

```bash
cd apps/website && pnpm test -- --run __tests__/components/architecture/ExecutionPath.test.tsx
```
Expected: all 4 tests PASS

- [ ] **Step 3: Commit**

```bash
git add apps/website/components/architecture/ExecutionPath.tsx
git commit -m "feat(website): ExecutionPath component — 9-stage execution table"
```

---

## Task 11: BoundaryRegister — failing tests first

**Files:**
- Create: `apps/website/__tests__/components/architecture/BoundaryRegister.test.tsx`

- [ ] **Step 1: Create the test file**

```typescript
// apps/website/__tests__/components/architecture/BoundaryRegister.test.tsx

import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BoundaryRegister } from '@/components/architecture/BoundaryRegister';

expect.extend(toHaveNoViolations);

describe('BoundaryRegister', () => {
  it('renders a semantic table', () => {
    render(<BoundaryRegister />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('table has 6 data rows (one per boundary)', () => {
    render(<BoundaryRegister />);
    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');
    // 1 thead row + 6 data rows
    expect(rows).toHaveLength(7);
  });

  it('every row has non-empty from, to, contract, and rule cells', () => {
    render(<BoundaryRegister />);
    const table = screen.getByRole('table');
    const dataRows = within(table).getAllByRole('row').slice(1); // skip header
    for (const row of dataRows) {
      const cells = within(row).getAllByRole('cell');
      expect(cells).toHaveLength(4);
      for (const cell of cells) {
        expect(cell.textContent?.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('at least one boundary covers Memory (state boundary)', () => {
    render(<BoundaryRegister />);
    const table = screen.getByRole('table');
    expect(within(table).getByText(/memory/i)).toBeInTheDocument();
  });

  it('Foundation compliance boundary exists', () => {
    render(<BoundaryRegister />);
    const table = screen.getByRole('table');
    expect(within(table).getByText(/foundation/i)).toBeInTheDocument();
  });

  it('table has a caption for screen readers', () => {
    render(<BoundaryRegister />);
    expect(screen.getByRole('table', { name: /architectural boundaries/i })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<BoundaryRegister />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
cd apps/website && pnpm test -- --run __tests__/components/architecture/BoundaryRegister.test.tsx
```
Expected: FAIL — cannot find module

- [ ] **Step 3: Commit failing tests**

```bash
git add apps/website/__tests__/components/architecture/BoundaryRegister.test.tsx
git commit -m "test(website): failing BoundaryRegister tests"
```

---

## Task 12: BoundaryRegister implementation

**Files:**
- Create: `apps/website/components/architecture/BoundaryRegister.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/website/components/architecture/BoundaryRegister.tsx

import { architectureContent } from '@/content/architecture';

export function BoundaryRegister() {
  const { boundaries } = architectureContent;
  return (
    <section
      id="boundaries"
      aria-labelledby="boundaries-heading"
      className="border-b border-outline-variant"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="boundaries-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-4"
        >
          Architectural Boundaries
        </h2>
        <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed mb-12">
          Architecture is defined as much by prohibited coupling as by components. Each boundary
          specifies what a layer may and may not do at the contract level.
        </p>
        <div className="overflow-x-auto">
          <table
            className="w-full border border-outline-variant"
            aria-label="Rohinik architectural boundaries"
          >
            <caption className="sr-only">Rohinik architectural boundaries register</caption>
            <thead>
              <tr className="border-b border-outline-variant">
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-28"
                >
                  From
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-28"
                >
                  To
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3 w-52"
                >
                  Contract
                </th>
                <th
                  scope="col"
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-left px-4 py-3"
                >
                  Rule
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {boundaries.map((boundary) => (
                <tr key={boundary.id} className="hover:bg-surface-container transition-colors">
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface px-4 py-4 align-top">
                    {boundary.from}
                  </td>
                  <td className="font-mono text-label-caps uppercase tracking-widest text-secondary px-4 py-4 align-top">
                    {boundary.to}
                  </td>
                  <td className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant px-4 py-4 align-top">
                    {boundary.contract}
                  </td>
                  <td className="font-body text-body-md text-on-surface-variant px-4 py-4 align-top leading-relaxed">
                    {boundary.rule}
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

- [ ] **Step 2: Run BoundaryRegister tests — expect PASS**

```bash
cd apps/website && pnpm test -- --run __tests__/components/architecture/BoundaryRegister.test.tsx
```
Expected: all 7 tests PASS

- [ ] **Step 3: Commit**

```bash
git add apps/website/components/architecture/BoundaryRegister.tsx
git commit -m "feat(website): BoundaryRegister component — architectural boundary table"
```

---

## Task 13: ArchitectureReferences component

**Files:**
- Create: `apps/website/components/architecture/ArchitectureReferences.tsx`

- [ ] **Step 1: Create the component**

```tsx
// apps/website/components/architecture/ArchitectureReferences.tsx

import Link from 'next/link';
import type { Route } from 'next';
import { architectureContent } from '@/content/architecture';

export function ArchitectureReferences() {
  const { references } = architectureContent;
  return (
    <section
      id="references"
      aria-labelledby="references-heading"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="references-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          {references.heading}
        </h2>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {references.links.map((link) => (
            <Link
              key={link.id}
              href={link.href as Route}
              className="flex items-center justify-between gap-4 py-8 group"
            >
              <div>
                <div className="font-mono text-label-caps uppercase tracking-widest text-on-surface group-hover:text-secondary mb-2 transition-colors">
                  {link.label}
                </div>
                <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                  {link.description}
                </p>
              </div>
              <span
                className="font-mono text-label-caps text-on-surface-variant group-hover:text-secondary transition-colors shrink-0"
                aria-hidden="true"
              >
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

- [ ] **Step 2: Verify TypeScript**

```bash
cd apps/website && pnpm typecheck
```
Expected: no errors

---

## Task 14: Compose the page route

**Files:**
- Modify: `apps/website/app/architecture/page.tsx`

- [ ] **Step 1: Replace the stub page**

```tsx
// apps/website/app/architecture/page.tsx

import type { Metadata } from 'next';
import { ArchitectureHero } from '@/components/architecture/ArchitectureHero';
import { ArchitectureSectionNav } from '@/components/architecture/ArchitectureSectionNav';
import { ArchitectureExplorer } from '@/components/architecture/ArchitectureExplorer';
import { ArchitectureReferences } from '@/components/architecture/ArchitectureReferences';
import { BoundaryRegister } from '@/components/architecture/BoundaryRegister';
import { CrossCuttingSystems } from '@/components/architecture/CrossCuttingSystems';
import { ExecutionPath } from '@/components/architecture/ExecutionPath';
import { SystemProperties } from '@/components/architecture/SystemProperties';

export const metadata: Metadata = {
  title: 'Architecture',
  description:
    'Explore the layered architecture, execution model, system boundaries, and cross-cutting mechanisms of the Rohinik intelligent computing platform.',
};

export default function ArchitecturePage() {
  return (
    <>
      <ArchitectureHero />
      <ArchitectureSectionNav />
      <SystemProperties />
      <ArchitectureExplorer />
      <CrossCuttingSystems />
      <ExecutionPath />
      <BoundaryRegister />
      <ArchitectureReferences />
    </>
  );
}
```

- [ ] **Step 2: Run all architecture tests — expect PASS**

```bash
cd apps/website && pnpm test -- --run __tests__/components/architecture/
```
Expected: all tests PASS across all 4 test files

- [ ] **Step 3: Run full test suite**

```bash
cd apps/website && pnpm test -- --run
```
Expected: all tests PASS (including existing homepage tests — no regressions)

- [ ] **Step 4: Typecheck**

```bash
cd apps/website && pnpm typecheck
```
Expected: no errors

- [ ] **Step 5: Lint**

```bash
cd apps/website && pnpm lint
```
Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add apps/website/app/architecture/page.tsx \
  apps/website/components/architecture/ArchitectureHero.tsx \
  apps/website/components/architecture/ArchitectureSectionNav.tsx \
  apps/website/components/architecture/SystemProperties.tsx \
  apps/website/components/architecture/CrossCuttingSystems.tsx \
  apps/website/components/architecture/ExecutionPath.tsx \
  apps/website/components/architecture/BoundaryRegister.tsx \
  apps/website/components/architecture/ArchitectureReferences.tsx
git commit -m "feat(website): architecture page — layered reference with explorer, execution path, boundary register"
```

---

## Task 15: Build verification and validation checks

- [ ] **Step 1: Production build**

```bash
cd apps/website && pnpm build
```
Expected: no errors, no warnings about missing exports

- [ ] **Step 2: Validate only ArchitectureExplorer is client**

```bash
grep -r "'use client'\|\"use client\"" apps/website/components/architecture/
```
Expected: only `ArchitectureExplorer.tsx` matches

- [ ] **Step 3: Validate no shadows or gradients**

```bash
grep -r "shadow-\|drop-shadow\|gradient" apps/website/components/architecture/ apps/website/app/architecture/
```
Expected: no matches

- [ ] **Step 4: Validate no hardcoded hex colors**

```bash
grep -rE "#[0-9a-fA-F]{3,8}" apps/website/components/architecture/ apps/website/app/architecture/
```
Expected: no matches

- [ ] **Step 5: Validate no placeholder links**

```bash
grep -r 'href="#"' apps/website/components/architecture/
```
Expected: no matches

- [ ] **Step 6: Commit validation sign-off**

```bash
git add -A
git commit -m "chore(website): architecture page build verified and validation checks pass"
```

---

## Manual Verification Checklist

After deploying to Vercel preview:

- [ ] Page reads as an architectural reference, not a marketing page
- [ ] H1 is "A layered intelligent computing system."
- [ ] Layer order: Shell (07) → Compiler (06) → Memory (05) → Intelligence (04) → Runtime (03) → Kernel (02) → Foundation (01)
- [ ] Architecture explorer: clicking each layer updates the detail panel
- [ ] Architecture explorer: keyboard-navigable (Tab to buttons, Space/Enter to select)
- [ ] Selected layer is visually distinct (left border, text color) AND semantically marked (aria-pressed)
- [ ] Cross-cutting systems appear as separate section, not as layers
- [ ] Execution path Reason stage uses conditional language ("only where...")
- [ ] Boundary table is readable on mobile (horizontal scroll on table, not page)
- [ ] Section nav scrolls horizontally on mobile without page overflow
- [ ] Section nav sticky behavior works with global nav offset (top-16)
- [ ] All reference links resolve (/specifications, /rs-1, /governance, /documentation)
- [ ] Dark mode preserves hierarchy and contrast
- [ ] No page-level horizontal overflow at 375px

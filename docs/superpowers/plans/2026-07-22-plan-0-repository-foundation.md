# Plan 0: Repository Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the monorepo skeleton — pnpm workspace, package skeletons, shared TypeScript config, ESLint/Prettier, Husky + lint-staged, GitHub Actions CI, and a root `config` package — before any application code is written.

**Architecture:** `rohinik/` is a pnpm workspace. `apps/` holds runnable applications. `packages/` holds shared libraries (empty skeletons until a second consumer exists). `content/` holds Foundation-owned documentation, independent of Next.js. `.generated/` holds build artifacts at the workspace root, reusable by CLI, website, and future tooling.

**Tech Stack:** Node.js 20+, pnpm 9+, TypeScript 5 (strict), ESLint 9, Prettier 3, Husky 9, lint-staged, GitHub Actions

---

## File Map

| File | Purpose |
|---|---|
| `package.json` (root) | pnpm workspace root, shared scripts |
| `pnpm-workspace.yaml` | declares `apps/*` and `packages/*` |
| `.gitignore` | node_modules, .next, .generated, .superpowers |
| `tsconfig.base.json` | shared strict TypeScript base config |
| `eslint.config.mjs` | shared ESLint flat config |
| `.prettierrc` | shared Prettier config |
| `.prettierignore` | ignore generated files |
| `.husky/pre-commit` | runs lint-staged |
| `.lintstagedrc.json` | runs eslint + prettier on staged files |
| `.github/workflows/ci.yml` | build + test on push/PR |
| `packages/ui/package.json` | UI package skeleton |
| `packages/ui/tsconfig.json` | extends tsconfig.base.json |
| `packages/ui/src/index.ts` | empty export |
| `packages/content/package.json` | content package skeleton |
| `packages/content/tsconfig.json` | extends tsconfig.base.json |
| `packages/content/src/index.ts` | empty export |
| `packages/graph/package.json` | graph package skeleton |
| `packages/graph/tsconfig.json` | extends tsconfig.base.json |
| `packages/graph/src/index.ts` | empty export |
| `packages/search/package.json` | search package skeleton |
| `packages/search/tsconfig.json` | extends tsconfig.base.json |
| `packages/search/src/index.ts` | empty export |
| `packages/config/package.json` | shared config package |
| `packages/config/src/navigation.ts` | top-level nav items |
| `packages/config/src/footer.ts` | footer link config |
| `packages/config/src/index.ts` | exports nav + footer |
| `content/en/.gitkeep` | locale-ready content root |
| `.generated/.gitkeep` (excluded) | workspace-level artifact root |

---

### Task 1: Workspace Root

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `.gitignore`
- Create: `tsconfig.base.json`

- [ ] **Step 1: Verify Node.js and pnpm versions**

```bash
node --version   # Expected: v20.x or higher
pnpm --version   # Expected: 9.x or higher
```

If pnpm not installed: `npm install -g pnpm`

- [ ] **Step 2: Initialize git**

```bash
cd C:/Users/C5182688/Documents/Rohinik_org
git init
```

- [ ] **Step 3: Create root `package.json`**

```json
{
  "name": "rohinik",
  "private": true,
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  },
  "scripts": {
    "dev": "pnpm --filter website dev",
    "build": "pnpm --filter website build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "typecheck": "pnpm -r typecheck",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "eslint": "^9.0.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "prettier": "^3.0.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0"
  }
}
```

- [ ] **Step 4: Create `pnpm-workspace.yaml`**

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

- [ ] **Step 5: Create `.gitignore`**

```
# Dependencies
node_modules/

# Build outputs
.next/
dist/
out/

# Generated artifacts — never committed
.generated/

# Superpowers brainstorm sessions
.superpowers/

# Env files
.env
.env.local
.env.production.local
*.local

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db

# Editor
.vscode/settings.json
.idea/

# Vercel
.vercel
```

- [ ] **Step 6: Create `tsconfig.base.json`**

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

- [ ] **Step 7: Install root deps**

```bash
pnpm install
```

Expected: `node_modules/` created at workspace root

- [ ] **Step 8: Commit**

```bash
git add package.json pnpm-workspace.yaml .gitignore tsconfig.base.json
git commit -m "chore: initialize pnpm workspace root"
```

---

### Task 2: Shared ESLint and Prettier

**Files:**
- Create: `eslint.config.mjs`
- Create: `.prettierrc`
- Create: `.prettierignore`

- [ ] **Step 1: Create `eslint.config.mjs`**

```javascript
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/.generated/**',
    ],
  },
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  }
);
```

- [ ] **Step 2: Create `.prettierrc`**

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always"
}
```

- [ ] **Step 3: Create `.prettierignore`**

```
node_modules/
.next/
dist/
.generated/
*.md
pnpm-lock.yaml
```

- [ ] **Step 4: Verify ESLint runs (no source files yet — just config check)**

```bash
pnpm dlx eslint --version
```

Expected: `9.x.x`

- [ ] **Step 5: Commit**

```bash
git add eslint.config.mjs .prettierrc .prettierignore
git commit -m "chore: shared ESLint and Prettier config"
```

---

### Task 3: Husky + lint-staged

**Files:**
- Create: `.husky/pre-commit`
- Create: `.lintstagedrc.json`

- [ ] **Step 1: Initialize Husky**

```bash
pnpm dlx husky init
```

Expected: `.husky/` directory created with `pre-commit` file

- [ ] **Step 2: Replace `.husky/pre-commit` content**

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged
```

- [ ] **Step 3: Create `.lintstagedrc.json`**

```json
{
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,yaml,yml,md}": [
    "prettier --write"
  ]
}
```

- [ ] **Step 4: Add prepare script to root `package.json`**

Edit `package.json` scripts to add:
```json
"prepare": "husky"
```

- [ ] **Step 5: Run prepare**

```bash
pnpm run prepare
```

Expected: Husky hooks installed

- [ ] **Step 6: Commit**

```bash
git add .husky/ .lintstagedrc.json package.json
git commit -m "chore: Husky pre-commit hook with lint-staged"
```

---

### Task 4: Package Skeletons

**Files:**
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/src/index.ts`
- Create: `packages/content/package.json`
- Create: `packages/content/tsconfig.json`
- Create: `packages/content/src/index.ts`
- Create: `packages/graph/package.json`
- Create: `packages/graph/tsconfig.json`
- Create: `packages/graph/src/index.ts`
- Create: `packages/search/package.json`
- Create: `packages/search/tsconfig.json`
- Create: `packages/search/src/index.ts`

These are **empty skeletons**. No implementation. No components. No build. Just the scaffolding.

- [ ] **Step 1: Create `packages/ui/package.json`**

```json
{
  "name": "@rohinik/ui",
  "version": "0.0.1",
  "private": true,
  "description": "Rohinik design system primitives — populated when a second consumer exists",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "workspace:*"
  }
}
```

- [ ] **Step 2: Create `packages/ui/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create `packages/ui/src/index.ts`**

```typescript
// ponytail: empty skeleton — components live in apps/website/components/ui
// until a second consumer requires extraction
export {};
```

- [ ] **Step 4: Create `packages/content/package.json`**

```json
{
  "name": "@rohinik/content",
  "version": "0.0.1",
  "private": true,
  "description": "Content loader, schemas, and graph — used by website and future CLI",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "workspace:*"
  }
}
```

- [ ] **Step 5: Create `packages/content/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

- [ ] **Step 6: Create `packages/content/src/index.ts`**

```typescript
// ponytail: empty skeleton — lib/content/ in apps/website until Plan 2
// promotes these to the shared package
export {};
```

- [ ] **Step 7: Create `packages/graph/package.json`**

```json
{
  "name": "@rohinik/graph",
  "version": "0.0.1",
  "private": true,
  "description": "Specification graph builder — used by website and future CLI tooling",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "workspace:*"
  }
}
```

- [ ] **Step 8: Create `packages/graph/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

- [ ] **Step 9: Create `packages/graph/src/index.ts`**

```typescript
// ponytail: empty skeleton — lib/graph/ in apps/website until Plan 3
// promotes these to the shared package
export {};
```

- [ ] **Step 10: Create `packages/search/package.json`**

```json
{
  "name": "@rohinik/search",
  "version": "0.0.1",
  "private": true,
  "description": "Search index generator and client — used by website and future CLI",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "workspace:*"
  }
}
```

- [ ] **Step 11: Create `packages/search/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```

- [ ] **Step 12: Create `packages/search/src/index.ts`**

```typescript
// ponytail: empty skeleton — lib/search.ts in apps/website until Plan 7
// promotes client-side search to this package
export {};
```

- [ ] **Step 13: Install workspace packages**

```bash
pnpm install
```

Expected: All package skeletons linked in workspace

- [ ] **Step 14: Commit**

```bash
git add packages/
git commit -m "chore: add package skeletons — ui, content, graph, search"
```

---

### Task 5: Shared Config Package

The `config` package is different from the others — it's populated now, because navigation and footer data are consumed by Plan 1. No components, no build logic: just typed configuration exported as TypeScript.

**Files:**
- Create: `packages/config/package.json`
- Create: `packages/config/tsconfig.json`
- Create: `packages/config/src/navigation.ts`
- Create: `packages/config/src/footer.ts`
- Create: `packages/config/src/index.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/config/src/__tests__/navigation.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { NAV_ITEMS } from '../navigation.js';

describe('navigation config', () => {
  it('has exactly 9 items', () => {
    expect(NAV_ITEMS).toHaveLength(9);
  });

  it('first item is Home at /', () => {
    expect(NAV_ITEMS[0]).toEqual({ label: 'Home', href: '/' });
  });

  it('contains all required routes', () => {
    const hrefs = NAV_ITEMS.map(item => item.href);
    expect(hrefs).toContain('/architecture');
    expect(hrefs).toContain('/specifications');
    expect(hrefs).toContain('/governance');
    expect(hrefs).toContain('/rs-1');
    expect(hrefs).toContain('/ecosystem');
    expect(hrefs).toContain('/documentation');
    expect(hrefs).toContain('/releases');
    expect(hrefs).toContain('/community');
  });

  it('does not contain /registry or /downloads (wrong route names)', () => {
    const hrefs = NAV_ITEMS.map(item => item.href);
    expect(hrefs).not.toContain('/registry');
    expect(hrefs).not.toContain('/downloads');
  });
});
```

- [ ] **Step 2: Create `packages/config/package.json`**

```json
{
  "name": "@rohinik/config",
  "version": "0.0.1",
  "private": true,
  "description": "Shared site configuration — navigation, footer, site metadata",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "devDependencies": {
    "typescript": "workspace:*",
    "vitest": "^2.0.0"
  }
}
```

- [ ] **Step 3: Create `packages/config/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "module": "ESNext",
    "moduleResolution": "bundler"
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Run test — verify it fails**

```bash
cd packages/config && pnpm install && pnpm test
```

Expected: FAIL — `navigation.ts` not found

- [ ] **Step 5: Create `packages/config/src/navigation.ts`**

```typescript
export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Specifications', href: '/specifications' },
  { label: 'Governance', href: '/governance' },
  { label: 'RS-1', href: '/rs-1' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Documentation', href: '/documentation' },
  { label: 'Releases', href: '/releases' },
  { label: 'Community', href: '/community' },
] as const;
```

- [ ] **Step 6: Run test — verify it passes**

```bash
cd packages/config && pnpm test
```

Expected: All PASS

- [ ] **Step 7: Create `packages/config/src/footer.ts`**

```typescript
export interface FooterLink {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface FooterSection {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export const FOOTER_SECTIONS: readonly FooterSection[] = [
  {
    title: 'Foundation',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Governance', href: '/governance' },
      { label: 'Community', href: '/community' },
    ],
  },
  {
    title: 'Standards',
    links: [
      { label: 'Specifications', href: '/specifications' },
      { label: 'RS-1', href: '/rs-1' },
      { label: 'Architecture', href: '/architecture' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/documentation' },
      { label: 'Releases', href: '/releases' },
      { label: 'Ecosystem', href: '/ecosystem' },
    ],
  },
] as const;

export const FOOTER_EXTERNAL_LINKS: readonly FooterLink[] = [
  { label: 'GitHub', href: 'https://github.com/rohinik', external: true },
] as const;

export const FOUNDATION_NAME = 'Rohinik Foundation' as const;
export const FOUNDATION_TAGLINE = 'Open intelligent computing platform. Memory First. Capability First. LLM Last.' as const;
```

- [ ] **Step 8: Create `packages/config/src/index.ts`**

```typescript
export { NAV_ITEMS, type NavItem } from './navigation.js';
export {
  FOOTER_SECTIONS,
  FOOTER_EXTERNAL_LINKS,
  FOUNDATION_NAME,
  FOUNDATION_TAGLINE,
  type FooterLink,
  type FooterSection,
} from './footer.js';
```

- [ ] **Step 9: Commit**

```bash
git add packages/config/
git commit -m "feat: @rohinik/config package with navigation and footer data"
```

---

### Task 6: Content Root

**Files:**
- Create: `content/en/.gitkeep`
- Create: `.generated/.gitkeep` (excluded from git)

- [ ] **Step 1: Create localization-ready content root**

```bash
mkdir -p content/en
touch content/en/.gitkeep
mkdir -p content/en/specs/afs content/en/specs/adr content/en/specs/law
mkdir -p content/en/specs/req content/en/specs/inv content/en/specs/obs
mkdir -p content/en/specs/sec content/en/specs/ax
mkdir -p content/en/docs content/en/governance content/en/tutorials content/en/blog
```

- [ ] **Step 2: Ensure `.generated/` is in `.gitignore` (already added in Task 1)**

Verify:
```bash
grep ".generated" .gitignore
```

Expected: `.generated/` appears in output

- [ ] **Step 3: Commit content root**

```bash
git add content/
git commit -m "chore: content/ root with locale-ready structure (en)"
```

---

### Task 7: GitHub Actions CI

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    name: Build & Test
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Typecheck all packages
        run: pnpm typecheck

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test

      - name: Build website
        run: pnpm build
        env:
          BUILD_PROFILE: production
```

- [ ] **Step 2: Add typecheck script to root `package.json`** (already included in Task 1 — verify it's there)

```bash
grep typecheck package.json
```

Expected: `"typecheck": "pnpm -r typecheck"`

- [ ] **Step 3: Commit**

```bash
mkdir -p .github/workflows
git add .github/
git commit -m "chore: GitHub Actions CI — build, typecheck, lint, test"
```

---

### Task 8: Verify Full Workspace

- [ ] **Step 1: Install all workspace deps**

```bash
pnpm install
```

- [ ] **Step 2: Run tests across all packages**

```bash
pnpm test
```

Expected: `@rohinik/config` navigation tests pass. Other packages have no tests yet (that's correct).

- [ ] **Step 3: Typecheck all packages**

```bash
pnpm typecheck
```

Expected: Zero TypeScript errors across all packages

- [ ] **Step 4: Verify workspace structure**

```bash
ls apps/       # expected: (empty — website added in Plan 1)
ls packages/   # expected: ui/ content/ graph/ search/ config/
ls content/    # expected: en/
```

- [ ] **Step 5: Architecture Compliance Verification**

```
[ ] pnpm-workspace.yaml declares both apps/* and packages/*
[ ] packages/ui exists but is empty (no components)
[ ] packages/content, graph, search are empty skeletons
[ ] packages/config has navigation.ts and footer.ts with typed data
[ ] NAV_ITEMS has exactly 9 items (test-verified)
[ ] NAV_ITEMS does not contain /registry or /downloads
[ ] content/en/ exists with all spec category dirs
[ ] .generated/ is in .gitignore
[ ] .superpowers/ is in .gitignore
[ ] tsconfig.base.json uses strict: true, noUncheckedIndexedAccess: true
[ ] GitHub Actions CI runs on push to main and PRs
[ ] No application code in any package (packages are skeletons)
```

- [ ] **Step 6: Update roadmap**

In `docs/superpowers/plans/2026-07-21-website-implementation-roadmap.md`, update Plan 0 status to `✅ Complete` and Plan 1 status to `🚧 In Progress`.

- [ ] **Step 7: Commit**

```bash
git add docs/
git commit -m "chore: mark Plan 0 complete in implementation roadmap"
```

---

## Plan 0 Definition of Done

- [ ] `pnpm install` succeeds from workspace root
- [ ] `pnpm test` runs and passes (config package navigation tests)
- [ ] `pnpm typecheck` succeeds across all packages with zero errors
- [ ] `pnpm lint` runs without errors
- [ ] Husky pre-commit hook fires on `git commit`
- [ ] GitHub Actions CI workflow file present and valid YAML
- [ ] `packages/ui`, `packages/content`, `packages/graph`, `packages/search` exist as empty skeletons
- [ ] `packages/config` exports `NAV_ITEMS` (9 items, tested), `FOOTER_SECTIONS`, `FOOTER_EXTERNAL_LINKS`
- [ ] `content/en/` exists with all spec category subdirectories
- [ ] `.generated/` is gitignored
- [ ] No application code anywhere — zero Next.js, zero React, zero Tailwind

## Architecture Compliance

- [ ] Workspace structure matches Architecture v1.0: `apps/`, `packages/`, `content/`, `.generated/`
- [ ] `packages/ui` is an empty skeleton — no components introduced prematurely
- [ ] `packages/config` is the only populated package — justified because website consumes it in Plan 1
- [ ] `content/` is at workspace root, not inside `apps/website/` — Foundation-owned, not website-owned
- [ ] `.generated/` is at workspace root, available to future CLI and tooling
- [ ] No `vercel.json` yet — added in Plan 1 only if needed

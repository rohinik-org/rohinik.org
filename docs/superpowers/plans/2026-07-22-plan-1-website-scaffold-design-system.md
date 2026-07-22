# Plan 1: Website Scaffold & Design System

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Working `apps/website` Next.js 15 app with all DESIGN-0001 tokens wired into Tailwind v4 via `@theme`, dark mode, Google Fonts, base UI primitives, `TopNav`, `Footer`, `PageShell`, placeholder pages for all 9 routes, foundational Next.js error/loading/SEO files — deployable to Vercel.

**Architecture:** `apps/website` is a Next.js 15 App Router application inside the pnpm workspace. It imports navigation and footer config from `@rohinik/config` (populated in Plan 0). Content lives in `content/en/` at the workspace root, not inside `apps/website`. `lib/` inside the app holds website-specific logic (content loading, graph, search) until those modules have a second consumer — at which point they graduate to their respective `packages/`. No shadcn yet — deferred to Plan 7. Tailwind tokens are defined in `globals.css` using the v4-native `@theme` block, not in `tailwind.config.ts`.

**Tech Stack:** Next.js 15, React 19, TypeScript 5 (strict), Tailwind CSS v4, `next-themes`, `clsx`, `tailwind-merge`, `@rohinik/config`, Google Fonts (Hanken Grotesk, Inter, JetBrains Mono), Vitest + Testing Library

**Prerequisite:** Plan 0 Definition of Done must be passed before starting this plan.

---

## File Map

| File | Purpose |
|---|---|
| `apps/website/package.json` | website app deps |
| `apps/website/next.config.ts` | Next.js config |
| `apps/website/tsconfig.json` | extends `tsconfig.base.json`, adds Next.js paths |
| `apps/website/tailwind.config.ts` | minimal v4 config: dark mode class strategy, content paths only |
| `apps/website/styles/globals.css` | `@theme` tokens, CSS vars (light + dark), base resets, dot-grid |
| `apps/website/lib/cn.ts` | `cn()` helper: `clsx` + `tailwind-merge` |
| `apps/website/constants/site.ts` | SITE_URL, SITE_TITLE, SITE_DESCRIPTION, SITE_TAGLINE, NAV_HEIGHT, LOGO_SIZE |
| `apps/website/app/layout.tsx` | Root layout: fonts, ThemeProvider, TopNav, Footer, 64px padding-top, full metadata |
| `apps/website/app/providers.tsx` | `next-themes` ThemeProvider (client component) |
| `apps/website/app/not-found.tsx` | 404 page |
| `apps/website/app/error.tsx` | error boundary page |
| `apps/website/app/loading.tsx` | loading fallback (static, but establishes pattern) |
| `apps/website/app/robots.ts` | `robots.txt` via Next.js metadata API |
| `apps/website/app/sitemap.ts` | `sitemap.xml` stub (full generation in Plan 3) |
| `apps/website/app/(marketing)/page.tsx` | `/` placeholder |
| `apps/website/app/architecture/page.tsx` | `/architecture` placeholder |
| `apps/website/app/specifications/page.tsx` | `/specifications` placeholder |
| `apps/website/app/governance/page.tsx` | `/governance` placeholder |
| `apps/website/app/rs-1/page.tsx` | `/rs-1` placeholder |
| `apps/website/app/ecosystem/page.tsx` | `/ecosystem` placeholder |
| `apps/website/app/documentation/page.tsx` | `/documentation` placeholder |
| `apps/website/app/releases/page.tsx` | `/releases` placeholder |
| `apps/website/app/community/page.tsx` | `/community` placeholder |
| `apps/website/components/layout/TopNav.tsx` | 9-item flat nav from `@rohinik/config`, glassmorphism, skip-to-content, dark toggle |
| `apps/website/components/layout/Footer.tsx` | Footer from `@rohinik/config` data, licensing, GitHub |
| `apps/website/components/layout/PageShell.tsx` | Page wrapper: breadcrumbs, heading, description, actions, dot-grid, aside slot |
| `apps/website/components/ui/Button.tsx` | primary/secondary/link/ghost/danger variants (primary + secondary implemented; rest typed) |
| `apps/website/components/ui/Badge.tsx` | Status/stability/kind chips, monospaced uppercase |
| `apps/website/components/ui/Card.tsx` | Header bar + content area, hover border |
| `apps/website/components/ui/Timeline.tsx` | Vertical line, 8×8px square markers |
| `apps/website/components/layout/ThemeToggle.tsx` | Three-way: System / Light / Dark |
| `apps/website/vitest.config.ts` | Vitest config with jsdom |
| `apps/website/vitest.setup.ts` | testing-library/jest-dom setup |
| `apps/website/__tests__/tokens.test.ts` | DESIGN-0001 CSS var compliance (rendered values, not config object) |
| `apps/website/__tests__/routes.test.ts` | All 9 routes exist as files |
| `apps/website/__tests__/components/TopNav.test.tsx` | 9 nav items rendered, skip-to-content present |
| `apps/website/__tests__/components/Footer.test.tsx` | Footer renders, links correct |
| `apps/website/__tests__/components/ui.test.tsx` | Button, Badge, Card, Timeline behavior |
| `apps/website/__tests__/components/snapshots.test.tsx` | Snapshot regression for all layout + UI components |
| `apps/website/__tests__/components/accessibility.test.tsx` | axe violations |

---

### Task 1: App Scaffold

**Files:**
- Create: `apps/website/package.json`
- Create: `apps/website/next.config.ts`
- Create: `apps/website/tsconfig.json`
- Create: `apps/website/.env.example`
- Create: `apps/website/constants/site.ts`
- Create: `apps/website/vitest.config.ts`
- Create: `apps/website/vitest.setup.ts`
- Create: `apps/website/postcss.config.mjs`

- [ ] **Step 1: Create `apps/website/package.json`**

```json
{
  "name": "website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-themes": "^0.4.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "@rohinik/config": "workspace:*"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "workspace:*",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "vitest": "^2.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jsdom": "^24.0.0",
    "jest-axe": "^8.0.0",
    "@types/jest-axe": "^3.5.9"
  }
}
```

- [ ] **Step 2: Create `apps/website/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "noEmit": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `apps/website/next.config.ts`**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  // MDX added in Plan 2
};

export default nextConfig;
```

- [ ] **Step 4: Create `apps/website/postcss.config.mjs`**

```javascript
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

- [ ] **Step 5: Create `apps/website/vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
});
```

- [ ] **Step 6: Create `apps/website/vitest.setup.ts`**

```typescript
import '@testing-library/jest-dom';
```

- [ ] **Step 7: Create `apps/website/.env.example`**

```
BUILD_PROFILE=development
```

- [ ] **Step 8: Create `apps/website/constants/site.ts`**

```typescript
export const SITE_URL = 'https://rohinik.org' as const;
export const SITE_TITLE = 'Rohinik Foundation' as const;
export const SITE_DESCRIPTION = 'Open intelligent computing platform. Memory First. Capability First. LLM Last.' as const;
export const SITE_TAGLINE = 'The Intelligent Computing Platform' as const;
export const NAV_HEIGHT = 64 as const;
export const LOGO_SIZE = 24 as const;
```

- [ ] **Step 9: Install deps**

```bash
cd C:/Users/C5182688/Documents/Rohinik_org
pnpm install
```

Expected: `apps/website/node_modules` created, `@rohinik/config` linked from workspace

- [ ] **Step 10: Commit**

```bash
git add apps/website/
git commit -m "chore: scaffold apps/website Next.js 15 app"
```

**Files:**
- Create: `apps/website/lib/cn.ts`

- [ ] **Step 1: Write the failing test**

Create `apps/website/__tests__/lib/cn.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { cn } from '../../lib/cn';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('resolves Tailwind conflicts (last wins)', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'ignored', 'active')).toBe('base active');
  });

  it('handles undefined and null gracefully', () => {
    expect(cn('base', undefined, null, 'end')).toBe('base end');
  });
});
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd apps/website && pnpm test -- --run __tests__/lib/cn.test.ts
```

Expected: FAIL — `cn` not found

- [ ] **Step 3: Create `apps/website/lib/cn.ts`**

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
cd apps/website && pnpm test -- --run __tests__/lib/cn.test.ts
```

Expected: All 4 tests PASS

- [ ] **Step 5: Commit**

```bash
git add apps/website/lib/cn.ts apps/website/__tests__/lib/cn.test.ts
git commit -m "feat: cn() helper — clsx + tailwind-merge"
```

---

### Task 3: Tailwind Design Tokens

**Files:**
- Create: `apps/website/tailwind.config.ts`
- Create: `apps/website/styles/globals.css`

Tailwind v4 tokens live in `@theme` inside `globals.css`. The `tailwind.config.ts` handles only structural config (dark mode strategy, content paths). Token tests verify CSS custom properties are defined in the stylesheet — not the config object.

- [ ] **Step 1: Write the failing token test**

Create `apps/website/__tests__/tokens.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const css = readFileSync(resolve(__dirname, '../styles/globals.css'), 'utf-8');

function hasVar(name: string): boolean {
  return css.includes(name);
}

function varValue(name: string): string | null {
  const match = css.match(new RegExp(`${name.replace('(', '\\(').replace(')', '\\)')}\\s*:\\s*([^;\\n]+)`));
  return match ? match[1].trim() : null;
}

describe('DESIGN-0001 token compliance', () => {
  describe('@theme tokens defined', () => {
    it('--color-primary is #000000', () => expect(varValue('--color-primary')).toBe('#000000'));
    it('--color-on-primary is #ffffff', () => expect(varValue('--color-on-primary')).toBe('#ffffff'));
    it('--color-secondary is #00668a', () => expect(varValue('--color-secondary')).toBe('#00668a'));
    it('--color-surface is #f7f9fb', () => expect(varValue('--color-surface')).toBe('#f7f9fb'));
    it('--color-background is #f7f9fb', () => expect(varValue('--color-background')).toBe('#f7f9fb'));
    it('--color-tertiary-container is #0b1c30', () => expect(varValue('--color-tertiary-container')).toBe('#0b1c30'));
    it('--color-inverse-surface is #2d3133', () => expect(varValue('--color-inverse-surface')).toBe('#2d3133'));
    it('--color-inverse-on-surface is #eff1f3', () => expect(varValue('--color-inverse-on-surface')).toBe('#eff1f3'));
    it('--color-inverse-primary is #c6c6c6', () => expect(varValue('--color-inverse-primary')).toBe('#c6c6c6'));
    it('--color-error is #ba1a1a', () => expect(varValue('--color-error')).toBe('#ba1a1a'));
    it('--color-outline-muted defined', () => expect(hasVar('--color-outline-muted')).toBe(true));
    it('--color-surface-container-lowest is #ffffff', () => expect(varValue('--color-surface-container-lowest')).toBe('#ffffff'));
  });

  describe('logo vars defined', () => {
    it('--logo-base defined', () => expect(hasVar('--logo-base')).toBe(true));
    it('--logo-accent defined', () => expect(hasVar('--logo-accent')).toBe(true));
  });

  describe('spacing tokens defined', () => {
    it('--spacing-nav-height defined', () => expect(hasVar('--spacing-nav-height')).toBe(true));
    it('--spacing-section-gap defined', () => expect(hasVar('--spacing-section-gap')).toBe(true));
  });
});
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd apps/website && pnpm test -- --run __tests__/tokens.test.ts
```

Expected: FAIL — `globals.css` not found

- [ ] **Step 3: Create `apps/website/tailwind.config.ts`**

Tailwind v4 only needs structural config here — all tokens are in `globals.css` via `@theme`.

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
};

export default config;
```

- [ ] **Step 4: Create `apps/website/styles/globals.css`**

```css
@import "tailwindcss";

/*
  DESIGN-0001 design tokens as Tailwind v4 @theme.
  Tailwind generates utility classes from these (e.g. bg-primary, text-secondary).
  No tailwind.config.ts token definitions needed — this is the v4-native approach.
*/
@theme {
  /* ── Surfaces ── */
  --color-surface: #f7f9fb;
  --color-surface-dim: #d8dadc;
  --color-surface-bright: #f7f9fb;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low: #f2f4f6;
  --color-surface-container: #eceef0;
  --color-surface-container-high: #e6e8ea;
  --color-surface-container-highest: #e0e3e5;

  /* ── On-surface ── */
  --color-on-surface: #191c1e;
  --color-on-surface-variant: #4c4546;
  --color-on-surface-subtle: #45464d;

  /* ── Inverse (dark mode token set) ── */
  --color-inverse-surface: #2d3133;
  --color-inverse-on-surface: #eff1f3;
  --color-inverse-primary: #c6c6c6;

  /* ── Outline ── */
  --color-outline: #7e7576;
  --color-outline-variant: #cfc4c5;
  --color-outline-muted: #76777d33;

  /* ── Tint ── */
  --color-surface-tint: #5e5e5e;

  /* ── Primary (black) ── */
  --color-primary: #000000;
  --color-on-primary: #ffffff;
  --color-primary-container: #1b1b1b;
  --color-on-primary-container: #848484;
  --color-primary-fixed: #e2e2e2;
  --color-primary-fixed-dim: #c6c6c6;
  --color-on-primary-fixed: #1b1b1b;
  --color-on-primary-fixed-variant: #474747;

  /* ── Secondary (deep blue — links, active nav, progress) ── */
  --color-secondary: #00668a;
  --color-on-secondary: #ffffff;
  --color-secondary-container: #8dd5fe;
  --color-on-secondary-container: #005d7e;
  --color-secondary-fixed: #c3e8ff;
  --color-secondary-fixed-dim: #87cff8;
  --color-on-secondary-fixed: #001e2c;
  --color-on-secondary-fixed-variant: #004c68;

  /* ── Tertiary (midnight navy — high-emphasis containers) ── */
  --color-tertiary: #000000;
  --color-on-tertiary: #ffffff;
  --color-tertiary-container: #0b1c30;
  --color-on-tertiary-container: #75859d;
  --color-tertiary-fixed: #d3e3ff;
  --color-tertiary-fixed-dim: #b7c7e2;
  --color-on-tertiary-fixed: #0b1c30;
  --color-on-tertiary-fixed-variant: #38485e;

  /* ── Error ── */
  --color-error: #ba1a1a;
  --color-on-error: #ffffff;
  --color-error-container: #ffdad6;
  --color-on-error-container: #93000a;

  /* ── Background ── */
  --color-background: #f7f9fb;
  --color-on-background: #191c1e;

  /* ── Surface variant ── */
  --color-surface-variant: #e0e3e5;

  /* ── Typography ── */
  --font-headline: 'Hanken Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* ── Font sizes ── */
  --text-headline-xl: 48px;
  --text-headline-xl--line-height: 1.1;
  --text-headline-lg: 32px;
  --text-headline-lg--line-height: 1.2;
  --text-headline-lg-mobile: 28px;
  --text-headline-lg-mobile--line-height: 1.2;
  --text-body-md: 16px;
  --text-body-md--line-height: 1.6;
  --text-technical-code: 14px;
  --text-technical-code--line-height: 1.5;
  --text-label-caps: 12px;
  --text-label-caps--line-height: 1.0;

  /* ── Spacing ── */
  --spacing-margin-edge: 40px;
  --spacing-margin-edge-mobile: 16px;
  --spacing-gutter: 24px;
  --spacing-unit: 4px;
  --spacing-section-gap: 96px;
  --spacing-section-gap-mobile: 64px;
  --spacing-nav-height: 64px;

  /* ── Max widths ── */
  --width-site: 1280px;

  /* ── Border radius ── */
  /* DESIGN-0001: 0px on all structural UI. Exception: dot indicators only. */
  --radius: 0px;
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;
  --radius-xl: 0px;
  --radius-full: 9999px;
}

/*
  Semantic CSS variables for light/dark modes.
  @theme vars above are static — these switch on .dark class.
  Dark mode = DESIGN-0001 inverse-* token set only. No new colors.
*/
:root {
  color-scheme: light dark;

  --sem-background: var(--color-background);
  --sem-on-background: var(--color-on-background);
  --sem-surface: var(--color-surface);
  --sem-on-surface: var(--color-on-surface);
  --sem-primary: var(--color-primary);
  --sem-on-primary: var(--color-on-primary);
  --sem-secondary: var(--color-secondary);
  --sem-outline: var(--color-outline);
  --sem-outline-variant: var(--color-outline-variant);

  /* Logo mark — semantic vars allow DESIGN-0002 updates without editing SVGs */
  --logo-base: #102A43;
  --logo-accent: #10B981;
}

.dark {
  --sem-background: #191c1e;
  --sem-on-background: #eff1f3;
  --sem-surface: #2d3133;
  --sem-on-surface: #eff1f3;
  --sem-primary: #c6c6c6;
  --sem-on-primary: #1b1b1b;
  --sem-secondary: #87cff8;
  --sem-outline: #cfc4c5;
  --sem-outline-variant: #4c4546;
}

/* ── Base resets ── */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Enforce 0px radius globally — DESIGN-0001 hard rule */
button, input, select, textarea {
  border-radius: 0;
}

/* Selection color — secondary blue */
::selection {
  background-color: rgb(0 102 138 / 0.1);
  color: #00668a;
}

/* Dot-grid utility class — hero and empty states */
.dot-grid {
  background-image: radial-gradient(circle, rgb(0 0 0 / 0.07) 1px, transparent 1px);
  background-size: 20px 20px;
}

.dark .dot-grid {
  background-image: radial-gradient(circle, rgb(255 255 255 / 0.05) 1px, transparent 1px);
}

/* Skip-to-content — visually hidden until focused */
.skip-to-content {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 9999;
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: top 0.1s;
}

.skip-to-content:focus {
  top: 1rem;
}
```

- [ ] **Step 5: Run token tests — verify all pass**

```bash
cd apps/website && pnpm test -- --run __tests__/tokens.test.ts
```

Expected: All 18 tests PASS

- [ ] **Step 6: Commit**

```bash
git add apps/website/tailwind.config.ts apps/website/styles/globals.css apps/website/__tests__/tokens.test.ts
git commit -m "feat: DESIGN-0001 tokens in Tailwind v4 @theme and globals.css"
```

---

### Task 4: Root Layout & Theme Provider

**Files:**
- Create: `apps/website/app/providers.tsx`
- Create: `apps/website/app/layout.tsx`

- [ ] **Step 1: Create `apps/website/app/providers.tsx`**

```typescript
'use client';

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
```

Note: `defaultTheme="system"` respects OS preference. User can override via the toggle.

- [ ] **Step 2: Create `apps/website/app/layout.tsx`**

```typescript
import type { Metadata } from 'next';
import { Hanken_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { Providers } from './providers';
import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '@/constants/site';
import '@/styles/globals.css';

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_TITLE}`,
    default: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  keywords: ['rohinik', 'intelligent computing', 'AI', 'specifications', 'open standard'],
  authors: [{ name: SITE_TITLE, url: SITE_URL }],
  creator: SITE_TITLE,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${hankenGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-background text-on-background font-body min-h-screen">
        <Providers>
          <TopNav />
          {/* pt-nav-height prevents content from hiding under fixed TopNav */}
          <main id="main-content" className="pt-[64px]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
```

Note: OG image (`/og-default.png`), favicons, and `site.webmanifest` are static placeholder files — add them as empty PNGs to `public/` now, replace with real assets before Plan 8.

- [ ] **Step 3: Add placeholder static files**

```bash
# Create placeholder assets so metadata doesn't 404
touch apps/website/public/og-default.png
touch apps/website/public/favicon.ico
touch apps/website/public/favicon-16x16.png
touch apps/website/public/apple-touch-icon.png
```

Create `apps/website/public/site.webmanifest`:
```json
{
  "name": "Rohinik Foundation",
  "short_name": "Rohinik",
  "icons": [],
  "theme_color": "#000000",
  "background_color": "#f7f9fb",
  "display": "standalone"
}
```

**Step 4: Note — deferred commit**

`layout.tsx` imports `TopNav` and `Footer`. Do NOT commit yet. Complete Tasks 5 and 6 first, then run the commit in Task 6 Step 5 which includes `layout.tsx` and `providers.tsx`.

---

### Task 5: ThemeToggle + TopNav

**Files:**
- Create: `apps/website/components/layout/ThemeToggle.tsx`
- Create: `apps/website/components/layout/TopNav.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/website/__tests__/components/TopNav.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TopNav } from '../../components/layout/TopNav';

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', resolvedTheme: 'light', setTheme: vi.fn() }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('TopNav', () => {
  it('renders all 9 navigation items', () => {
    render(<TopNav />);
    const labels = [
      'Home', 'Architecture', 'Specifications', 'Governance',
      'RS-1', 'Ecosystem', 'Documentation', 'Releases', 'Community',
    ];
    labels.forEach(label => {
      expect(screen.getByText(label)).toBeDefined();
    });
  });

  it('has a main navigation landmark', () => {
    render(<TopNav />);
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeDefined();
  });

  it('has a skip-to-content link targeting #main-content', () => {
    render(<TopNav />);
    const skip = screen.getByText(/skip to/i);
    expect(skip.getAttribute('href')).toBe('#main-content');
  });

  it('has a dark mode toggle button', () => {
    render(<TopNav />);
    expect(screen.getByRole('button', { name: /theme/i })).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd apps/website && pnpm test -- --run __tests__/components/TopNav.test.tsx
```

Expected: FAIL — `TopNav` not found

- [ ] **Step 3: Create `apps/website/components/layout/ThemeToggle.tsx`**

Three-way toggle: System → Light → Dark → System. Shows current resolved theme label.

```typescript
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

type ThemeOption = 'system' | 'light' | 'dark';
const CYCLE: ThemeOption[] = ['system', 'light', 'dark'];
const LABELS: Record<ThemeOption, string> = { system: 'SYSTEM', light: 'LIGHT', dark: 'DARK' };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-16 h-6" aria-hidden="true" />;
  }

  const current = (theme as ThemeOption) ?? 'system';
  const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];

  return (
    <button
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${LABELS[current]}. Click to switch to ${LABELS[next]}`}
      className={cn(
        'font-mono text-label-caps uppercase tracking-widest transition-colors',
        'px-2 py-1 border border-transparent hover:border-outline-variant',
        'text-on-surface-variant hover:text-on-surface',
      )}
    >
      {LABELS[current]}
    </button>
  );
}
```

- [ ] **Step 4: Create `apps/website/components/layout/TopNav.tsx`**

```typescript
import Link from 'next/link';
import { NAV_ITEMS } from '@rohinik/config';
import { ThemeToggle } from './ThemeToggle';

export function TopNav() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-inverse-surface/90 backdrop-blur-xl border-b border-outline-variant">
      {/* Skip-to-content — visually hidden until focused, per globals.css .skip-to-content */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <div className="max-w-[1280px] mx-auto px-10 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <svg
            width="24"
            height="24"
            viewBox="0 0 128 128"
            fill="none"
            aria-hidden="true"
          >
            <path d="M64,96 L108,74 L64,52 L20,74 Z" fill="var(--logo-base)" fillOpacity="0.4" />
            <path d="M64,74 L108,52 L64,30 L20,52 Z" fill="var(--logo-base)" fillOpacity="0.7" />
            <path d="M64,52 L86,41 L64,30 L42,41 Z" fill="var(--logo-accent)" />
            <line x1="64" y1="30" x2="64" y2="96" stroke="var(--logo-base)" strokeWidth="6" strokeDasharray="4 4" />
          </svg>
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.15em] text-on-surface">
            ROHINIK
          </span>
        </Link>

        {/* Desktop nav — all items except Home */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.filter(item => item.href !== '/').map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-[12px] uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors py-5"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* Mobile menu — shadcn DropdownMenu added in Plan 7 */}
          <button
            aria-label="Open navigation menu"
            className="md:hidden font-mono text-[12px] uppercase border border-outline-variant px-3 py-1 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            MENU
          </button>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 5: Run test — verify it passes**

```bash
cd apps/website && pnpm test -- --run __tests__/components/TopNav.test.tsx
```

Expected: All PASS

- [ ] **Step 6: Commit**

```bash
git add apps/website/components/layout/TopNav.tsx apps/website/components/layout/ThemeToggle.tsx apps/website/__tests__/components/TopNav.test.tsx
git commit -m "feat: TopNav with 9-item nav, skip-to-content, three-way ThemeToggle"
```

---

### Task 6: Footer

**Files:**
- Create: `apps/website/components/layout/Footer.tsx`

Before writing the Footer, verify `FOUNDATION_YEAR` is exported from `@rohinik/config`. It should have been added in Plan 0. If it is not present, add it now:

```typescript
// packages/config/src/footer.ts — add if missing
export const FOUNDATION_YEAR = 2026 as const;
```

And re-export from `packages/config/src/index.ts`:
```typescript
export { FOUNDATION_YEAR } from './footer.js';
```

- [ ] **Step 1: Write the failing test**

Create `apps/website/__tests__/components/Footer.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../../components/layout/Footer';

describe('Footer', () => {
  it('has a contentinfo landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeDefined();
  });

  it('renders foundation name', () => {
    render(<Footer />);
    expect(screen.getByText(/Rohinik Foundation/)).toBeDefined();
  });

  it('renders GitHub external link with rel=noopener', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /github/i });
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(link.getAttribute('href')).toContain('github.com');
  });

  it('renders governance internal link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /governance/i });
    expect(link.getAttribute('href')).toBe('/governance');
  });

  it('renders founding year without relying on runtime date', () => {
    render(<Footer />);
    expect(screen.getByText(/2026/)).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd apps/website && pnpm test -- --run __tests__/components/Footer.test.tsx
```

Expected: FAIL — `Footer` not found

- [ ] **Step 3: Create `apps/website/components/layout/Footer.tsx`**

```typescript
import Link from 'next/link';
import {
  FOOTER_SECTIONS,
  FOOTER_EXTERNAL_LINKS,
  FOUNDATION_NAME,
  FOUNDATION_TAGLINE,
  FOUNDATION_YEAR,
} from '@rohinik/config';

export function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-low">
      <div className="max-w-[1280px] mx-auto px-10 py-16">

        {/* Link grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand column */}
          <div>
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.15em] text-on-surface block mb-4">
              {FOUNDATION_NAME}
            </span>
            <p className="text-sm text-on-surface-variant font-body leading-relaxed">
              {FOUNDATION_TAGLINE}
            </p>
          </div>

          {/* Link columns from config */}
          {FOOTER_SECTIONS.map(section => (
            <div key={section.title}>
              <h3 className="font-mono text-[12px] uppercase tracking-widest text-on-surface-variant mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-on-surface-variant hover:text-on-surface transition-colors font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-outline-variant pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest">
            © {FOUNDATION_YEAR}–present {FOUNDATION_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {FOOTER_EXTERNAL_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="font-mono text-[11px] text-on-surface-variant hover:text-on-surface uppercase tracking-widest transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/governance"
              className="font-mono text-[11px] text-on-surface-variant hover:text-on-surface uppercase tracking-widest transition-colors"
            >
              Governance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run test — verify it passes**

```bash
cd apps/website && pnpm test -- --run __tests__/components/Footer.test.tsx
```

Expected: All PASS

- [ ] **Step 5: Commit layout components + root layout**

```bash
git add apps/website/components/layout/Footer.tsx apps/website/__tests__/components/Footer.test.tsx apps/website/app/layout.tsx apps/website/app/providers.tsx apps/website/public/
git commit -m "feat: Footer, root layout with full OG metadata, placeholder static assets"
```

---

### Task 7: UI Primitives

**Files:**
- Create: `apps/website/components/ui/Button.tsx`
- Create: `apps/website/components/ui/Badge.tsx`
- Create: `apps/website/components/ui/Card.tsx`
- Create: `apps/website/components/ui/Timeline.tsx`

- [ ] **Step 1: Write the failing tests**

Create `apps/website/__tests__/components/ui.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Timeline, type TimelineItem } from '../../components/ui/Timeline';

describe('Button', () => {
  it('renders primary variant with correct class', () => {
    render(<Button variant="primary">READ THE SPEC</Button>);
    const btn = screen.getByRole('button');
    expect(btn.textContent).toBe('READ THE SPEC');
    expect(btn.className).toContain('bg-primary');
  });

  it('renders secondary variant with border', () => {
    render(<Button variant="secondary">VIEW ON GITHUB</Button>);
    expect(screen.getByRole('button').className).toContain('border-primary');
  });

  it('applies disabled state', () => {
    render(<Button disabled>DISABLED</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('accepts all reserved variant types without TypeScript error', () => {
    // link and ghost render as links/unstyled; danger renders with error color
    // just verify the type accepts them — render primary as a proxy
    const btn = <Button variant="danger">DELETE</Button>;
    expect(btn.props.variant).toBe('danger');
  });
});

describe('Badge', () => {
  it('renders text in uppercase mono style', () => {
    render(<Badge>APPROVED</Badge>);
    const badge = screen.getByText('APPROVED');
    expect(badge).toBeDefined();
    expect(badge.className).toContain('font-mono');
    expect(badge.className).toContain('uppercase');
  });
});

describe('Card', () => {
  it('renders title in header bar', () => {
    render(<Card title="AFS-0001">Card content</Card>);
    expect(screen.getByText('AFS-0001')).toBeDefined();
    expect(screen.getByText('Card content')).toBeDefined();
  });

  it('renders without title', () => {
    render(<Card>Content only</Card>);
    expect(screen.getByText('Content only')).toBeDefined();
  });
});

describe('Timeline', () => {
  const items: TimelineItem[] = [
    { label: 'Stage 1', description: 'Foundation', status: 'complete' },
    { label: 'Stage 2', description: 'Kernel', status: 'active' },
    { label: 'Stage 3', description: 'Runtime', status: 'planned' },
    { label: 'Stage 4', description: 'Intelligence', status: 'pending' },
  ];

  it('renders all item labels', () => {
    render(<Timeline items={items} />);
    items.forEach(item => {
      expect(screen.getByText(item.label)).toBeDefined();
    });
  });

  it('renders as a list', () => {
    render(<Timeline items={items} />);
    expect(screen.getByRole('list')).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd apps/website && pnpm test -- --run __tests__/components/ui.test.tsx
```

Expected: FAIL — components not found

- [ ] **Step 3: Create `apps/website/components/ui/Button.tsx`**

```typescript
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

// Variants: primary + secondary implemented. link/ghost/danger reserved for Plans 4-6.
type ButtonVariant = 'primary' | 'secondary' | 'link' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'font-mono uppercase tracking-widest transition-colors',
        'inline-flex items-center justify-center cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-primary text-on-primary border border-primary hover:bg-primary-container',
        variant === 'secondary' && 'bg-transparent text-on-surface border border-primary hover:bg-surface-container',
        variant === 'ghost' && 'bg-transparent text-on-surface-variant border border-transparent hover:border-outline-variant',
        variant === 'link' && 'bg-transparent text-secondary underline-offset-4 hover:underline p-0',
        variant === 'danger' && 'bg-error text-on-error border border-error hover:opacity-90',
        size === 'sm' && 'px-3 py-1.5 text-[11px]',
        size === 'md' && 'px-5 py-2.5 text-[12px]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Create `apps/website/components/ui/Badge.tsx`**

```typescript
import { cn } from '@/lib/cn';

type BadgeVariant = 'status' | 'stability' | 'kind' | 'classification' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  status: 'bg-surface-container-highest text-on-surface-variant',
  stability: 'bg-tertiary-container text-on-tertiary-container',
  kind: 'bg-secondary-container text-on-secondary-container',
  classification: 'bg-surface-container text-on-surface-variant',
  default: 'bg-surface-container-high text-on-surface-variant',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'font-mono uppercase tracking-widest',
        'px-2 py-0.5 text-[11px] inline-block',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 5: Create `apps/website/components/ui/Card.tsx`**

```typescript
import { cn } from '@/lib/cn';

interface CardProps {
  title?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ title, badge, children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'border border-outline-muted bg-surface-container-lowest',
        'transition-colors hover:border-primary',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {(title ?? badge) && (
        <div className="bg-surface-container-high border-b border-outline-muted px-4 py-2 flex items-center justify-between">
          {title && (
            <span className="font-mono uppercase tracking-widest text-on-surface-variant text-[11px]">
              {title}
            </span>
          )}
          {badge}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
```

- [ ] **Step 6: Create `apps/website/components/ui/Timeline.tsx`**

```typescript
import { cn } from '@/lib/cn';

export type TimelineStatus =
  | 'complete'
  | 'active'
  | 'planned'
  | 'research'
  | 'experimental'
  | 'stable'
  | 'deprecated'
  | 'pending';

export interface TimelineItem {
  label: string;
  description?: string;
  status: TimelineStatus;
  meta?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const markerClass: Record<TimelineStatus, string> = {
  complete: 'bg-secondary',
  active: 'bg-primary',
  stable: 'bg-secondary',
  planned: 'bg-outline-variant',
  research: 'bg-outline-variant',
  experimental: 'bg-tertiary-container',
  deprecated: 'bg-error',
  pending: 'bg-outline-variant',
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn('relative', className)} role="list">
      {items.map((item, i) => (
        <li key={item.label} className="flex gap-4 pb-8 last:pb-0 relative">
          {/* Vertical connector line */}
          {i < items.length - 1 && (
            <div
              className="absolute left-[7px] top-4 bottom-0 w-px bg-outline-variant"
              aria-hidden="true"
            />
          )}

          {/* 8×8px square marker — DESIGN-0001 spec */}
          <div className="relative z-10 mt-1.5 shrink-0">
            <div
              aria-hidden="true"
              className={cn('w-2 h-2', markerClass[item.status])}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-[14px] text-on-surface font-medium">
                {item.label}
              </span>
              {item.meta && (
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                  {item.meta}
                </span>
              )}
            </div>
            {item.description && (
              <p className="text-sm text-on-surface-variant font-body">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 7: Run tests — verify all pass**

```bash
cd apps/website && pnpm test -- --run __tests__/components/ui.test.tsx
```

Expected: All PASS

- [ ] **Step 8: Commit**

```bash
git add apps/website/components/ui/ apps/website/__tests__/components/ui.test.tsx
git commit -m "feat: UI primitives — Button, Badge, Card, Timeline"
```

---

### Task 8: PageShell + Placeholder Pages + Foundation Error/Loading Files

**Files:**
- Create: `apps/website/components/layout/PageShell.tsx`
- Create: `apps/website/app/not-found.tsx`
- Create: `apps/website/app/error.tsx`
- Create: `apps/website/app/loading.tsx`
- Create: `apps/website/app/robots.ts`
- Create: `apps/website/app/sitemap.ts`
- Create: 9 page files

- [ ] **Step 1: Write the failing route-existence test**

Create `apps/website/__tests__/routes.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { resolve } from 'path';

const APP_DIR = resolve(__dirname, '../app');

const EXPECTED_ROUTES = [
  '(marketing)/page.tsx',
  'architecture/page.tsx',
  'specifications/page.tsx',
  'governance/page.tsx',
  'rs-1/page.tsx',
  'ecosystem/page.tsx',
  'documentation/page.tsx',
  'releases/page.tsx',
  'community/page.tsx',
];

const EXPECTED_FOUNDATION_FILES = [
  'not-found.tsx',
  'error.tsx',
  'loading.tsx',
  'robots.ts',
  'sitemap.ts',
];

describe('route files', () => {
  it.each(EXPECTED_ROUTES)('%s exists', (route) => {
    expect(existsSync(resolve(APP_DIR, route))).toBe(true);
  });
});

describe('foundation files', () => {
  it.each(EXPECTED_FOUNDATION_FILES)('%s exists', (file) => {
    expect(existsSync(resolve(APP_DIR, file))).toBe(true);
  });
});
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd apps/website && pnpm test -- --run __tests__/routes.test.ts
```

Expected: FAIL — page files not found

- [ ] **Step 3: Create `apps/website/components/layout/PageShell.tsx`**

```typescript
import { cn } from '@/lib/cn';

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageShellProps {
  label?: string;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function PageShell({
  label,
  title,
  description,
  breadcrumbs,
  actions,
  aside,
  children,
  className,
}: PageShellProps) {
  return (
    <div className={cn('min-h-screen', className)}>
      {/* Dot-grid hero area */}
      <div className="dot-grid border-b border-outline-muted">
        <div className="max-w-[1280px] mx-auto px-10 py-16 md:py-24">

          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-2">
                  {i > 0 && <span className="text-on-surface-variant text-xs" aria-hidden="true">/</span>}
                  <a
                    href={crumb.href}
                    className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors"
                  >
                    {crumb.label}
                  </a>
                </span>
              ))}
            </nav>
          )}

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              {label && (
                <div className="font-mono text-[12px] text-secondary uppercase tracking-widest mb-4">
                  {label}
                </div>
              )}
              <h1 className="font-headline text-[28px] md:text-[48px] font-bold text-on-surface mb-4 leading-tight tracking-tight">
                {title}
              </h1>
              {description && (
                <p className="font-body text-[16px] text-on-surface-variant max-w-2xl leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {/* Actions slot — for CTA buttons, version pickers, etc. */}
            {actions && (
              <div className="flex items-center gap-3 shrink-0">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content with optional aside */}
      {(children ?? aside) && (
        <div className="max-w-[1280px] mx-auto px-10 py-16 md:py-24">
          {aside ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
              <div>{children}</div>
              <aside>{aside}</aside>
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create foundational Next.js app files**

`apps/website/app/not-found.tsx`:
```typescript
import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Not Found' };

export default function NotFound() {
  return (
    <PageShell
      label="404"
      title="Page not found."
      description="The page you're looking for doesn't exist or has been moved."
    />
  );
}
```

`apps/website/app/error.tsx`:
```typescript
'use client';

import { PageShell } from '@/components/layout/PageShell';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <PageShell
      label="ERROR"
      title="Something went wrong."
      description="An unexpected error occurred. Try reloading the page."
      actions={
        <Button variant="secondary" onClick={reset}>
          TRY AGAIN
        </Button>
      }
    />
  );
}
```

`apps/website/app/loading.tsx`:
```typescript
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="font-mono text-[12px] uppercase tracking-widest text-on-surface-variant">
        Loading…
      </div>
    </div>
  );
}
```

`apps/website/app/robots.ts`:
```typescript
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

`apps/website/app/sitemap.ts`:
```typescript
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants/site';

const STATIC_ROUTES = [
  '/',
  '/architecture',
  '/specifications',
  '/governance',
  '/rs-1',
  '/ecosystem',
  '/documentation',
  '/releases',
  '/community',
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Spec pages added in Plan 3 when .generated/sitemap.json is available
  return STATIC_ROUTES.map((url) => ({
    url: `${SITE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: url === '/' ? 1 : 0.8,
  }));
}
```

- [ ] **Step 5: Create all 9 placeholder page files**

`apps/website/app/(marketing)/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { SITE_TAGLINE, SITE_TITLE } from '@/constants/site';

export const metadata: Metadata = { title: 'Home' };

export default function HomePage() {
  return (
    <PageShell
      label="ROHINIK FOUNDATION"
      title={SITE_TAGLINE}
      description={`${SITE_TITLE}. Memory First. Capability First. LLM Last.`}
    />
  );
}
```

`apps/website/app/architecture/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Architecture' };

export default function ArchitecturePage() {
  return (
    <PageShell
      label="ARCHITECTURE / RS-1"
      title="Layered Architecture"
      description="Foundation, Kernel, Runtime, Intelligence, Memory, Compiler, Shell."
    />
  );
}
```

`apps/website/app/specifications/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Specifications' };

export default function SpecificationsPage() {
  return (
    <PageShell
      label="SPECIFICATIONS / RS-1"
      title="Specification Corpus"
      description="AFS, ADR, LAW, REQ, INV, OBS, SEC, AX."
    />
  );
}
```

`apps/website/app/governance/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Governance' };

export default function GovernancePage() {
  return (
    <PageShell
      label="FOUNDATION / GOVERNANCE"
      title="Governance"
      description="Foundation structure, working groups, and contribution process."
    />
  );
}
```

`apps/website/app/rs-1/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'RS-1' };

export default function RS1Page() {
  return (
    <PageShell
      label="ROHINIK STANDARD / RS-1"
      title="RS-1 Implementation Status"
      description="Implementation status dashboard for Rohinik Standard 1."
    />
  );
}
```

`apps/website/app/ecosystem/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Ecosystem' };

export default function EcosystemPage() {
  return (
    <PageShell
      label="ECOSYSTEM / RS-1"
      title="Ecosystem"
      description="Drivers, Skills, Packs, Templates, Memories."
    />
  );
}
```

`apps/website/app/documentation/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Documentation' };

export default function DocumentationPage() {
  return (
    <PageShell
      label="FOUNDATION / DOCUMENTATION"
      title="Documentation"
      description="Guides, tutorials, and technical references."
    />
  );
}
```

`apps/website/app/releases/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Releases' };

export default function ReleasesPage() {
  return (
    <PageShell
      label="FOUNDATION / RELEASES"
      title="Releases"
      description="CLI binaries, SDKs, release notes, and checksums."
    />
  );
}
```

`apps/website/app/community/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Community' };

export default function CommunityPage() {
  return (
    <PageShell
      label="FOUNDATION / COMMUNITY"
      title="Community"
      description="Contribution guidelines, working groups, and channels."
    />
  );
}
```

- [ ] **Step 6: Run route test — verify it passes**

```bash
cd apps/website && pnpm test -- --run __tests__/routes.test.ts
```

Expected: All 9 routes + 5 foundation files PASS (14 tests)

- [ ] **Step 7: Run build — verify zero TypeScript errors**

```bash
cd apps/website && pnpm build
```

Expected: Build succeeds, 9 static routes + robots.txt + sitemap.xml generated

- [ ] **Step 8: Start dev server, verify all 9 routes in browser**

```bash
cd apps/website && pnpm dev
```

Open each: `http://localhost:3000`, `/architecture`, `/specifications`, `/governance`, `/rs-1`, `/ecosystem`, `/documentation`, `/releases`, `/community`. Each should show dot-grid hero with correct title and label.

Also verify: `http://localhost:3000/notexistent` shows the 404 page.

- [ ] **Step 9: Commit**

```bash
git add apps/website/app/ apps/website/components/layout/PageShell.tsx apps/website/__tests__/routes.test.ts
git commit -m "feat: PageShell, 9 placeholder pages, not-found/error/loading, robots, sitemap"
```

---

### Task 9: Snapshot + Accessibility Tests

**Files:**
- Create: `apps/website/__tests__/components/snapshots.test.tsx`
- Create: `apps/website/__tests__/components/accessibility.test.tsx`

- [ ] **Step 1: Create snapshot tests**

Create `apps/website/__tests__/components/snapshots.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TopNav } from '../../components/layout/TopNav';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Timeline, type TimelineItem } from '../../components/ui/Timeline';

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', resolvedTheme: 'light', setTheme: vi.fn() }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const timelineItems: TimelineItem[] = [
  { label: 'Foundation', status: 'complete' },
  { label: 'Kernel', status: 'active' },
  { label: 'Runtime', status: 'planned' },
];

describe('component snapshots', () => {
  it('TopNav matches snapshot', () => {
    const { container } = render(<TopNav />);
    expect(container).toMatchSnapshot();
  });

  it('Footer matches snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it('Button primary matches snapshot', () => {
    const { container } = render(<Button variant="primary">READ THE SPEC</Button>);
    expect(container).toMatchSnapshot();
  });

  it('Card with title matches snapshot', () => {
    const { container } = render(<Card title="AFS-0001">Specification content</Card>);
    expect(container).toMatchSnapshot();
  });

  it('Timeline matches snapshot', () => {
    const { container } = render(<Timeline items={timelineItems} />);
    expect(container).toMatchSnapshot();
  });
});
```

- [ ] **Step 2: Run snapshot tests — snapshots are created on first run**

```bash
cd apps/website && pnpm test -- --run __tests__/components/snapshots.test.tsx
```

Expected: All PASS, snapshot files written to `__tests__/components/__snapshots__/`

- [ ] **Step 3: Create accessibility test**

Create `apps/website/__tests__/components/accessibility.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TopNav } from '../../components/layout/TopNav';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';
import { Timeline, type TimelineItem } from '../../components/ui/Timeline';

expect.extend(toHaveNoViolations);

vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light', setTheme: vi.fn() }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('accessibility', () => {
  it('TopNav has no axe violations', async () => {
    const { container } = render(<TopNav />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Footer has no axe violations', async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Button has no axe violations', async () => {
    const { container } = render(<Button variant="primary">READ</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Timeline has no axe violations', async () => {
    const items: TimelineItem[] = [
      { label: 'Stage 1', status: 'complete' },
      { label: 'Stage 2', status: 'pending' },
    ];
    const { container } = render(<Timeline items={items} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

Note: `jest-axe` and `@types/jest-axe` are already in `apps/website/package.json` devDependencies from Task 1.

- [ ] **Step 4: Run accessibility tests**

```bash
cd apps/website && pnpm test -- --run __tests__/components/accessibility.test.tsx
```

Expected: All PASS. If any fail, fix the violation before continuing.

- [ ] **Step 5: Commit**

```bash
git add apps/website/__tests__/components/snapshots.test.tsx apps/website/__tests__/components/__snapshots__/ apps/website/__tests__/components/accessibility.test.tsx
git commit -m "test: snapshot regression and axe accessibility checks"
```

---

### Task 10: Vercel Deployment

- [ ] **Step 1: Push to GitHub**

```bash
git remote add origin https://github.com/rohinik/website.git
git push -u origin main
```

- [ ] **Step 2: Connect to Vercel**

1. Go to vercel.com → New Project → Import from GitHub
2. Select the repo
3. **Root Directory:** `apps/website`
4. **Framework Preset:** Next.js (auto-detected)
5. **Environment Variables:** `BUILD_PROFILE=preview`
6. Deploy

Note: No `vercel.json` needed. Vercel reads `apps/website` root directory directly. Only add `vercel.json` at workspace root if deployment breaks.

- [ ] **Step 3: Verify deployment**

Open Vercel preview URL. Check:
- All 9 routes return 200
- `/sitemap.xml` and `/robots.txt` return correct content
- Fonts load (DevTools → Network, filter for `hanken`, `inter`, `jetbrains`)
- Dark mode toggle cycles System → Light → Dark
- TopNav fixed at top with glassmorphism
- Skip-to-content link appears on Tab key press
- No layout shift when page loads (main has `pt-[64px]`)

- [ ] **Step 4: Commit if `vercel.json` was needed**

Only commit if Vercel required explicit config:
```bash
git add vercel.json
git commit -m "chore: Vercel config for pnpm monorepo"
```

---

### Task 11: Full Test Suite + Definition of Done

- [ ] **Step 1: Run full test suite**

```bash
cd C:/Users/C5182688/Documents/Rohinik_org && pnpm test
```

Expected output includes:
- `packages/config` — navigation tests PASS
- `apps/website` — tokens, routes, cn, TopNav, Footer, UI primitives, snapshots, accessibility all PASS

- [ ] **Step 2: Run lint**

```bash
pnpm lint
```

Expected: Zero ESLint errors across all packages (ESLint config from Plan 0 Task 2)

- [ ] **Step 3: Run typecheck**

```bash
pnpm typecheck
```

Expected: Zero errors across all packages

- [ ] **Step 4: Run production build**

```bash
cd apps/website && BUILD_PROFILE=production pnpm build
```

Expected: Zero errors, 9 static routes + sitemap + robots generated

- [ ] **Step 5: Record Lighthouse scores (informational)**

```bash
cd apps/website && pnpm build && pnpm start &
sleep 5
npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=./lighthouse-plan1.json
cat lighthouse-plan1.json | node -e "const d=require('/dev/stdin'); const c=d.categories; Object.entries(c).forEach(([k,v])=>console.log(k, Math.round(v.score*100)))"
```

Record scores in the commit message. Not a DoD gate — scores will vary with placeholder content and CI environments. Full ≥ 95 target applies at Plan 8 with real content and optimized assets.

- [ ] **Step 6: Architecture Compliance Verification**

```
[ ] pnpm-workspace.yaml declares apps/* and packages/*
[ ] apps/website exists, no src/ directory (files at root of apps/website)
[ ] content/ is at workspace root — NOT inside apps/website
[ ] .generated/ is at workspace root and in .gitignore
[ ] packages/ui has no components — empty skeleton only
[ ] @rohinik/config imported in TopNav and Footer (no hardcoded nav data in components)
[ ] Tailwind tokens defined in @theme inside globals.css (v4-native approach)
[ ] primary == #000000 and secondary == #00668a verified by token tests
[ ] All @theme border-radius values 0px
[ ] No box-shadow in any component className
[ ] Logo SVG uses var(--logo-base) and var(--logo-accent) — not hardcoded #102A43
[ ] display: swap on all three Google Fonts
[ ] defaultTheme: system in ThemeProvider
[ ] ThemeToggle supports System / Light / Dark (3-way)
[ ] main#main-content has pt-[64px] — no CLS
[ ] Skip-to-content targets #main-content
[ ] Timeline.status enum includes: complete, active, planned, research, experimental, stable, deprecated, pending
[ ] Button variant type includes: primary, secondary, link, ghost, danger
[ ] PageShell accepts: breadcrumbs, actions, aside props
[ ] not-found.tsx, error.tsx, loading.tsx present
[ ] robots.ts and sitemap.ts present and build-verified
[ ] Routes: /ecosystem (not /registry), /releases (not /downloads)
[ ] shadcn not installed
[ ] No app/[locale] routing introduced
[ ] NAV_ITEMS drives TopNav — count verified by @rohinik/config test
[ ] constants/site.ts present with SITE_URL, SITE_TITLE, SITE_DESCRIPTION, SITE_TAGLINE
[ ] layout.tsx uses constants (no hardcoded strings for URL/title/description)
[ ] sitemap.ts and robots.ts use SITE_URL from constants
```

- [ ] **Step 7: Update roadmap**

In `docs/superpowers/plans/2026-07-21-website-implementation-roadmap.md`:
- Update Plan 0 status to `✅ Complete`
- Update Plan 1 status to `✅ Complete`

- [ ] **Step 8: Commit**

```bash
git add docs/
git commit -m "chore: mark Plan 1 complete in implementation roadmap"
```

---

## Plan 1 Definition of Done

- [ ] `pnpm dev` starts without errors
- [ ] `pnpm lint` — zero ESLint errors
- [ ] `pnpm build` produces no TypeScript errors
- [ ] `pnpm test` — all test suites pass (tokens, routes, cn, TopNav, Footer, UI, snapshots, accessibility)
- [ ] All 9 routes return 200 (verified in browser)
- [ ] `/robots.txt` returns correct content
- [ ] `/sitemap.xml` returns valid XML with 9 routes
- [ ] Token smoke: primary=#000000, secondary=#00668a, surface=#f7f9fb (test-verified)
- [ ] Dark mode: OS preference respected (`system`), toggle cycles System → Light → Dark
- [ ] Fonts: Hanken Grotesk on headlines, JetBrains Mono on nav/labels, Inter on body
- [ ] TopNav: fixed, glassmorphism, 9 items from `@rohinik/config`, skip-to-content visible on focus
- [ ] 0px border-radius on Button, Card, Badge (test-verified via @theme)
- [ ] No box-shadow anywhere
- [ ] No CLS: main has `pt-[64px]`, fonts use `display: swap`
- [ ] Lighthouse scores recorded (informational — not a gate)
- [ ] Vercel preview deployment accessible

## Architecture Compliance

- [ ] Repository layout: `apps/website` inside workspace, not standalone
- [ ] `content/` at workspace root (Foundation-owned, not website-owned)
- [ ] `.generated/` at workspace root, gitignored
- [ ] `packages/ui` — empty skeleton, no components
- [ ] No `app/[locale]/` routing introduced
- [ ] `@rohinik/config` drives nav and footer — no hardcoded link data in components
- [ ] Logo SVG uses CSS vars (`--logo-base`, `--logo-accent`)
- [ ] DESIGN-0001 tokens in `@theme` (v4-native) — test-verified
- [ ] shadcn/ui not installed (deferred to Plan 7)
- [ ] `clsx` + `tailwind-merge` + `cn()` in place for Plans 2–8

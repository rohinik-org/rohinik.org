# Plan 1: Scaffold & Design System

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Working Next.js 15 pnpm workspace with correct visual identity, all DESIGN-0001 tokens wired into Tailwind, base UI primitives, TopNav, Footer, placeholder pages for all 9 routes — deployable to Vercel.

**Architecture:** Single `apps/website` Next.js 15 app inside a pnpm workspace root. Tailwind v4 config registers every DESIGN-0001 color, typography, and spacing token as a named utility. Dark mode uses `next-themes` class strategy with the DESIGN-0001 `inverse-*` token set mapped to CSS custom properties on the `dark` class. No shadcn yet — deferred to Plan 7.

**Tech Stack:** Node.js 20+, pnpm 9+, Next.js 15 (App Router), React 19, TypeScript 5 (strict), Tailwind CSS v4, `next-themes` 0.4+, Google Fonts (Hanken Grotesk, Inter, JetBrains Mono)

---

## File Map

| File | Purpose |
|---|---|
| `package.json` (root) | pnpm workspace root, no deps |
| `pnpm-workspace.yaml` | declares `apps/*` |
| `apps/website/package.json` | website deps |
| `apps/website/next.config.ts` | Next.js config (strict, no src dir) |
| `apps/website/tsconfig.json` | TypeScript strict config |
| `apps/website/tailwind.config.ts` | All DESIGN-0001 tokens |
| `apps/website/styles/globals.css` | CSS custom properties: light + dark token sets, base resets |
| `apps/website/app/layout.tsx` | Root layout: fonts, ThemeProvider, TopNav, Footer |
| `apps/website/app/providers.tsx` | `next-themes` ThemeProvider (client component) |
| `apps/website/app/(marketing)/page.tsx` | `/` placeholder |
| `apps/website/app/architecture/page.tsx` | `/architecture` placeholder |
| `apps/website/app/specifications/page.tsx` | `/specifications` placeholder |
| `apps/website/app/governance/page.tsx` | `/governance` placeholder |
| `apps/website/app/rs-1/page.tsx` | `/rs-1` placeholder |
| `apps/website/app/ecosystem/page.tsx` | `/ecosystem` placeholder |
| `apps/website/app/documentation/page.tsx` | `/documentation` placeholder |
| `apps/website/app/releases/page.tsx` | `/releases` placeholder |
| `apps/website/app/community/page.tsx` | `/community` placeholder |
| `apps/website/components/layout/TopNav.tsx` | 9-item flat nav, glassmorphism, dark mode toggle |
| `apps/website/components/layout/Footer.tsx` | Foundation links, licensing, GitHub |
| `apps/website/components/ui/Button.tsx` | Primary + secondary variants, 0px radius |
| `apps/website/components/ui/Badge.tsx` | Status/stability/kind chips, monospaced |
| `apps/website/components/ui/Card.tsx` | Header bar + content area, hover border |
| `apps/website/components/ui/Timeline.tsx` | Vertical line, 8×8px square markers |
| `apps/website/components/ui/ThemeToggle.tsx` | Light/dark toggle button |
| `.gitignore` (root) | node_modules, .next, .generated, .superpowers |
| `apps/website/.env.example` | `BUILD_PROFILE=development` |

---

### Task 1: Workspace Root

**Files:**
- Create: `C:/Users/C5182688/Documents/Rohinik_org/package.json`
- Create: `C:/Users/C5182688/Documents/Rohinik_org/pnpm-workspace.yaml`
- Create: `C:/Users/C5182688/Documents/Rohinik_org/.gitignore`

- [ ] **Step 1: Verify pnpm is available**

```bash
pnpm --version
```
Expected: `9.x.x` or higher. If not installed: `npm install -g pnpm`

- [ ] **Step 2: Create workspace root `package.json`**

```json
{
  "name": "rohinik",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter website dev",
    "build": "pnpm --filter website build",
    "lint": "pnpm --filter website lint",
    "test": "pnpm --filter website test"
  }
}
```

- [ ] **Step 3: Create `pnpm-workspace.yaml`**

```yaml
packages:
  - 'apps/*'
```

- [ ] **Step 4: Create `.gitignore`**

```
node_modules/
.next/
.generated/
.superpowers/
dist/
*.local
.env
.env.local
.env.production.local
```

- [ ] **Step 5: Commit**

```bash
git init
git add package.json pnpm-workspace.yaml .gitignore
git commit -m "chore: initialize pnpm workspace"
```

---

### Task 2: Next.js App Scaffold

**Files:**
- Create: `apps/website/package.json`
- Create: `apps/website/next.config.ts`
- Create: `apps/website/tsconfig.json`
- Create: `apps/website/.env.example`

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
    "test": "vitest"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-themes": "^0.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "vitest": "^2.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
cd C:/Users/C5182688/Documents/Rohinik_org
pnpm install
```

Expected: `node_modules` created in workspace root and `apps/website/`

- [ ] **Step 3: Create `apps/website/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
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

- [ ] **Step 4: Create `apps/website/next.config.ts`**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // MDX added in Plan 2
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
```

- [ ] **Step 5: Create `apps/website/.env.example`**

```
BUILD_PROFILE=development
```

- [ ] **Step 6: Create `apps/website/postcss.config.mjs`**

```javascript
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

- [ ] **Step 7: Commit**

```bash
git add apps/website/
git commit -m "chore: scaffold Next.js 15 app under apps/website"
```

---

### Task 3: Tailwind Design Tokens

**Files:**
- Create: `apps/website/tailwind.config.ts`
- Create: `apps/website/styles/globals.css`

This is the most critical task — all DESIGN-0001 tokens must be registered exactly.

- [ ] **Step 1: Create `apps/website/tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        'surface': '#f7f9fb',
        'surface-dim': '#d8dadc',
        'surface-bright': '#f7f9fb',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f2f4f6',
        'surface-container': '#eceef0',
        'surface-container-high': '#e6e8ea',
        'surface-container-highest': '#e0e3e5',
        // On-surface
        'on-surface': '#191c1e',
        'on-surface-variant': '#4c4546',
        'on-surface-subtle': '#45464d',
        // Inverse
        'inverse-surface': '#2d3133',
        'inverse-on-surface': '#eff1f3',
        'inverse-primary': '#c6c6c6',
        // Outline
        'outline': '#7e7576',
        'outline-variant': '#cfc4c5',
        'outline-muted': '#76777d33',
        // Tint
        'surface-tint': '#5e5e5e',
        // Primary (black)
        'primary': '#000000',
        'on-primary': '#ffffff',
        'primary-container': '#1b1b1b',
        'on-primary-container': '#848484',
        'primary-fixed': '#e2e2e2',
        'primary-fixed-dim': '#c6c6c6',
        'on-primary-fixed': '#1b1b1b',
        'on-primary-fixed-variant': '#474747',
        // Secondary (deep blue)
        'secondary': '#00668a',
        'on-secondary': '#ffffff',
        'secondary-container': '#8dd5fe',
        'on-secondary-container': '#005d7e',
        'secondary-fixed': '#c3e8ff',
        'secondary-fixed-dim': '#87cff8',
        'on-secondary-fixed': '#001e2c',
        'on-secondary-fixed-variant': '#004c68',
        // Tertiary (midnight navy)
        'tertiary': '#000000',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#0b1c30',
        'on-tertiary-container': '#75859d',
        'tertiary-fixed': '#d3e3ff',
        'tertiary-fixed-dim': '#b7c7e2',
        'on-tertiary-fixed': '#0b1c30',
        'on-tertiary-fixed-variant': '#38485e',
        // Error
        'error': '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
        // Background
        'background': '#f7f9fb',
        'on-background': '#191c1e',
        // Surface variant
        'surface-variant': '#e0e3e5',
      },
      fontFamily: {
        'headline': ['Hanken Grotesk', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'headline-xl': ['48px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'headline-lg': ['32px', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.01em' }],
        'headline-lg-mobile': ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'technical-code': ['14px', { lineHeight: '1.5', fontWeight: '500' }],
        'label-caps': ['12px', { lineHeight: '1.0', fontWeight: '600' }],
      },
      spacing: {
        'margin-edge': '40px',
        'margin-edge-mobile': '16px',
        'gutter': '24px',
        'unit': '4px',
        'max-width': '1280px',
        'section-gap': '96px',
        'section-gap-mobile': '64px',
      },
      borderRadius: {
        // Sharp/angular — 0px on all structural elements
        DEFAULT: '0px',
        'sm': '0px',
        'md': '0px',
        'lg': '0px',
        // Exception: tiny circular indicators only
        'full': '9999px',
      },
      maxWidth: {
        'site': '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Write the failing test for token values**

Create `apps/website/__tests__/tokens.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import config from '../tailwind.config';

describe('DESIGN-0001 token compliance', () => {
  const colors = config.theme?.extend?.colors as Record<string, string>;

  it('primary is #000000', () => {
    expect(colors['primary']).toBe('#000000');
  });

  it('secondary is #00668a', () => {
    expect(colors['secondary']).toBe('#00668a');
  });

  it('surface is #f7f9fb', () => {
    expect(colors['surface']).toBe('#f7f9fb');
  });

  it('inverse-surface is #2d3133', () => {
    expect(colors['inverse-surface']).toBe('#2d3133');
  });

  it('tertiary-container is #0b1c30', () => {
    expect(colors['tertiary-container']).toBe('#0b1c30');
  });

  it('border radius default is 0px', () => {
    const radius = config.theme?.extend?.borderRadius as Record<string, string>;
    expect(radius['DEFAULT']).toBe('0px');
    expect(radius['sm']).toBe('0px');
    expect(radius['lg']).toBe('0px');
  });
});
```

- [ ] **Step 3: Run test — verify it fails (config doesn't exist yet if running before step 1)**

```bash
cd apps/website && pnpm test -- --run __tests__/tokens.test.ts
```

Expected if running before config is created: FAIL. If config already created: PASS immediately — that's fine, the test is the guard.

- [ ] **Step 4: Create `apps/website/styles/globals.css`**

```css
@import "tailwindcss";

/* DESIGN-0001 dark mode: inverse-* token set */
:root {
  --color-background: #f7f9fb;
  --color-on-background: #191c1e;
  --color-surface: #f7f9fb;
  --color-on-surface: #191c1e;
  --color-primary: #000000;
  --color-on-primary: #ffffff;
  --color-secondary: #00668a;
  --color-outline: #7e7576;
}

.dark {
  --color-background: #191c1e;
  --color-on-background: #eff1f3;
  --color-surface: #2d3133;
  --color-on-surface: #eff1f3;
  --color-primary: #c6c6c6;
  --color-on-primary: #1b1b1b;
  --color-secondary: #87cff8;
  --color-outline: #cfc4c5;
}

/* Base resets */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: var(--color-background);
  color: var(--color-on-background);
  -webkit-font-smoothing: antialiased;
}

/* Remove default button/input styling to enforce design system */
button, input, select, textarea {
  border-radius: 0;
}

/* Selection uses secondary blue */
::selection {
  background-color: #00668a1a;
  color: #00668a;
}
```

- [ ] **Step 5: Run token tests**

```bash
cd apps/website && pnpm test -- --run __tests__/tokens.test.ts
```

Expected: All PASS

- [ ] **Step 6: Commit**

```bash
git add apps/website/tailwind.config.ts apps/website/styles/globals.css apps/website/__tests__/tokens.test.ts
git commit -m "feat: wire DESIGN-0001 tokens into Tailwind config"
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
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
```

- [ ] **Step 2: Create `apps/website/app/layout.tsx`**

```typescript
import type { Metadata } from 'next';
import { Hanken_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { Providers } from './providers';
import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'block',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'block',
  weight: ['400', '500'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'block',
  weight: ['500', '600'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Rohinik Foundation',
    default: 'Rohinik Foundation',
  },
  description: 'Open intelligent computing platform. Memory First. Capability First. LLM Last.',
  metadataBase: new URL('https://rohinik.org'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${hankenGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-background text-on-background font-body">
        <Providers>
          <TopNav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
```

Note: `TopNav` and `Footer` must exist before this compiles. Create stubs in the next task first, then come back.

- [ ] **Step 3: Commit (after Task 5 TopNav/Footer stubs exist)**

```bash
git add apps/website/app/
git commit -m "feat: root layout with font loading and ThemeProvider"
```

---

### Task 5: TopNav Component

**Files:**
- Create: `apps/website/components/layout/TopNav.tsx`
- Create: `apps/website/components/layout/ThemeToggle.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/website/__tests__/components/TopNav.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TopNav } from '../../components/layout/TopNav';

// Install @testing-library/react for this test:
// pnpm add -D @testing-library/react @testing-library/jest-dom jsdom

describe('TopNav', () => {
  it('renders all 9 navigation items', () => {
    render(<TopNav />);
    const navItems = [
      'Home', 'Architecture', 'Specifications', 'Governance',
      'RS-1', 'Ecosystem', 'Documentation', 'Releases', 'Community'
    ];
    navItems.forEach(item => {
      expect(screen.getByText(item)).toBeDefined();
    });
  });

  it('renders nav links in uppercase (label-caps style)', () => {
    render(<TopNav />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeDefined();
  });
});
```

Add to `apps/website/package.json` devDependencies:
```json
"@testing-library/react": "^16.0.0",
"@testing-library/jest-dom": "^6.0.0",
"jsdom": "^24.0.0"
```

Add vitest config to `apps/website/vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': new URL('./', import.meta.url).pathname,
    },
  },
});
```

Create `apps/website/vitest.setup.ts`:
```typescript
import '@testing-library/jest-dom';
```

Run: `pnpm install` to pick up new deps.

- [ ] **Step 2: Run test — verify it fails**

```bash
cd apps/website && pnpm test -- --run __tests__/components/TopNav.test.tsx
```

Expected: FAIL — `TopNav` not found

- [ ] **Step 3: Create `apps/website/components/layout/ThemeToggle.tsx`**

```typescript
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="font-mono text-label-caps text-on-surface-variant uppercase tracking-widest hover:text-on-surface transition-colors px-2 py-1 border border-transparent hover:border-outline-variant"
    >
      {theme === 'dark' ? 'LIGHT' : 'DARK'}
    </button>
  );
}
```

- [ ] **Step 4: Create `apps/website/components/layout/TopNav.tsx`**

```typescript
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
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

export function TopNav() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-inverse-surface/90 backdrop-blur-xl border-b border-outline-variant">
      <div className="max-w-site mx-auto px-margin-edge h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          {/* Inline SVG logo mark */}
          <svg width="24" height="24" viewBox="0 0 128 128" fill="none" aria-hidden="true">
            <path d="M64,96 L108,74 L64,52 L20,74 Z" fill="#102A43" fillOpacity="0.4" />
            <path d="M64,74 L108,52 L64,30 L20,52 Z" fill="#102A43" fillOpacity="0.7" />
            <path d="M64,52 L86,41 L64,30 L42,41 Z" fill="#10B981" />
            <line x1="64" y1="30" x2="64" y2="96" stroke="#102A43" strokeWidth="6" strokeDasharray="4 4" />
          </svg>
          <span className="font-mono text-label-caps font-semibold uppercase tracking-[0.15em] text-on-surface">
            ROHINIK
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.slice(1).map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors py-5"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* Mobile nav placeholder — DropdownMenu added in Plan 7 */}
          <button
            aria-label="Open menu"
            className="md:hidden font-mono text-label-caps uppercase border border-outline-variant px-3 py-1"
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

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add apps/website/components/layout/ apps/website/__tests__/components/TopNav.test.tsx apps/website/vitest.config.ts apps/website/vitest.setup.ts
git commit -m "feat: TopNav with 9-item flat nav and dark mode toggle"
```

---

### Task 6: Footer Component

**Files:**
- Create: `apps/website/components/layout/Footer.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/website/__tests__/components/Footer.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../../components/layout/Footer';

describe('Footer', () => {
  it('renders foundation name', () => {
    render(<Footer />);
    expect(screen.getByText(/Rohinik Foundation/i)).toBeDefined();
  });

  it('renders GitHub link', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink.getAttribute('href')).toContain('github.com');
  });

  it('renders governance link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /governance/i })).toBeDefined();
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

const FOOTER_LINKS = {
  Foundation: [
    { label: 'About', href: '/about' },
    { label: 'Governance', href: '/governance' },
    { label: 'Community', href: '/community' },
  ],
  Standards: [
    { label: 'Specifications', href: '/specifications' },
    { label: 'RS-1', href: '/rs-1' },
    { label: 'Architecture', href: '/architecture' },
  ],
  Resources: [
    { label: 'Documentation', href: '/documentation' },
    { label: 'Releases', href: '/releases' },
    { label: 'Ecosystem', href: '/ecosystem' },
  ],
} as const;

export function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-low mt-section-gap">
      <div className="max-w-site mx-auto px-margin-edge py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="font-mono text-label-caps font-semibold uppercase tracking-[0.15em] text-on-surface block mb-4">
              ROHINIK
            </span>
            <p className="text-body-md text-on-surface-variant text-sm leading-relaxed">
              Open intelligent computing platform. Memory First. Capability First. LLM Last.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-4 text-xs">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-on-surface-variant hover:text-on-surface transition-colors font-body"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-outline-variant pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-label-caps text-on-surface-variant text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Rohinik Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/rohinik"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="font-mono text-label-caps text-on-surface-variant hover:text-on-surface text-xs uppercase tracking-widest transition-colors"
            >
              GitHub
            </a>
            <Link href="/governance" className="font-mono text-label-caps text-on-surface-variant hover:text-on-surface text-xs uppercase tracking-widest transition-colors">
              Governance
            </Link>
            <Link href="/releases" className="font-mono text-label-caps text-on-surface-variant hover:text-on-surface text-xs uppercase tracking-widest transition-colors">
              License
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

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/website/components/layout/Footer.tsx apps/website/__tests__/components/Footer.test.tsx
git commit -m "feat: Footer with navigation links and foundation branding"
```

---

### Task 7: UI Primitives — Button, Badge, Card, Timeline

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
import { Timeline, TimelineItem } from '../../components/ui/Timeline';

describe('Button', () => {
  it('renders primary variant', () => {
    render(<Button variant="primary">READ THE SPEC</Button>);
    const btn = screen.getByRole('button');
    expect(btn.textContent).toBe('READ THE SPEC');
    expect(btn.className).toContain('bg-primary');
  });

  it('renders secondary variant', () => {
    render(<Button variant="secondary">VIEW ON GITHUB</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('border-primary');
  });
});

describe('Badge', () => {
  it('renders label text', () => {
    render(<Badge>APPROVED</Badge>);
    expect(screen.getByText('APPROVED')).toBeDefined();
  });
});

describe('Card', () => {
  it('renders title in header', () => {
    render(<Card title="AFS-0001">Card content</Card>);
    expect(screen.getByText('AFS-0001')).toBeDefined();
    expect(screen.getByText('Card content')).toBeDefined();
  });
});

describe('Timeline', () => {
  it('renders items', () => {
    const items: TimelineItem[] = [
      { label: 'Stage 1', description: 'Foundation', status: 'complete' },
      { label: 'Stage 2', description: 'Kernel', status: 'pending' },
    ];
    render(<Timeline items={items} />);
    expect(screen.getByText('Stage 1')).toBeDefined();
    expect(screen.getByText('Stage 2')).toBeDefined();
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
import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  const base = 'font-mono text-label-caps uppercase tracking-widest transition-colors inline-flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-primary-container border border-primary',
    secondary: 'bg-transparent text-on-surface border border-primary hover:bg-surface-container',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[11px]',
    md: 'px-5 py-2.5 text-[12px]',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Create `apps/website/components/ui/Badge.tsx`**

```typescript
interface BadgeProps {
  variant?: 'status' | 'stability' | 'kind' | 'classification' | 'default';
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  status: 'bg-surface-container-highest text-on-surface-variant',
  stability: 'bg-tertiary-container text-on-tertiary-container',
  kind: 'bg-secondary-container text-on-secondary-container',
  classification: 'bg-surface-container text-on-surface-variant',
  default: 'bg-surface-container-high text-on-surface-variant',
};

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`font-mono text-label-caps uppercase tracking-widest px-2 py-0.5 text-[11px] inline-block ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 5: Create `apps/website/components/ui/Card.tsx`**

```typescript
interface CardProps {
  title?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ title, badge, children, className = '', onClick }: CardProps) {
  const interactive = onClick ? 'cursor-pointer group' : '';

  return (
    <div
      onClick={onClick}
      className={`border border-outline-muted bg-surface-container-lowest transition-colors hover:border-primary ${interactive} ${className}`}
    >
      {(title || badge) && (
        <div className="bg-surface-container-high border-b border-outline-muted px-4 py-2 flex items-center justify-between">
          {title && (
            <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant text-[11px]">
              {title}
            </span>
          )}
          {badge && <div>{badge}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
```

- [ ] **Step 6: Create `apps/website/components/ui/Timeline.tsx`**

```typescript
export interface TimelineItem {
  label: string;
  description?: string;
  status: 'complete' | 'active' | 'pending';
  meta?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative">
      {items.map((item, i) => (
        <li key={item.label} className="flex gap-4 pb-8 last:pb-0 relative">
          {/* Vertical connector line */}
          {i < items.length - 1 && (
            <div className="absolute left-[7px] top-4 bottom-0 w-px bg-outline-variant" aria-hidden="true" />
          )}

          {/* Square marker — 8×8px per DESIGN-0001 */}
          <div className="relative z-10 mt-1 flex-shrink-0">
            <div
              className={`w-2 h-2 ${
                item.status === 'complete'
                  ? 'bg-secondary'
                  : item.status === 'active'
                  ? 'bg-primary'
                  : 'bg-outline-variant'
              }`}
              aria-hidden="true"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-0.5">
              <span className="font-mono text-technical-code text-on-surface font-medium">
                {item.label}
              </span>
              {item.meta && (
                <span className="font-mono text-label-caps text-on-surface-variant uppercase tracking-widest text-[10px]">
                  {item.meta}
                </span>
              )}
            </div>
            {item.description && (
              <p className="text-body-md text-on-surface-variant text-sm">
                {item.description}
              </p>
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
git commit -m "feat: base UI primitives — Button, Badge, Card, Timeline"
```

---

### Task 8: Placeholder Pages (All 9 Routes)

**Files:**
- Create: `apps/website/app/(marketing)/page.tsx`
- Create: `apps/website/app/architecture/page.tsx`
- Create: `apps/website/app/specifications/page.tsx`
- Create: `apps/website/app/governance/page.tsx`
- Create: `apps/website/app/rs-1/page.tsx`
- Create: `apps/website/app/ecosystem/page.tsx`
- Create: `apps/website/app/documentation/page.tsx`
- Create: `apps/website/app/releases/page.tsx`
- Create: `apps/website/app/community/page.tsx`

- [ ] **Step 1: Create a shared placeholder component**

Create `apps/website/components/layout/PlaceholderPage.tsx`:

```typescript
interface PlaceholderPageProps {
  title: string;
  description: string;
  plan: string;
}

export function PlaceholderPage({ title, description, plan }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-site mx-auto px-margin-edge py-section-gap">
        {/* Dot-grid hero area */}
        <div
          className="border border-outline-muted p-16 mb-8"
          style={{
            backgroundImage: 'radial-gradient(circle, #00000012 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          <div className="font-mono text-label-caps text-secondary uppercase tracking-widest mb-4">
            ROHINIK FOUNDATION / {plan}
          </div>
          <h1 className="font-headline text-headline-xl text-on-surface mb-4">{title}</h1>
          <p className="font-body text-body-md text-on-surface-variant max-w-2xl">{description}</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create all 9 page files**

`apps/website/app/(marketing)/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = { title: 'Home' };

export default function HomePage() {
  return (
    <PlaceholderPage
      title="Rohinik Foundation"
      description="Open intelligent computing platform. Memory First. Capability First. LLM Last."
      plan="PLAN 4"
    />
  );
}
```

`apps/website/app/architecture/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = { title: 'Architecture' };

export default function ArchitecturePage() {
  return (
    <PlaceholderPage
      title="Architecture"
      description="The Rohinik layered architecture: Foundation, Kernel, Runtime, Intelligence, Memory, Compiler, Shell."
      plan="PLAN 6"
    />
  );
}
```

`apps/website/app/specifications/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = { title: 'Specifications' };

export default function SpecificationsPage() {
  return (
    <PlaceholderPage
      title="Specifications"
      description="AFS, ADR, LAW, REQ, INV, OBS, SEC, AX — the complete Rohinik specification corpus."
      plan="PLAN 5"
    />
  );
}
```

`apps/website/app/governance/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = { title: 'Governance' };

export default function GovernancePage() {
  return (
    <PlaceholderPage
      title="Governance"
      description="Foundation governance model, working groups, and contribution process."
      plan="PLAN 5"
    />
  );
}
```

`apps/website/app/rs-1/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = { title: 'RS-1' };

export default function RS1Page() {
  return (
    <PlaceholderPage
      title="RS-1"
      description="Rohinik Standard 1 — implementation status dashboard."
      plan="PLAN 6"
    />
  );
}
```

`apps/website/app/ecosystem/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = { title: 'Ecosystem' };

export default function EcosystemPage() {
  return (
    <PlaceholderPage
      title="Ecosystem"
      description="Drivers, Skills, Packs, Templates, Memories — the Rohinik ecosystem."
      plan="PLAN 6"
    />
  );
}
```

`apps/website/app/documentation/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = { title: 'Documentation' };

export default function DocumentationPage() {
  return (
    <PlaceholderPage
      title="Documentation"
      description="Guides, tutorials, and technical documentation."
      plan="PLAN 5"
    />
  );
}
```

`apps/website/app/releases/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = { title: 'Releases' };

export default function ReleasesPage() {
  return (
    <PlaceholderPage
      title="Releases"
      description="CLI binaries, SDKs, release notes, and checksums."
      plan="PLAN 6"
    />
  );
}
```

`apps/website/app/community/page.tsx`:
```typescript
import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = { title: 'Community' };

export default function CommunityPage() {
  return (
    <PlaceholderPage
      title="Community"
      description="Contribution guidelines, working groups, and community channels."
      plan="PLAN 6"
    />
  );
}
```

- [ ] **Step 3: Run build — verify all routes compile**

```bash
cd apps/website && pnpm build
```

Expected: Build succeeds, no TypeScript errors, 9 routes generated

- [ ] **Step 4: Start dev server and verify all routes**

```bash
cd apps/website && pnpm dev
```

Visit each route in browser: `http://localhost:3000`, `/architecture`, `/specifications`, `/governance`, `/rs-1`, `/ecosystem`, `/documentation`, `/releases`, `/community`. Each should show the placeholder with correct title and dot-grid background.

- [ ] **Step 5: Commit**

```bash
git add apps/website/app/ apps/website/components/layout/PlaceholderPage.tsx
git commit -m "feat: placeholder pages for all 9 routes"
```

---

### Task 9: Vercel Deployment

**Files:**
- Create: `apps/website/vercel.json` (optional, for monorepo config)
- Create: `vercel.json` (root, for monorepo routing)

- [ ] **Step 1: Create root `vercel.json`**

```json
{
  "buildCommand": "pnpm --filter website build",
  "outputDirectory": "apps/website/.next",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

- [ ] **Step 2: Push to GitHub**

```bash
git remote add origin https://github.com/rohinik/website.git
git push -u origin main
```

- [ ] **Step 3: Connect to Vercel**

1. Go to vercel.com → New Project
2. Import the GitHub repo
3. Framework preset: Next.js
4. Root directory: `apps/website` (or use root `vercel.json`)
5. Add environment variable: `BUILD_PROFILE=preview`
6. Deploy

- [ ] **Step 4: Verify deployment**

Open Vercel preview URL. Verify:
- All 9 routes return 200
- Fonts load (check DevTools → Network → filter by `hanken`, `inter`, `jetbrains`)
- Dark mode toggle works
- TopNav renders correctly

- [ ] **Step 5: Commit `vercel.json`**

```bash
git add vercel.json
git commit -m "chore: Vercel deployment config for pnpm monorepo"
```

---

### Task 10: Run Full Test Suite and Definition of Done Check

- [ ] **Step 1: Run all tests**

```bash
cd apps/website && pnpm test -- --run
```

Expected: All tests pass — tokens, TopNav, Footer, UI primitives

- [ ] **Step 2: Run production build**

```bash
cd apps/website && pnpm build
```

Expected: Zero TypeScript errors, zero build errors

- [ ] **Step 3: Run Lighthouse on production build**

```bash
# Start production server locally
cd apps/website && pnpm build && pnpm start

# In a separate terminal, run Lighthouse CLI
npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=./lighthouse-plan1.json
```

Expected: All categories ≥ 90 (full ≥ 95 target reached at Plan 8 with complete content)

- [ ] **Step 4: Architecture Compliance Verification**

Verify each item manually:

```
[ ] apps/website/ exists under rohinik/apps/ workspace
[ ] content/en/ directory exists (empty, localization-ready)
[ ] lib/ directory exists (empty, ready for Plan 2)
[ ] .generated/ is in .gitignore
[ ] .superpowers/ is in .gitignore
[ ] no packages/ui directory exists
[ ] shadcn not installed (check apps/website/package.json)
[ ] Tailwind token: primary == #000000
[ ] Tailwind token: secondary == #00668a
[ ] Tailwind token: surface == #f7f9fb
[ ] All border-radius values are 0px (check tailwind.config.ts)
[ ] Routes: /ecosystem/ (not /registry/)
[ ] Routes: /releases/ (not /downloads/)
[ ] Dark mode: uses inverse-* tokens, no new colors
[ ] TopNav: 9 items exactly
```

- [ ] **Step 5: Update roadmap status**

In `docs/superpowers/plans/2026-07-21-website-implementation-roadmap.md`, update Plan 1 status from `📋 Planned` to `✅ Complete`.

- [ ] **Step 6: Final commit**

```bash
git add docs/
git commit -m "chore: mark Plan 1 complete in implementation roadmap"
```

---

## Plan 1 Definition of Done

- [ ] `pnpm dev` runs without errors from workspace root
- [ ] `pnpm build` produces no TypeScript errors
- [ ] All 9 routes return 200, verified in browser
- [ ] Token smoke test passes: primary=#000000, secondary=#00668a, surface=#f7f9fb
- [ ] Dark mode toggle switches `class="dark"` on `<html>`, inverse tokens apply
- [ ] Fonts load: Hanken Grotesk on headlines, JetBrains Mono on nav labels
- [ ] TopNav renders exactly 9 items, glassmorphism bar visible on scroll
- [ ] 0px border-radius confirmed on Button, Card, Badge
- [ ] No box-shadow CSS anywhere in components
- [ ] All unit tests pass (`pnpm test`)
- [ ] Lighthouse ≥ 90 on placeholder homepage (production build)
- [ ] Vercel preview deployment accessible

## Architecture Compliance

- [ ] Repository layout matches Architecture v1.0 spec exactly
- [ ] No `packages/ui` introduced
- [ ] shadcn/ui not installed
- [ ] All Tailwind token names match DESIGN-0001 exactly (verified by token test)
- [ ] URL structure: `/ecosystem`, `/releases`, `/specifications` — all correct
- [ ] `content/en/` exists (localization-ready from day one)
- [ ] `.generated/` in `.gitignore`

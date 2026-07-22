# Rohinik Website Implementation Roadmap

**Date:** 2026-07-21
**Status:** Active
**Architecture:** [Website Architecture v1.0](../specs/2026-07-21-rohinik-website-architecture-design.md)

Each plan is a checkpoint. Implementation may not begin on Plan N+1 until Plan N passes its Definition of Done and Architecture Compliance check.

---

## Plan Status

| Plan | Goal | Status | Depends On |
|---|---|---|---|
| 0 | Architecture (frozen) | ✅ Complete | — |
| 1 | Scaffold & Design System | 🚧 In Progress | Plan 0 |
| 2 | Content Layer | 📋 Planned | Plan 1 |
| 3 | Specification Graph | 📋 Planned | Plan 2 |
| 4 | Homepage | 📋 Planned | Plan 3 |
| 5 | Documentation Engine | 📋 Planned | Plan 3 |
| 6 | Remaining Pages | 📋 Planned | Plan 5 |
| 7 | Search | 📋 Planned | Plan 3 |
| 8 | Production Readiness | 📋 Planned | Plans 6 + 7 |

---

## Plan 1 — Scaffold & Design System

**Objective:** Working Next.js 15 workspace with correct visual identity, deployable to Vercel.

**Deliverables:**
- `rohinik/` workspace (pnpm + workspace, `apps/website/`)
- Tailwind config with all DESIGN-0001 tokens
- Dark mode via `next-themes` (class strategy, inverse token set)
- Google Fonts loaded (Hanken Grotesk, Inter, JetBrains Mono)
- Base UI primitives: `Button`, `Badge`, `Card`, `Timeline`
- Layout: `TopNav` (9-item flat nav, glassmorphism), `Footer`
- Placeholder pages for all 9 routes (no content)
- Deployed to Vercel

**Entry criteria:** Architecture v1.0 frozen (✅)

**Exit criteria / Definition of Done:**
- [ ] `pnpm dev` runs without errors
- [ ] `pnpm build` produces no TypeScript errors
- [ ] All 9 routes return 200, no broken links
- [ ] Tailwind token smoke test: primary=#000000, secondary=#00668a, surface=#f7f9fb
- [ ] Dark mode toggle switches class on `<html>` and applies inverse tokens
- [ ] Fonts load correctly (Hanken Grotesk headlines, JetBrains Mono nav)
- [ ] TopNav renders all 9 items, glassmorphism bar visible on scroll
- [ ] 0px border-radius on Button, Card, Badge confirmed in browser
- [ ] No shadows anywhere — only border-based depth
- [ ] Lighthouse score ≥ 90 on placeholder homepage (production build)
- [ ] Deployed and accessible at Vercel preview URL
- [ ] Architecture Compliance check passed (see below)

**Architecture Compliance:**
- [ ] Repository layout matches spec exactly (`apps/website/`, `content/en/`, `lib/`, etc.)
- [ ] No `packages/ui` introduced
- [ ] shadcn/ui not installed yet (deferred to Plan 7 where Command/Dialog are needed)
- [ ] All Tailwind token names match DESIGN-0001 exactly
- [ ] URL structure matches spec (`/specifications/`, `/ecosystem/`, `/releases/`, etc.)

---

## Plan 2 — Content Layer

**Objective:** Type-safe MDX pipeline with Zod-validated frontmatter, build profiles, and asset pipeline.

**Deliverables:**
- `lib/content/schemas.ts` — Zod schemas for all content types
- `lib/content/loader.ts` — MDX file reader + frontmatter parser
- `lib/content/parser.ts` — MDX compilation pipeline via `@next/mdx`
- `lib/content/relationships.ts` — typed edge resolution
- `lib/content/navigation.ts` — sidebar tree builder
- Build validation: all metadata, content, and navigation checks
- Build profiles: `development` / `preview` / `production`
- Asset pipeline: spec-adjacent assets copied to output
- Seed content: 2 sample specs (one AFS, one ADR) exercising all fields
- Full test suite for schemas and loader

**Entry criteria:** Plan 1 Definition of Done passed

**Exit criteria / Definition of Done:**
- [ ] All Zod schemas compile with strict TypeScript
- [ ] `ContentNode`, `Specification`, `SpecOwner`, `SpecHistoryEntry` types exported and correct
- [ ] Valid seed spec loads without errors
- [ ] Invalid frontmatter (missing `summary`, bad `status`, bad `version`) throws at build time
- [ ] Duplicate IDs detected and throw
- [ ] Circular relationship detection working (see Plan 3 — validated here)
- [ ] `BUILD_PROFILE=production pnpm build` fails on warnings
- [ ] `BUILD_PROFILE=development pnpm build` succeeds with warnings logged
- [ ] Spec-adjacent assets copied to correct output path
- [ ] All tests pass: `pnpm test`
- [ ] Architecture Compliance check passed

**Architecture Compliance:**
- [ ] Domain model interfaces match spec exactly (no added/removed fields)
- [ ] `DocumentKind`, `DocumentStatus`, `DocumentStability`, `DocumentClassification` enums match spec
- [ ] `SpecOwner.type` enum matches spec
- [ ] Relationship fields are typed, no catch-all `related` field present
- [ ] Content paths use `content/en/` prefix (localization-ready)

---

## Plan 3 — Specification Graph

**Objective:** All `.generated/` artifacts produced from content at build time, deterministically.

**Deliverables:**
- `lib/graph/spec-graph.ts` — builds `SpecificationGraph` (nodes + typed edges)
- `lib/graph/dependency-graph.ts` — cycle detection, orphan detection
- `lib/graph/content-graph.ts` — stub for future graphs
- `lib/search.ts` — scoped search index generator
- All generated artifacts: `navigation.json`, `spec-manifest.json`, `spec-graph.json`, `categories.json`, `search/*.json`, `sitemap.json`
- Tests for graph building, cycle detection, orphan detection, artifact determinism

**Entry criteria:** Plan 2 Definition of Done passed

**Exit criteria / Definition of Done:**
- [ ] `spec-manifest.json` generated with all seed spec fields
- [ ] `spec-graph.json` contains correct nodes and typed edges
- [ ] `navigation.json` sidebar tree correct for seed content
- [ ] `search/specs.json` contains entries matching `SearchEntry` interface
- [ ] Identical inputs produce byte-for-byte identical JSON output (determinism test)
- [ ] JSON keys sorted lexicographically, IDs sorted alphabetically
- [ ] Circular `depends_on` chain in test fixture breaks build
- [ ] Orphan detection logs warning (development profile) or fails (production profile)
- [ ] `decisions` field reverse-index present in `spec-manifest.json`
- [ ] All tests pass
- [ ] Architecture Compliance check passed

**Architecture Compliance:**
- [ ] `SearchEntry` interface matches spec exactly
- [ ] Generated artifact filenames match spec exactly
- [ ] `.generated/` added to `.gitignore`
- [ ] Graph namespace model allows future `DocumentationGraph` without restructuring

---

## Plan 4 — Homepage

**Objective:** Complete `/` page with all sections. No placeholder content.

**Deliverables:**
- `Hero.tsx` — split layout: headline + CTA left, arch layer preview right
- `ArchDiagram.tsx` — stacked horizontal layers, click-to-expand, 7 layers
- `RS1Dashboard.tsx` — implementation status grid from spec frontmatter
- `SpecsOverview.tsx` — category cards from spec-graph
- `RepoMap.tsx` — public repository links
- `Roadmap.tsx` — timeline component (DESIGN-0001 style)
- `Ecosystem.tsx` — drivers, skills, packs, templates, memories sections

**Entry criteria:** Plan 3 Definition of Done passed

**Exit criteria / Definition of Done:**
- [ ] All homepage sections render without errors
- [ ] `ArchDiagram` layer expand/collapse works, keyboard accessible
- [ ] `RS1Dashboard` reads from `spec-manifest.json` (not hardcoded)
- [ ] `SpecsOverview` category counts match generated `categories.json`
- [ ] Dark mode correct on all sections
- [ ] Mobile layout correct (1-column, 64px section gaps)
- [ ] Desktop layout correct (1280px max-width, 40px margins, 96px section gaps)
- [ ] Lighthouse ≥ 95 on homepage
- [ ] Architecture Compliance check passed

**Architecture Compliance:**
- [ ] No hardcoded spec data — all from `.generated/` artifacts
- [ ] No new color tokens introduced
- [ ] No border-radius on structural components
- [ ] Dot-grid used on hero background

---

## Plan 5 — Documentation Engine

**Objective:** Full specification browsing + MDX documentation pages.

**Deliverables:**
- `DocSidebar.tsx` — sidebar navigation from `navigation.json`
- `SpecCard.tsx`, `SpecHeader.tsx`, `SpecHistory.tsx`, `SpecDecisions.tsx`, `RelatedDocs.tsx`, `DependencyGraph.tsx`
- `mdx/components.tsx` — MDX component overrides
- `/specifications` index page
- `/specifications/[version]/[category]/[id]` detail page
- `/documentation/[...slug]` MDX pages
- `/governance` MDX pages
- Version-aware routing (`/specifications/rs-1/...` and `/specifications/...` → rs-1 default)

**Entry criteria:** Plan 3 Definition of Done passed

**Exit criteria / Definition of Done:**
- [ ] Spec detail page renders all frontmatter fields correctly
- [ ] `SpecHistory` renders as timeline
- [ ] `SpecDecisions` renders ADR links with reverse-lookup
- [ ] `RelatedDocs` renders typed relationships (not generic "related")
- [ ] `/specifications/afs/0001` redirects to `/specifications/rs-1/afs/0001`
- [ ] `/specifications/rs-1/afs/0001` renders correctly (version pinned)
- [ ] DocSidebar highlights active page
- [ ] MDX prose renders with correct typography (Inter body, JetBrains Mono code)
- [ ] shiki syntax highlighting works
- [ ] Keyboard navigation through sidebar
- [ ] Architecture Compliance check passed

**Architecture Compliance:**
- [ ] URL structure matches spec (`/specifications/[version]/[category]/[id]`)
- [ ] No catch-all relationship rendering — typed edges only
- [ ] `decisions` field renders as separate "Architectural Decisions" section

---

## Plan 6 — Remaining Pages

**Objective:** All remaining routes populated with real content.

**Deliverables:**
- `/architecture` — interactive layered diagram + per-layer detail
- `/rs-1` — implementation status dashboard
- `/ecosystem` — registry, extensions, packages, skills
- `/releases` — static release data
- `/community` — contribution links, governance, channels

**Entry criteria:** Plan 5 Definition of Done passed

**Exit criteria / Definition of Done:**
- [ ] All routes return 200, no placeholder content
- [ ] `/architecture` layer expand/collapse correct
- [ ] `/rs-1` dashboard aggregates from spec frontmatter
- [ ] All pages responsive (mobile + desktop)
- [ ] Dark mode correct on all pages
- [ ] Architecture Compliance check passed

**Architecture Compliance:**
- [ ] `/releases/` route used (not `/downloads/`)
- [ ] `/ecosystem/` route used (not `/registry/`)
- [ ] No new routes added beyond spec

---

## Plan 7 — Search

**Objective:** `⌘K` search palette working end-to-end with ranked results.

**Deliverables:**
- shadcn/ui `Command` + `Dialog` installed (first time shadcn is added)
- Search client consuming `search/*.json` static files
- Result ranking: exact ID → title → keywords → tags → summary → body
- Scoped search (filter by kind: specs, docs, blog, tutorials)
- Keyboard navigation: `⌘K` to open, `↑↓` to navigate, `Enter` to select, `Esc` to close
- `DropdownMenu` for mobile nav (shadcn)

**Entry criteria:** Plan 3 Definition of Done passed (search indexes exist)

**Exit criteria / Definition of Done:**
- [ ] `⌘K` opens search dialog
- [ ] Typing `AFS-0001` returns exact ID match as first result
- [ ] Results ranked correctly across all 6 priority tiers
- [ ] Scoped search filter works
- [ ] Keyboard navigation fully functional
- [ ] No network requests — all search is client-side from static JSON
- [ ] Search accessible: ARIA labels, focus management correct
- [ ] Architecture Compliance check passed

**Architecture Compliance:**
- [ ] `SearchEntry` interface matches spec exactly
- [ ] No dynamic search server introduced
- [ ] shadcn used only for `Command`, `Dialog`, `DropdownMenu` — nothing else

---

## Plan 8 — Production Readiness

**Objective:** Production-deployable website passing all quality gates.

**Deliverables:**
- SEO metadata component (`<title>`, `<meta>`, canonical URLs)
- Open Graph image generation per page
- `robots.txt`
- Sitemap route (from generated `sitemap.json`)
- RSS feed via `app/api/rss/`
- Uppercase → lowercase redirect middleware
- Plausible Analytics integration (privacy-first)
- Lighthouse audit ≥ 95 all pages
- WCAG AA audit
- `BUILD_PROFILE=production` CI pipeline

**Entry criteria:** Plans 6 + 7 Definition of Done passed

**Exit criteria / Definition of Done:**
- [ ] Lighthouse ≥ 95: Performance, Accessibility, Best Practices, SEO — all pages
- [ ] WCAG AA: no errors in axe audit
- [ ] `GET /robots.txt` returns correct content
- [ ] `GET /sitemap.xml` returns valid XML with all routes
- [ ] RSS feed valid XML
- [ ] `GET /SPECIFICATIONS/RS-1/AFS/0001` → 301 → `/specifications/rs-1/afs/0001`
- [ ] OG image renders correctly for spec pages
- [ ] Plausible script loads, no personal data collected
- [ ] `BUILD_PROFILE=production pnpm build` green on CI
- [ ] No TODOs, no placeholder content, no fake data anywhere
- [ ] Architecture Compliance check passed

**Architecture Compliance:**
- [ ] No new routes added
- [ ] Canonical URL rules enforced (no trailing slash, lowercase)
- [ ] Analytics uses no personal data
- [ ] Static generation confirmed — no runtime server

---

## Universal Architecture Compliance Checklist

Applied at every plan's exit gate:

- [ ] Repository layout unchanged from Architecture v1.0
- [ ] DESIGN-0001 token names unchanged
- [ ] Domain model interfaces unchanged (`ContentNode`, `Specification`, etc.)
- [ ] Information architecture unchanged (9 nav items, frozen routes)
- [ ] URL immutability policy enforced
- [ ] Generated artifact schema unchanged
- [ ] No `packages/ui` introduced
- [ ] No server-side database introduced
- [ ] No user authentication introduced
- [ ] `BUILD_PROFILE=production` CI passes

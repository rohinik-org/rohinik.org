# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

Static design asset repository for the **Rohinik Foundation Standards Portal**. No build system, no package manager, no test runner. All deliverables are:

- `code.html` — single-file HTML prototype of the standards portal (Tailwind CDN via `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">`)
- `Logo/code.html` — standalone SVG logo (128×128)
- `Logo_with_name/code.html` — standalone SVG logo with wordmark (240×60)
- `DESIGN.md` / `Logo/DESIGN.md` / `Logo_with_name/DESIGN.md` — design system spec (YAML frontmatter + prose)

## Development Workflow

Open HTML files directly in a browser — no server needed. To iterate:

```bash
# Windows
start code.html

# Or open via browser dev tools for live editing
```

For visual iteration on the portal prototype, use the Playwright browser tools to inspect and test `code.html`.

## Design System (from DESIGN.md)

All UI work must follow the **Technical Blueprint** design system. Key constraints:

**Colors** — achromatic palette. Never add decorative color outside these tokens:
- `primary`: `#000000` (buttons, headings)
- `secondary`: `#00668a` (links, active nav, progress)
- `tertiary-container`: `#0b1c30` (high-emphasis containers)
- Surfaces: `#ffffff` → `#f7f9fb` → `#eceef0` → `#e6e8ea` → `#e0e3e5`

**Typography** — three fonts only, loaded from Google Fonts:
- `Hanken Grotesk` — headlines (`headline-xl` 48px/700, `headline-lg` 32px/600)
- `Inter` — body text (`body-md` 16px/400)
- `JetBrains Mono` — labels, nav, buttons, code (`technical-code` 14px/500, `label-caps` 12px/600 uppercase)

**Layout** — 1280px max-width, 40px edge margins (desktop), 16px (mobile). 4px base unit. 96px section gaps (desktop), 64px (mobile).

**Shape language** — 0px border-radius on all primary elements (buttons, cards, inputs). Hard rule: no rounded corners on structural UI.

**Elevation** — no shadows. Depth via 1px `outline-muted` (`#76777d33`) borders and tonal surface layering. Dot-grid radial-gradient for large empty areas.

**Components:**
- Cards: `surface-container-high` header bar + 1px bottom border; `surface-container-lowest` content area; full border transitions to `primary` on hover
- Buttons: `technical-code` font, uppercase; primary = solid black; secondary = transparent + 1px black border
- Nav links: uppercase `label-caps`; active = `secondary` blue; inactive = `on-surface-variant`
- Timeline: vertical `outline-variant` line + 8×8px square markers (`secondary` = done, gray = pending)
- TopAppBar: `bg-white/90 backdrop-blur-xl` (95% opacity blur)

## Tailwind Config

`code.html` extends Tailwind with all design tokens as custom classes. All color, font, spacing, and font-size tokens from DESIGN.md are registered. Use these Tailwind utility classes — do not inline arbitrary CSS values that duplicate token values.

## Logo SVG Structure

The logo uses isometric layered diamond shapes (3 parallelogram layers + dashed vertical line):
- Bottom layer: `#102A43` at 40% opacity
- Middle layer: `#102A43` at 70% opacity  
- Top accent: `#10B981` (green — the only color outside the main palette, used only in the logo mark)
- Spine: dashed vertical line `#102A43` stroke-width 6, dasharray 4 4

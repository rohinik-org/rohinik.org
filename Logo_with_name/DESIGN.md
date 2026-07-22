---
name: Technical Blueprint
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#00668a'
  on-secondary: '#ffffff'
  secondary-container: '#8dd5fe'
  on-secondary-container: '#005d7e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#c3e8ff'
  secondary-fixed-dim: '#87cff8'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c68'
  tertiary-fixed: '#d3e3ff'
  tertiary-fixed-dim: '#b7c7e2'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485e'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  outline-muted: '#76777d33'
  on-surface-subtle: '#45464d'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  technical-code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
spacing:
  margin-edge: 40px
  gutter: 24px
  unit: 4px
  max-width: 1280px
  section-gap-desktop: 96px
  section-gap-mobile: 64px
---

## Brand & Style
The brand identity is rooted in **Structural Minimalism** with a **Technical/Industrial** edge. It is designed for developers, architects, and engineers who value precision, transparency, and documentation. 

The aesthetic borrows from architectural blueprints and terminal interfaces: high-contrast typography, strict grid alignment, and functional monochromatic surfaces. The emotional response is one of reliability, intellectual rigor, and "no-nonsense" engineering. Visual interest is generated through subtle textures (like the radial dot grid) and the juxtaposition of heavy sans-serif headings with thin monospaced technical labels.

## Colors
The palette is primarily achromatic, emphasizing content structure over decorative color. 

- **Primary (Black):** Used for core branding, primary buttons, and heavy headlines to provide a grounded, authoritative feel.
- **Secondary (Deep Blue):** Reserved for interactive links and progress indicators, providing a "technical" highlight without being distracting.
- **Tertiary (Midnight Navy):** Used for high-emphasis containers (like reference implementations) to distinguish them from standard documentation.
- **Neutral (Cool Grays):** A range of cool-toned grays (`#f7f9fb` to `#e0e3e5`) creates a layered surface hierarchy that mimics physical paper or professional software interfaces.

## Typography
The typography system uses a triple-threat font strategy to balance readability with a technical aesthetic:

1.  **Hanken Grotesk (Headlines):** High-impact, modern sans-serif for major section headers. It utilizes tight letter-spacing at large sizes to feel more cohesive.
2.  **Inter (Body):** A highly legible, neutral workhorse for descriptive text and long-form content.
3.  **JetBrains Mono (Technical/Labels):** Used for navigation, metadata, buttons, and "code-like" elements. This reinforces the foundation's focus on engineering and specifications. All monospaced labels should be set in uppercase for a "drafting board" look.

## Layout & Spacing
The layout follows a **Fixed-Width Centered Grid** for desktop and a **Fluid Content Model** for mobile.

- **Desktop:** Content is constrained to a 1280px max-width container with 40px outer margins. Large sections are separated by 96px gaps to ensure the technical information does not feel cluttered.
- **Mobile:** Margins shrink to 16px. Section gaps reduce to 64px.
- **Grids:** Card layouts use a 3-column grid for desktop, 2-column for tablet, and 1-column for mobile. All layout logic should be based on a 4px base unit.

## Elevation & Depth
This system avoids traditional shadows in favor of **Structural Outlines** and **Tonal Layering**.

- **Surfaces:** Depth is achieved by placing `surface-container-lowest` (pure white) elements against a `background` (off-white/cool gray).
- **Borders:** All cards and sections are defined by 1px solid borders using a low-opacity variant of the `outline` color (`#76777d33`). This mimics the look of a technical drawing.
- **Texture:** Large empty states or hero illustrations should use a subtle "Dot Grid" background pattern (radial-gradient) to reinforce the engineering/blueprint theme.
- **Glassmorphism:** The TopAppBar uses a 95% opacity blur effect to maintain context while scrolling without breaking the flat, industrial aesthetic.

## Shapes
The shape language is strictly **Sharp/Angular**. 

- **Corners:** 0px radius on all primary UI elements, including buttons, cards, and input fields. This conveys a sense of rigidity and precision.
- **Exceptions:** Very small "dot" indicators (like those in timeline lists) can be slightly rounded or circular to differentiate them from structural layout elements, but they should remain secondary.

## Components

- **Buttons:** Use monospaced font (`technical-code`). Primary buttons are solid black with white text. Secondary buttons are transparent with a 1px black border. Both should have square corners and clear transition states (e.g., background shifts on hover).
- **Cards:** Feature a header bar in `surface-container-high` with a 1px bottom border. Content lives in the `surface-container-lowest` area below. On hover, the entire card border should transition to the `primary` color.
- **Navigation:** Header links use uppercase `label-caps`. The active state should use the `secondary` blue color, while inactive states use `on-surface-variant`.
- **Timeline:** A vertical line in `outline-variant` with square 8x8px markers in the `secondary` color for completed steps and a gray square for pending steps.
- **Badges/Chips:** Small, rectangular, monospaced text blocks often used in card headers to denote specification versions or status codes.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const GLOBALS_PATH = resolve(__dirname, '../styles/globals.css');
const css = readFileSync(GLOBALS_PATH, 'utf8');

function block(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`, 'm'));
  if (!match) throw new Error(`CSS block not found: ${selector}`);
  return match[1];
}

function declaration(source: string, name: string): string | null {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`${escaped}\\s*:\\s*([^;\\n}]+)`, 'm'));

  return match?.[1]?.trim() ?? null;
}

const referenceTheme = block('@theme static');
const semanticTheme = block('@theme inline');
const lightTheme = block(':root');
const darkTheme = block('.dark');

describe('DESIGN-0001 reference tokens', () => {
  it.each([
    ['--ref-color-primary', '#000000'],
    ['--ref-color-on-primary', '#ffffff'],
    ['--ref-color-secondary', '#00668a'],
    ['--ref-color-surface', '#f7f9fb'],
    ['--ref-color-surface-container-lowest', '#ffffff'],
    ['--ref-color-inverse-surface', '#2d3133'],
    ['--ref-color-inverse-on-surface', '#eff1f3'],
    ['--ref-color-inverse-primary', '#c6c6c6'],
    ['--ref-color-tertiary-container', '#0b1c30'],
    ['--ref-color-outline-muted', '#76777d33'],
    ['--ref-color-error', '#ba1a1a'],
  ])('%s equals %s', (name, expected) => {
    expect(declaration(referenceTheme, name)).toBe(expected);
  });
});

describe('semantic light theme', () => {
  it('maps the background to the DESIGN-0001 light surface', () => {
    expect(declaration(lightTheme, '--sem-background')).toBe('var(--ref-color-surface)');
  });

  it('maps primary to DESIGN-0001 black', () => {
    expect(declaration(lightTheme, '--sem-primary')).toBe('var(--ref-color-primary)');
  });
});

describe('semantic dark theme', () => {
  it('uses the DESIGN-0001 inverse surface', () => {
    expect(declaration(darkTheme, '--sem-background')).toBe('var(--ref-color-inverse-surface)');
  });

  it('uses the DESIGN-0001 inverse foreground', () => {
    expect(declaration(darkTheme, '--sem-on-background')).toBe(
      'var(--ref-color-inverse-on-surface)',
    );
  });
});

describe('Tailwind semantic utility mapping', () => {
  it.each([
    ['--color-background', 'var(--sem-background)'],
    ['--color-on-background', 'var(--sem-on-background)'],
    ['--color-surface', 'var(--sem-surface)'],
    ['--color-on-surface', 'var(--sem-on-surface)'],
    ['--color-primary', 'var(--sem-primary)'],
    ['--color-on-primary', 'var(--sem-on-primary)'],
    ['--color-secondary', 'var(--sem-secondary)'],
  ])('%s maps to %s', (name, expected) => {
    expect(declaration(semanticTheme, name)).toBe(expected);
  });
});

describe('DESIGN-0001 structural tokens', () => {
  it.each([
    ['--radius-sm', '0px'],
    ['--radius-md', '0px'],
    ['--radius-lg', '0px'],
    ['--radius-xl', '0px'],
  ])('%s is zero', (name, expected) => {
    expect(declaration(referenceTheme, name)).toBe(expected);
  });

  it('allows a full radius only for indicators', () => {
    expect(declaration(referenceTheme, '--radius-full')).toBe('9999px');
  });

  it('defines the navigation height', () => {
    expect(declaration(referenceTheme, '--spacing-nav-height')).toBe('64px');
  });

  it('defines the site container width', () => {
    expect(declaration(referenceTheme, '--container-site')).toBe('1280px');
  });
});

describe('Tailwind v4 configuration', () => {
  it('imports Tailwind', () => {
    expect(css).toContain('@import "tailwindcss"');
  });

  it('defines class-controlled dark mode', () => {
    expect(css).toContain('@custom-variant dark (&:where(.dark, .dark *));');
  });

  it('does not introduce box-shadow tokens', () => {
    expect(lightTheme).not.toMatch(/--shadow-[\w-]+\s*:/);
    expect(darkTheme).not.toMatch(/--shadow-[\w-]+\s*:/);
    expect(referenceTheme).not.toMatch(/--shadow-[\w-]+\s*:/);
  });

  it('defines logo variables', () => {
    expect(declaration(lightTheme, '--logo-base')).toBe('#102a43');
    expect(declaration(lightTheme, '--logo-accent')).toBe('#10b981');
  });
});

describe('dark-mode semantic integrity', () => {
  it('does not redefine Tailwind color utilities inside .dark', () => {
    expect(darkTheme).not.toMatch(/--color-background\s*:/);
    expect(darkTheme).not.toMatch(/--color-primary\s*:/);
  });

  it('switches semantic values instead', () => {
    expect(darkTheme).toContain('--sem-background');
    expect(darkTheme).toContain('--sem-primary');
  });
});

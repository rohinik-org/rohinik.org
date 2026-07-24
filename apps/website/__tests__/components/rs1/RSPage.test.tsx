import { describe, expect, it } from 'vitest';
import { rs1Content, COVERAGE_STATUS } from '@/content/reference-standards/rs1';
import type { CoverageStatus } from '@/content/reference-standards/rs1';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { RSHero } from '@/components/reference-standard/RSHero';

expect.extend(toHaveNoViolations);

describe('rs1Content shape', () => {
  it('hero has eyebrow, title, subtitle, description, register', () => {
    expect(rs1Content.hero.eyebrow).toBeTruthy();
    expect(rs1Content.hero.title).toBe('RS-1');
    expect(rs1Content.hero.subtitle).toBeTruthy();
    expect(rs1Content.hero.description).toBeTruthy();
    for (const item of rs1Content.hero.register) {
      expect(item.term).toBeTruthy();
      expect(item.description).toBeTruthy();
    }
  });

  it('authority chain has required fields', () => {
    for (const item of rs1Content.authority.chain) {
      expect(item.id).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.description).toBeTruthy();
    }
  });

  it('coverage has required fields', () => {
    for (const item of rs1Content.coverage) {
      expect(item.id).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.status).toBeTruthy();
    }
  });

  it('coverage status values are typed', () => {
    const validStatuses: CoverageStatus[] = ['implemented', 'partial', 'planned'];
    for (const item of rs1Content.coverage) {
      expect(validStatuses).toContain(item.status);
    }
  });

  it('COVERAGE_STATUS has IMPLEMENTED, PARTIAL, PLANNED', () => {
    expect(COVERAGE_STATUS.IMPLEMENTED).toBe('implemented');
    expect(COVERAGE_STATUS.PARTIAL).toBe('partial');
    expect(COVERAGE_STATUS.PLANNED).toBe('planned');
  });

  it('architectureMapping has canonicalPackage and authority on every entry', () => {
    for (const entry of rs1Content.architectureMapping) {
      expect(entry.canonicalPackage).toMatch(/^@rohinik-org\//);
      expect(entry.authority.label).toBeTruthy();
      expect(entry.authority.specification).toBeTruthy();
    }
  });

  it('conformance chain has string items', () => {
    for (const item of rs1Content.conformance.chain) {
      expect(typeof item).toBe('string');
      expect(item.length).toBeGreaterThan(0);
    }
  });

  it('lifecycle has steps with required fields', () => {
    for (const step of rs1Content.lifecycle.steps) {
      expect(step.id).toBeTruthy();
      expect(step.label).toBeTruthy();
      expect(step.description).toBeTruthy();
    }
  });
});

describe('RSHero', () => {
  it('renders H1 with text RS-1', () => {
    render(<RSHero />);
    expect(screen.getByRole('heading', { level: 1, name: /^rs-1$/i })).toBeInTheDocument();
  });

  it('renders eyebrow text', () => {
    render(<RSHero />);
    expect(screen.getByText(rs1Content.hero.eyebrow)).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<RSHero />);
    expect(screen.getByText(rs1Content.hero.subtitle)).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<RSHero />);
    expect(screen.getByText(rs1Content.hero.description)).toBeInTheDocument();
  });

  it('renders all register terms as dt elements', () => {
    render(<RSHero />);
    for (const item of rs1Content.hero.register) {
      expect(screen.getByText(item.term)).toBeInTheDocument();
    }
  });

  it('renders all register descriptions as dd elements', () => {
    render(<RSHero />);
    for (const item of rs1Content.hero.register) {
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }
  });

  it('section has id="overview"', () => {
    render(<RSHero />);
    expect(document.getElementById('overview')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<RSHero />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

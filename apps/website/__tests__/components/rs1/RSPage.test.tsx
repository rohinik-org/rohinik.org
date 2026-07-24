import { describe, expect, it } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';
import { rs1Content, COVERAGE_STATUS } from '@/content/reference-standards/rs1';
import type { CoverageStatus } from '@/content/reference-standards/rs1';

expect.extend(toHaveNoViolations);

describe('rs1Content shape', () => {
  it('hero has eyebrow, title, subtitle, description, register', () => {
    expect(rs1Content.hero.eyebrow).toBeTruthy();
    expect(rs1Content.hero.title).toBe('RS-1');
    expect(rs1Content.hero.subtitle).toBeTruthy();
    expect(rs1Content.hero.description).toBeTruthy();
    expect(rs1Content.hero.register).toHaveLength(4);
  });

  it('authority chain has 5 levels', () => {
    expect(rs1Content.authority.chain).toHaveLength(5);
  });

  it('coverage has 8 entries', () => {
    expect(rs1Content.coverage).toHaveLength(8);
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

  it('conformance chain has 5 items', () => {
    expect(rs1Content.conformance.chain).toHaveLength(5);
  });

  it('lifecycle has 5 steps', () => {
    expect(rs1Content.lifecycle.steps).toHaveLength(5);
  });
});

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AuthorityModel } from '@/components/governance/AuthorityModel';
import { governanceContent } from '@/content/governance';

expect.extend(toHaveNoViolations);

const EXPECTED_ORDER = [
  'Constitution',
  'Architecture Board',
  'Foundation Specification',
  'Architectural Specifications',
  'Runtime Specifications',
  'Reference Implementation',
  'Third-party Implementations',
];

describe('AuthorityModel', () => {
  it('renders 7 authority levels', () => {
    render(<AuthorityModel />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(7);
  });

  it('renders levels in correct order', () => {
    render(<AuthorityModel />);
    const items = screen.getAllByRole('listitem');
    const names = items.map((li) => {
      for (const name of EXPECTED_ORDER) {
        if (li.textContent.includes(name)) return name;
      }
      return null;
    });
    expect(names).toEqual(EXPECTED_ORDER);
  });

  it('exactly one record has parent === null (Constitution is unique root)', () => {
    const roots = governanceContent.authorityModel.filter((r) => r.parent === null);
    expect(roots).toHaveLength(1);
    expect(roots[0]?.id).toBe('constitution');
  });

  it('every non-null parent resolves to an existing id', () => {
    const ids = new Set(governanceContent.authorityModel.map((r) => r.id));
    for (const record of governanceContent.authorityModel) {
      if (record.parent !== null) {
        expect(ids.has(record.parent)).toBe(true);
      }
    }
  });

  it('no cycles in parent chain', () => {
    const parentMap = new Map(governanceContent.authorityModel.map((r) => [r.id, r.parent]));
    for (const record of governanceContent.authorityModel) {
      const visited = new Set<string>();
      let current: string | null = record.id;
      while (current !== null) {
        expect(visited.has(current)).toBe(false);
        visited.add(current);
        current = parentMap.get(current) ?? null;
      }
    }
  });

  it('each level renders Owns and Cannot content', () => {
    render(<AuthorityModel />);
    const ownsHeadings = screen.getAllByText(/owns/i);
    const cannotHeadings = screen.getAllByText(/cannot/i);
    expect(ownsHeadings.length).toBeGreaterThanOrEqual(7);
    expect(cannotHeadings.length).toBeGreaterThanOrEqual(7);
  });

  it('uses a semantic ol element', () => {
    render(<AuthorityModel />);
    const ol = document.querySelector('ol');
    expect(ol).toBeInTheDocument();
  });

  it('each level has a stable anchor id', () => {
    render(<AuthorityModel />);
    for (const record of governanceContent.authorityModel) {
      const el = document.getElementById(`authority-${record.id}`);
      expect(el).toBeInTheDocument();
    }
  });

  it('has no axe violations', async () => {
    const { container } = render(<AuthorityModel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

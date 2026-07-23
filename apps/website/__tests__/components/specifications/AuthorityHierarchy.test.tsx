import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AuthorityHierarchy } from '@/components/specifications/AuthorityHierarchy';

expect.extend(toHaveNoViolations);

const EXPECTED_ORDER = [
  'LAW',
  'AX',
  'P',
  'INV',
  'R',
  'DEF',
  'REQ',
  'SEC',
  'L',
  'OBS',
  'NOTE',
  'BP',
  'EX',
  'ERR',
];

describe('AuthorityHierarchy', () => {
  it('renders a heading containing "authority hierarchy"', () => {
    render(<AuthorityHierarchy />);
    expect(screen.getByRole('heading', { name: /authority hierarchy/i })).toBeInTheDocument();
  });

  it('renders all 14 identifier prefixes', () => {
    render(<AuthorityHierarchy />);
    for (const prefix of EXPECTED_ORDER) {
      expect(screen.getByText(prefix)).toBeInTheDocument();
    }
  });

  it('renders prefixes in canonical AFS-0001 order', () => {
    render(<AuthorityHierarchy />);
    const items = screen.getAllByRole('listitem');
    // sort by length descending so longer prefixes (REQ, ERR, NOTE) match before shorter substrings (R, E)
    const byLength = [...EXPECTED_ORDER].sort((a, b) => b.length - a.length);
    const prefixes = items
      .map((li) => {
        const text = li.textContent.trim();
        const match = byLength.find((p) => text.startsWith(p));
        return match;
      })
      .filter(Boolean);
    expect(prefixes).toEqual(EXPECTED_ORDER);
  });

  it('LAW is labelled as highest authority', () => {
    render(<AuthorityHierarchy />);
    expect(screen.getByText(/highest authority/i)).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<AuthorityHierarchy />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

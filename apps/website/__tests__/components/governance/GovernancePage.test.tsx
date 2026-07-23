import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import GovernancePage from '@/app/governance/page';

expect.extend(toHaveNoViolations);

describe('GovernancePage', () => {
  it('has exactly one H1', () => {
    render(<GovernancePage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('H1 matches governance title', () => {
    render(<GovernancePage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /architecture evolves through explicit decisions/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all section headings', () => {
    render(<GovernancePage />);
    const headings = [
      /governance at a glance/i,
      /governance principles/i,
      /authority model/i,
      /governance lifecycle/i,
      /change process/i,
      /roles and responsibilities/i,
      /compatibility rules/i,
      /conformance/i,
      /^contribute$/i,
      /continue through the foundation/i,
    ];
    for (const pattern of headings) {
      expect(screen.getByRole('heading', { name: pattern })).toBeInTheDocument();
    }
  });

  it('sections are in canonical DOM order', () => {
    render(<GovernancePage />);
    const sectionIds = [
      'overview',
      'at-a-glance',
      'principles',
      'authority',
      'lifecycle',
      'change-process',
      'roles',
      'compatibility',
      'conformance',
      'contribution',
      'related',
    ];
    const sections = sectionIds.map((id) => document.getElementById(id));
    for (const section of sections) {
      expect(section).toBeTruthy();
    }
    for (let i = 0; i < sections.length - 1; i++) {
      const a = sections[i];
      const b = sections[i + 1];
      if (a && b) {
        expect(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      }
    }
  });

  it('every section has aria-labelledby', () => {
    render(<GovernancePage />);
    const sections = document.querySelectorAll('section');
    for (const section of sections) {
      expect(section.getAttribute('aria-labelledby')).toBeTruthy();
    }
  });

  it('no dead href="#" links', () => {
    render(<GovernancePage />);
    const links = document.querySelectorAll('a[href="#"]');
    expect(links).toHaveLength(0);
  });

  it('has no axe violations', async () => {
    const { container } = render(<GovernancePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

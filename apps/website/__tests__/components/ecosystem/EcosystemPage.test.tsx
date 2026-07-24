import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import EcosystemPage from '@/app/ecosystem/page';

expect.extend(toHaveNoViolations);

describe('EcosystemPage', () => {
  it('has exactly one H1', () => {
    render(<EcosystemPage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('H1 is "The Ecosystem"', () => {
    render(<EcosystemPage />);
    expect(screen.getByRole('heading', { level: 1, name: /^the ecosystem$/i })).toBeInTheDocument();
  });

  it('all 13 section id attributes present in DOM order', () => {
    render(<EcosystemPage />);
    const sectionIds = [
      'overview',
      'what-is-the-ecosystem',
      'ecosystem-overview',
      'principles',
      'foundation',
      'reference-standards',
      'capabilities',
      'providers',
      'tooling',
      'sdks',
      'community',
      'roadmap',
      'get-involved',
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
    render(<EcosystemPage />);
    const sections = document.querySelectorAll('section');
    for (const section of sections) {
      expect(section.getAttribute('aria-labelledby')).toBeTruthy();
    }
  });

  it('no dead href="#" links', () => {
    render(<EcosystemPage />);
    const deadLinks = Array.from(document.querySelectorAll('a[href="#"]'));
    expect(deadLinks).toHaveLength(0);
  });

  it('has no axe violations', async () => {
    const { container } = render(<EcosystemPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

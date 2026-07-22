import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HomePage from '@/app/(marketing)/page';

expect.extend(toHaveNoViolations);

describe('HomePage', () => {
  it('renders exactly 1 h1 with correct text', () => {
    render(<HomePage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('The Intelligent Computing Platform');
  });

  it('renders all section headings', () => {
    render(<HomePage />);
    const sectionHeadings = [
      'Why Rohinik Exists',
      'Seven-Layer Architecture',
      'Core Principles',
      'Execution Lifecycle',
      'Specification Registry',
      'Open Governance',
      'Build on Rohinik',
    ];
    for (const heading of sectionHeadings) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    }
  });

  it('primary CTA links to /architecture', () => {
    render(<HomePage />);
    const link = screen.getAllByRole('link', { name: 'READ THE ARCHITECTURE' })[0];
    expect(link).toHaveAttribute('href', '/architecture');
  });

  it('has no axe violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

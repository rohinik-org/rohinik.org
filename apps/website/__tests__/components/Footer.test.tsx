import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

describe('Footer', () => {
  it('has a contentinfo landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeDefined();
  });

  it('renders foundation name', () => {
    render(<Footer />);
    expect(screen.getByText(/Rohinik Foundation/)).toBeDefined();
  });

  it('renders GitHub external link with rel=noopener', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /github/i });
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(link.getAttribute('href')).toContain('github.com');
  });

  it('renders governance internal link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /governance/i });
    expect(link.getAttribute('href')).toBe('/governance');
  });

  it('renders founding year without relying on runtime date', () => {
    render(<Footer />);
    expect(screen.getByText(/2026/)).toBeDefined();
  });
});

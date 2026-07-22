import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HeroSection } from '@/components/home/HeroSection';

expect.extend(toHaveNoViolations);

describe('HeroSection', () => {
  it('renders H1 with correct text', () => {
    render(<HeroSection />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'The Intelligent Computing Platform' }),
    ).toBeInTheDocument();
  });

  it('renders eyebrow label', () => {
    render(<HeroSection />);
    expect(screen.getByText('ROHINIK FOUNDATION')).toBeInTheDocument();
  });

  it('renders both CTA links', () => {
    render(<HeroSection />);
    const readLink = screen.getByRole('link', { name: 'READ THE ARCHITECTURE' });
    const browseLink = screen.getByRole('link', { name: 'BROWSE SPECIFICATIONS' });
    expect(readLink).toHaveAttribute('href', '/architecture');
    expect(browseLink).toHaveAttribute('href', '/specifications');
  });

  it('renders all 3 principles', () => {
    render(<HeroSection />);
    expect(screen.getByText('Memory First')).toBeInTheDocument();
    expect(screen.getByText('Capability First')).toBeInTheDocument();
    expect(screen.getByText('LLM Last')).toBeInTheDocument();
  });

  it('renders architecture miniature with 7 items in the ol', () => {
    render(<HeroSection />);
    const archOl = screen.getAllByRole('list').find((el) => el.tagName === 'OL');
    if (!archOl) throw new Error('Architecture OL not found');
    expect(within(archOl).getAllByRole('listitem')).toHaveLength(7);
  });

  it('has no axe violations', async () => {
    const { container } = render(<HeroSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

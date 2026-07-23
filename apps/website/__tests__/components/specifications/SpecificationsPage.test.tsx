// apps/website/__tests__/components/specifications/SpecificationsPage.test.tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SpecificationsPage from '@/app/specifications/page';

expect.extend(toHaveNoViolations);

describe('SpecificationsPage', () => {
  it('renders exactly one H1', () => {
    render(<SpecificationsPage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('H1 identifies the page as the public contract', () => {
    render(<SpecificationsPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /public contract of the Rohinik platform/i }),
    ).toBeInTheDocument();
  });

  it('renders the specification registry heading', () => {
    render(<SpecificationsPage />);
    expect(screen.getByRole('heading', { name: /specification registry/i })).toBeInTheDocument();
  });

  it('renders the authority hierarchy heading', () => {
    render(<SpecificationsPage />);
    expect(screen.getByRole('heading', { name: /authority hierarchy/i })).toBeInTheDocument();
  });

  it('renders the identifier taxonomy heading', () => {
    render(<SpecificationsPage />);
    expect(
      screen.getByRole('heading', { name: /identifier.*taxonomy|taxonomy.*identifier/i }),
    ).toBeInTheDocument();
  });

  it('renders the specification lifecycle heading', () => {
    render(<SpecificationsPage />);
    expect(screen.getByRole('heading', { name: /specification lifecycle/i })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<SpecificationsPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ArchitecturePage from '@/app/architecture/page';

expect.extend(toHaveNoViolations);

describe('ArchitecturePage', () => {
  it('renders exactly one H1', () => {
    render(<ArchitecturePage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('H1 contains architecture title text', () => {
    render(<ArchitecturePage />);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /layered intelligent computing system/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all major section headings', () => {
    render(<ArchitecturePage />);
    for (const name of [
      /system properties/i,
      /architectural layers/i,
      /cross-cutting systems/i,
      /execution path/i,
      /architectural boundaries/i,
      /continue into the architecture/i,
    ]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
  });

  it('has no axe violations', async () => {
    const { container } = render(<ArchitecturePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

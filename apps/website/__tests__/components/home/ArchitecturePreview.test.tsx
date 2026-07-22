import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ArchitecturePreview } from '@/components/home/ArchitecturePreview';

expect.extend(toHaveNoViolations);

describe('ArchitecturePreview', () => {
  it('renders heading "Seven-Layer Architecture"', () => {
    render(<ArchitecturePreview />);
    expect(screen.getByRole('heading', { name: 'Seven-Layer Architecture' })).toBeInTheDocument();
  });

  it('renders exactly 7 list items in the ol', () => {
    render(<ArchitecturePreview />);
    const ol = screen.getByRole('list', { name: 'Architecture layers' });
    expect(within(ol).getAllByRole('listitem')).toHaveLength(7);
  });

  it('correct layer order: Shell first, Foundation last', () => {
    render(<ArchitecturePreview />);
    const ol = screen.getByRole('list', { name: 'Architecture layers' });
    const items = within(ol).getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Shell');
    expect(items[6]).toHaveTextContent('Foundation');
  });

  it('each layer is a link to /architecture#<id>', () => {
    render(<ArchitecturePreview />);
    const links = [
      { name: /Shell/i, href: '/architecture#shell' },
      { name: /Compiler/i, href: '/architecture#compiler' },
      { name: /Memory/i, href: '/architecture#memory' },
      { name: /Intelligence/i, href: '/architecture#intelligence' },
      { name: /Runtime/i, href: '/architecture#runtime' },
      { name: /Kernel/i, href: '/architecture#kernel' },
      { name: /Foundation/i, href: '/architecture#foundation' },
    ];
    for (const { name, href } of links) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('href', href);
    }
  });

  it('has no axe violations', async () => {
    const { container } = render(<ArchitecturePreview />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

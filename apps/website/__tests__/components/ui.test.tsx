import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Timeline, type TimelineItem } from '@/components/ui/Timeline';

describe('Button', () => {
  it('renders primary variant with correct class', () => {
    render(<Button variant="primary">READ THE SPEC</Button>);
    const btn = screen.getByRole('button');
    expect(btn.textContent).toBe('READ THE SPEC');
    expect(btn.className).toContain('bg-primary');
  });

  it('renders secondary variant with border', () => {
    render(<Button variant="secondary">VIEW ON GITHUB</Button>);
    expect(screen.getByRole('button').className).toContain('border-primary');
  });

  it('applies disabled state', () => {
    render(<Button disabled>DISABLED</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('accepts all reserved variant types without TypeScript error', () => {
    const btn: React.ReactElement<{ variant: string }> = <Button variant="danger">DELETE</Button>;
    expect(btn.props.variant).toBe('danger');
  });
});

describe('Badge', () => {
  it('renders text in uppercase mono style', () => {
    render(<Badge>APPROVED</Badge>);
    const badge = screen.getByText('APPROVED');
    expect(badge).toBeDefined();
    expect(badge.className).toContain('font-mono');
    expect(badge.className).toContain('uppercase');
  });
});

describe('Card', () => {
  it('renders title in header bar', () => {
    render(<Card title="AFS-0001">Card content</Card>);
    expect(screen.getByText('AFS-0001')).toBeDefined();
    expect(screen.getByText('Card content')).toBeDefined();
  });

  it('renders without title', () => {
    render(<Card>Content only</Card>);
    expect(screen.getByText('Content only')).toBeDefined();
  });
});

describe('Timeline', () => {
  const items: TimelineItem[] = [
    { label: 'Stage 1', description: 'Foundation', status: 'complete' },
    { label: 'Stage 2', description: 'Kernel', status: 'active' },
    { label: 'Stage 3', description: 'Runtime', status: 'planned' },
    { label: 'Stage 4', description: 'Intelligence', status: 'pending' },
  ];

  it('renders all item labels', () => {
    render(<Timeline items={items} />);
    items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeDefined();
    });
  });

  it('renders as a list', () => {
    render(<Timeline items={items} />);
    expect(screen.getByRole('list')).toBeDefined();
  });
});

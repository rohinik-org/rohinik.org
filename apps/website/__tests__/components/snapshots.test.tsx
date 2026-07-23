import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Timeline, type TimelineItem } from '@/components/ui/Timeline';

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', resolvedTheme: 'light', setTheme: vi.fn() }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

const timelineItems: TimelineItem[] = [
  { label: 'Foundation', status: 'complete' },
  { label: 'Kernel', status: 'active' },
  { label: 'Runtime', status: 'planned' },
];

describe('component snapshots', () => {
  it('TopNav matches snapshot', () => {
    const { container } = render(<TopNav />);
    expect(container).toMatchSnapshot();
  });

  it('Footer matches snapshot', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it('Button primary matches snapshot', () => {
    const { container } = render(<Button variant="primary">READ THE SPEC</Button>);
    expect(container).toMatchSnapshot();
  });

  it('Card with title matches snapshot', () => {
    const { container } = render(<Card title="AFS-0001">Specification content</Card>);
    expect(container).toMatchSnapshot();
  });

  it('Timeline matches snapshot', () => {
    const { container } = render(<Timeline items={timelineItems} />);
    expect(container).toMatchSnapshot();
  });
});

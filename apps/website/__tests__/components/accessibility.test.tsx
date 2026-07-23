import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Timeline, type TimelineItem } from '@/components/ui/Timeline';

expect.extend(toHaveNoViolations);

vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light', setTheme: vi.fn() }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('accessibility', () => {
  it('TopNav has no axe violations', async () => {
    const { container } = render(<TopNav />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Footer has no axe violations', async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Button has no axe violations', async () => {
    const { container } = render(<Button variant="primary">READ</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Timeline has no axe violations', async () => {
    const items: TimelineItem[] = [
      { label: 'Stage 1', status: 'complete' },
      { label: 'Stage 2', status: 'pending' },
    ];
    const { container } = render(<Timeline items={items} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

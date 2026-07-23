import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { TopNav } from '@/components/layout/TopNav';

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', resolvedTheme: 'light', setTheme: vi.fn() }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('TopNav', () => {
  it('renders all 9 navigation items', () => {
    act(() => {
      render(<TopNav />);
    });
    const labels = [
      'Home',
      'Architecture',
      'Specifications',
      'Governance',
      'RS-1',
      'Ecosystem',
      'Documentation',
      'Releases',
      'Community',
    ];
    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeDefined();
    });
  });

  it('has a main navigation landmark', () => {
    act(() => {
      render(<TopNav />);
    });
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeDefined();
  });

  it('has a skip-to-content link targeting #main-content', () => {
    act(() => {
      render(<TopNav />);
    });
    const skip = screen.getByText(/skip to/i);
    expect(skip.getAttribute('href')).toBe('#main-content');
  });

  it('has a dark mode toggle button', () => {
    act(() => {
      render(<TopNav />);
    });
    expect(screen.getByLabelText(/theme/i)).toBeDefined();
  });
});

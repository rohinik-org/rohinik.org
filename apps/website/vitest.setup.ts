import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Hanken_Grotesk: () => ({ variable: '--font-hanken', className: 'font-hanken' }),
  Inter: () => ({ variable: '--font-inter', className: 'font-inter' }),
  JetBrains_Mono: () => ({ variable: '--font-jetbrains', className: 'font-jetbrains' }),
}));

// next-themes calls window.matchMedia — jsdom doesn't have it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

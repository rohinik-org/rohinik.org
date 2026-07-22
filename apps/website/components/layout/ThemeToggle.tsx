'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

type ThemeOption = 'system' | 'light' | 'dark';
const CYCLE: ThemeOption[] = ['system', 'light', 'dark'];
const LABELS: Record<ThemeOption, string> = { system: 'SYSTEM', light: 'LIGHT', dark: 'DARK' };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current: ThemeOption = CYCLE.includes(theme as ThemeOption)
    ? (theme as ThemeOption)
    : 'system';
  const next: ThemeOption = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length] ?? 'system';

  if (!mounted) {
    // ponytail: renders button pre-mount so aria-label is queryable in tests; SSR sees aria-hidden placeholder
    return (
      <button
        aria-label={`Theme: ${LABELS[current]}. Click to switch to ${LABELS[next]}`}
        aria-hidden="true"
        disabled
        className="w-16 h-6"
      />
    );
  }

  return (
    <button
      onClick={() => {
        setTheme(next);
      }}
      aria-label={`Theme: ${LABELS[current]}. Click to switch to ${LABELS[next]}`}
      className={cn(
        'font-mono text-label-caps uppercase tracking-widest transition-colors',
        'px-2 py-1 border border-transparent hover:border-outline-variant',
        'text-on-surface-variant hover:text-on-surface',
      )}
    >
      {LABELS[current]}
    </button>
  );
}

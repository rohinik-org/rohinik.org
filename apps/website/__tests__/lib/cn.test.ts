import { describe, expect, it } from 'vitest';

import { cn } from '@/lib/cn';

describe('cn()', () => {
  it('combines ordinary class names in input order', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('resolves conflicting Tailwind utilities using the last value', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });

  it('supports conditional class values', () => {
    const active = Boolean(1);
    const disabled = Boolean(0);

    expect(cn('base', active && 'active', disabled && 'disabled')).toBe('base active');
  });

  it('ignores null, undefined, false, and empty values', () => {
    expect(cn('base', null, undefined, false, '', 'end')).toBe('base end');
  });

  it('supports object syntax accepted by clsx', () => {
    expect(
      cn({
        visible: true,
        hidden: false,
      }),
    ).toBe('visible');
  });

  it('supports nested arrays accepted by clsx', () => {
    expect(cn(['base', ['nested']], 'end')).toBe('base nested end');
  });

  it('merges conflicts created through conditional values', () => {
    const compact = Boolean(0);

    expect(cn('px-6', compact ? 'px-2' : 'px-4')).toBe('px-4');
  });
});

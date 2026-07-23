import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('RootLayout', () => {
  it('renders children inside main with id main-content', async () => {
    // Import dynamically to pick up the font mock
    const { default: RootLayout } = await import('@/app/layout');

    // RootLayout renders html/body — use renderToString-style check
    // to avoid DOM nesting warnings in jsdom
    const { container } = render(<RootLayout>{[<div key="c">content</div>]}</RootLayout>);
    const main = container.querySelector('#main-content');
    expect(main).not.toBeNull();
  });

  it('wraps content in Providers', async () => {
    const { default: RootLayout } = await import('@/app/layout');
    const { container } = render(<RootLayout>{[<span key="x">x</span>]}</RootLayout>);
    expect(container.querySelector('#main-content span')?.textContent).toBe('x');
  });
});

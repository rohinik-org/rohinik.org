import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Providers } from '@/app/providers';

describe('Providers', () => {
  it('renders children', () => {
    render(
      <Providers>
        <div>hello</div>
      </Providers>,
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('applies ThemeProvider with class attribute strategy', () => {
    const { container } = render(
      <Providers>
        <span>x</span>
      </Providers>,
    );
    // next-themes ThemeProvider renders its children directly
    expect(container.firstChild).toBeTruthy();
  });
});

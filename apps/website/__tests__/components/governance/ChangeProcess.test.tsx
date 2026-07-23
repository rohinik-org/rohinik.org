import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ChangeProcess } from '@/components/governance/ChangeProcess';

expect.extend(toHaveNoViolations);

describe('ChangeProcess', () => {
  it('renders exactly 6 steps', () => {
    render(<ChangeProcess />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(6);
  });

  it('step numbers are sequential 01-06', () => {
    render(<ChangeProcess />);
    for (const n of ['01', '02', '03', '04', '05', '06']) {
      expect(screen.getByText(n)).toBeInTheDocument();
    }
  });

  it('Publication step precedes Implementation step in DOM order', () => {
    render(<ChangeProcess />);
    const pub = screen.getByText('Publication').closest('li');
    const impl = screen.getByText('Implementation').closest('li');
    expect(pub).toBeInTheDocument();
    expect(impl).toBeInTheDocument();
    if (pub && impl) {
      expect(pub.compareDocumentPosition(impl) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it('governance callout aside contains the specifications-first message', () => {
    render(<ChangeProcess />);
    const aside = document.querySelector('aside');
    expect(aside).toBeInTheDocument();
    expect(aside?.textContent).toMatch(/specifications do/i);
  });

  it('uses a semantic ol element', () => {
    render(<ChangeProcess />);
    const ol = document.querySelector('ol');
    expect(ol).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<ChangeProcess />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

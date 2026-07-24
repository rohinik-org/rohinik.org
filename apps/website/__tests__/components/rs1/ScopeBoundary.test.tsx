import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ScopeBoundary } from '@/components/reference-standard/ScopeBoundary';
import { rs1Content } from '@/content/reference-standards/rs1';

expect.extend(toHaveNoViolations);

describe('ScopeBoundary', () => {
  it('renders section with id="scope"', () => {
    render(<ScopeBoundary />);
    expect(document.getElementById('scope')).toBeInTheDocument();
  });

  it('renders h2 "Scope and Authority"', () => {
    render(<ScopeBoundary />);
    expect(
      screen.getByRole('heading', { level: 2, name: /^scope and authority$/i }),
    ).toBeInTheDocument();
  });

  it('renders all authority chain labels', () => {
    render(<ScopeBoundary />);
    for (const item of rs1Content.authority.chain) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });

  it('renders all authority chain descriptions', () => {
    render(<ScopeBoundary />);
    for (const item of rs1Content.authority.chain) {
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }
  });

  it('RS-1 item appears after Reference Standards in DOM', () => {
    render(<ScopeBoundary />);
    const refStd = screen.getByText('Reference Standards').closest('li');
    const rs1 = screen.getByText('RS-1').closest('li');
    expect(refStd).toBeInTheDocument();
    expect(rs1).toBeInTheDocument();
    if (refStd && rs1) {
      expect(refStd.compareDocumentPosition(rs1) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it('callout paragraphs rendered (split on double newline)', () => {
    render(<ScopeBoundary />);
    const calloutParagraphs = rs1Content.authority.callout.split('\n\n');
    for (const para of calloutParagraphs) {
      expect(screen.getByText(para)).toBeInTheDocument();
    }
  });

  it('authority chain is an ordered list', () => {
    render(<ScopeBoundary />);
    expect(document.querySelector('ol')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<ScopeBoundary />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

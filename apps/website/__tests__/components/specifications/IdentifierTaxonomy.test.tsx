import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { IdentifierTaxonomy } from '@/components/specifications/IdentifierTaxonomy';

expect.extend(toHaveNoViolations);

describe('IdentifierTaxonomy', () => {
  it('renders a heading containing "identifier taxonomy"', () => {
    render(<IdentifierTaxonomy />);
    expect(
      screen.getByRole('heading', { name: /identifier.*taxonomy|taxonomy.*identifier/i }),
    ).toBeInTheDocument();
  });

  it('renders a semantic table', () => {
    render(<IdentifierTaxonomy />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('table has 14 data rows', () => {
    render(<IdentifierTaxonomy />);
    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');
    // 1 thead + 14 data rows
    expect(rows).toHaveLength(15);
  });

  it('LAW appears in the first data row', () => {
    render(<IdentifierTaxonomy />);
    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');
    expect(rows[1]).toHaveTextContent('LAW');
  });

  it('ERR appears in the last data row', () => {
    render(<IdentifierTaxonomy />);
    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');
    expect(rows[14]).toHaveTextContent('ERR');
  });

  it('shows identifier permanence callout', () => {
    render(<IdentifierTaxonomy />);
    expect(screen.getByText(/permanent references/i)).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<IdentifierTaxonomy />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

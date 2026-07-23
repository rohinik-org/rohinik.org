import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BoundaryRegister } from '@/components/architecture/BoundaryRegister';

expect.extend(toHaveNoViolations);

describe('BoundaryRegister', () => {
  it('renders a semantic table', () => {
    render(<BoundaryRegister />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('table has 6 data rows (one per boundary)', () => {
    render(<BoundaryRegister />);
    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');
    // 1 thead row + 6 data rows
    expect(rows).toHaveLength(7);
  });

  it('every row has non-empty from, to, contract, and rule cells', () => {
    render(<BoundaryRegister />);
    const table = screen.getByRole('table');
    const dataRows = within(table).getAllByRole('row').slice(1);
    for (const row of dataRows) {
      const cells = within(row).getAllByRole('cell');
      expect(cells).toHaveLength(4);
      for (const cell of cells) {
        expect(cell).not.toHaveTextContent('');
      }
    }
  });

  it('at least one boundary covers Memory (state boundary)', () => {
    render(<BoundaryRegister />);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText(/memory/i).length).toBeGreaterThan(0);
  });

  it('Foundation compliance boundary exists', () => {
    render(<BoundaryRegister />);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText(/foundation/i).length).toBeGreaterThan(0);
  });

  it('table has a caption for screen readers', () => {
    render(<BoundaryRegister />);
    expect(screen.getByRole('table', { name: /architectural boundaries/i })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<BoundaryRegister />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

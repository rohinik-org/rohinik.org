import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ExecutionPath } from '@/components/architecture/ExecutionPath';

expect.extend(toHaveNoViolations);

const EXPECTED_STAGES = [
  'Accept',
  'Resolve',
  'Compile',
  'Validate',
  'Reason',
  'Execute',
  'Observe',
  'Retain',
  'Present',
] as const;

describe('ExecutionPath', () => {
  it('renders 9 stages in the correct order', () => {
    render(<ExecutionPath />);
    const table = screen.getByRole('table', { name: /execution path/i });
    const rows = within(table).getAllByRole('row');
    // First row is thead, then 9 data rows
    expect(rows).toHaveLength(10);
    for (let i = 0; i < EXPECTED_STAGES.length; i++) {
      const row = rows[i + 1];
      const stage = EXPECTED_STAGES[i] as string;
      if (row) expect(row).toHaveTextContent(stage);
    }
  });

  it('Reason stage description does not imply mandatory LLM use', () => {
    render(<ExecutionPath />);
    const table = screen.getByRole('table', { name: /execution path/i });
    const allRows = within(table).getAllByRole('row');
    const reasonRow = allRows.find((r) => r.textContent.includes('Reason'));
    if (!reasonRow) throw new Error('Reason row not found');
    expect(reasonRow).toHaveTextContent(/only|where|when|insufficient/i);
    expect(reasonRow).not.toHaveTextContent(/always invoke|unconditionally/i);
  });

  it('table has a caption for screen readers', () => {
    render(<ExecutionPath />);
    expect(screen.getByRole('table', { name: /execution path/i })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<ExecutionPath />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

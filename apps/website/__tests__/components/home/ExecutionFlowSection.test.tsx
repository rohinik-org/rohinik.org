import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ExecutionFlowSection } from '@/components/home/ExecutionFlowSection';

expect.extend(toHaveNoViolations);

describe('ExecutionFlowSection', () => {
  it('renders heading "Execution Lifecycle"', () => {
    render(<ExecutionFlowSection />);
    expect(screen.getByRole('heading', { name: 'Execution Lifecycle' })).toBeInTheDocument();
  });

  it('renders exactly 7 list items', () => {
    render(<ExecutionFlowSection />);
    const ol = screen.getByRole('list', { name: 'Rohinik execution flow' });
    expect(within(ol).getAllByRole('listitem')).toHaveLength(7);
  });

  it('Intent is first stage, Remember is last', () => {
    render(<ExecutionFlowSection />);
    const ol = screen.getByRole('list', { name: 'Rohinik execution flow' });
    const items = within(ol).getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Intent');
    expect(items[6]).toHaveTextContent('Remember');
  });

  it('has no axe violations', async () => {
    const { container } = render(<ExecutionFlowSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ArchitectureExplorer } from '@/components/architecture/ArchitectureExplorer';

expect.extend(toHaveNoViolations);

describe('ArchitectureExplorer', () => {
  it('renders 7 layer selector buttons', () => {
    render(<ArchitectureExplorer />);
    const list = screen.getByRole('list', { name: /system stack/i });
    expect(within(list).getAllByRole('button')).toHaveLength(7);
  });

  it('first layer (Shell) is selected initially', () => {
    render(<ArchitectureExplorer />);
    const shellBtn = screen.getByRole('button', { name: /shell/i });
    expect(shellBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('all other layers start unselected', () => {
    render(<ArchitectureExplorer />);
    const notShell = ['Compiler', 'Memory', 'Intelligence', 'Runtime', 'Kernel', 'Foundation'];
    for (const label of notShell) {
      const btn = screen.getByRole('button', { name: new RegExp(label, 'i') });
      expect(btn).toHaveAttribute('aria-pressed', 'false');
    }
  });

  it('clicking Runtime updates the detail panel heading', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer />);
    await user.click(screen.getByRole('button', { name: /runtime/i }));
    expect(screen.getByRole('heading', { name: 'Runtime', level: 3 })).toBeInTheDocument();
  });

  it('Runtime detail shows responsibility text', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer />);
    await user.click(screen.getByRole('button', { name: /runtime/i }));
    expect(screen.getByText(/governed execution/i)).toBeInTheDocument();
  });

  it('detail panel has aria-live="polite"', () => {
    render(<ArchitectureExplorer />);
    const detail = document.getElementById('architecture-layer-detail');
    expect(detail).toHaveAttribute('aria-live', 'polite');
  });

  it('Runtime button gets aria-pressed=true after click', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer />);
    const runtimeBtn = screen.getByRole('button', { name: /runtime/i });
    await user.click(runtimeBtn);
    expect(runtimeBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('Shell button loses aria-pressed after Runtime is clicked', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer />);
    await user.click(screen.getByRole('button', { name: /runtime/i }));
    expect(screen.getByRole('button', { name: /shell/i })).toHaveAttribute('aria-pressed', 'false');
  });

  it('detail panel shows "Owns" section', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer />);
    await user.click(screen.getByRole('button', { name: /foundation/i }));
    expect(screen.getByRole('heading', { name: /owns/i })).toBeInTheDocument();
  });

  it('detail panel shows "Does not own" section', async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer />);
    await user.click(screen.getByRole('button', { name: /foundation/i }));
    expect(screen.getByRole('heading', { name: /does not own/i })).toBeInTheDocument();
  });

  it('layers are in correct order: Shell first, Foundation last', () => {
    render(<ArchitectureExplorer />);
    const list = screen.getByRole('list', { name: /system stack/i });
    const items = within(list).getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('Shell');
    expect(items[6]).toHaveTextContent('Foundation');
  });

  it('no duplicate IDs on the page', () => {
    render(<ArchitectureExplorer />);
    const allIds = Array.from(document.querySelectorAll('[id]')).map((el) => el.id);
    const unique = new Set(allIds);
    expect(allIds.length).toBe(unique.size);
  });

  it('has no axe violations in initial state', async () => {
    const { container } = render(<ArchitectureExplorer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no axe violations after selecting Runtime', async () => {
    const user = userEvent.setup();
    const { container } = render(<ArchitectureExplorer />);
    await user.click(screen.getByRole('button', { name: /runtime/i }));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

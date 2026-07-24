import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ArchitectureMapping } from '@/components/reference-standard/ArchitectureMapping';
import { rs1Content } from '@/content/reference-standards/rs1';

expect.extend(toHaveNoViolations);

describe('ArchitectureMapping', () => {
  it('renders a row for every mapping entry', () => {
    render(<ArchitectureMapping />);
    const rows = screen.getAllByRole('row');
    // +1 for header row
    expect(rows).toHaveLength(rs1Content.architectureMapping.length + 1);
  });

  it('every row has Layer, Canonical Package, and Governing Authority values', () => {
    render(<ArchitectureMapping />);
    for (const row of rs1Content.architectureMapping) {
      expect(screen.getByText(row.layer)).toBeInTheDocument();
      expect(screen.getByText(row.canonicalPackage)).toBeInTheDocument();
      // Authority column renders as "label — specification"
      // getAllByText used because all rows share FOUNDATION_AUTHORITY (same string appears N times)
      expect(
        screen.getAllByText(`${row.authority.label} — ${row.authority.specification}`).length,
      ).toBeGreaterThan(0);
    }
  });

  it('table has Layer, Canonical Package, Governing Authority column headers', () => {
    render(<ArchitectureMapping />);
    expect(screen.getByRole('columnheader', { name: /^layer$/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /canonical package/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /governing authority/i })).toBeInTheDocument();
  });

  it('every authority entry has label and specification', () => {
    for (const row of rs1Content.architectureMapping) {
      expect(row.authority.label).toBeTruthy();
      expect(row.authority.specification).toBeTruthy();
    }
  });

  it('all rows share the same governing specification (AFS-0001) until layer specs are published', () => {
    const specs = rs1Content.architectureMapping.map((r) => r.authority.specification);
    expect(new Set(specs).size).toBe(1);
    expect(specs[0]).toBe('AFS-0001');
  });

  it('canonicalPackage values are scoped @rohinik-org/ identifiers', () => {
    for (const row of rs1Content.architectureMapping) {
      expect(row.canonicalPackage).toMatch(/^@rohinik-org\//);
    }
  });

  it('all canonicalPackage values are unique (no duplicate package entries)', () => {
    const packages = rs1Content.architectureMapping.map((r) => r.canonicalPackage);
    expect(new Set(packages).size).toBe(rs1Content.architectureMapping.length);
  });

  it('has no axe violations', async () => {
    const { container } = render(<ArchitectureMapping />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

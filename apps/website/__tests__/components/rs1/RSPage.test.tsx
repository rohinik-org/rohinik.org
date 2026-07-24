import { describe, expect, it } from 'vitest';
import { rs1Content, COVERAGE_STATUS } from '@/content/reference-standards/rs1';
import type { CoverageStatus } from '@/content/reference-standards/rs1';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { RSHero } from '@/components/reference-standard/RSHero';
import { RSOverview } from '@/components/reference-standard/RSOverview';
import { ImplementedSpecifications } from '@/components/reference-standard/ImplementedSpecifications';
import { CapabilityCoverage } from '@/components/reference-standard/CapabilityCoverage';
import { ConformanceModel } from '@/components/reference-standard/ConformanceModel';
import { DesignPrinciples } from '@/components/reference-standard/DesignPrinciples';
import { RepositoryStructure } from '@/components/reference-standard/RepositoryStructure';
import { DevelopmentLifecycle } from '@/components/reference-standard/DevelopmentLifecycle';
import { RSReferences } from '@/components/reference-standard/RSReferences';

expect.extend(toHaveNoViolations);

describe('rs1Content shape', () => {
  it('hero has eyebrow, title, subtitle, description, register', () => {
    expect(rs1Content.hero.eyebrow).toBeTruthy();
    expect(rs1Content.hero.title).toBe('RS-1');
    expect(rs1Content.hero.subtitle).toBeTruthy();
    expect(rs1Content.hero.description).toBeTruthy();
    for (const item of rs1Content.hero.register) {
      expect(item.term).toBeTruthy();
      expect(item.description).toBeTruthy();
    }
  });

  it('authority chain has required fields', () => {
    for (const item of rs1Content.authority.chain) {
      expect(item.id).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.description).toBeTruthy();
    }
  });

  it('coverage has required fields', () => {
    for (const item of rs1Content.coverage) {
      expect(item.id).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(item.status).toBeTruthy();
    }
  });

  it('coverage status values are typed', () => {
    const validStatuses: CoverageStatus[] = ['implemented', 'partial', 'planned'];
    for (const item of rs1Content.coverage) {
      expect(validStatuses).toContain(item.status);
    }
  });

  it('COVERAGE_STATUS has IMPLEMENTED, PARTIAL, PLANNED', () => {
    expect(COVERAGE_STATUS.IMPLEMENTED).toBe('implemented');
    expect(COVERAGE_STATUS.PARTIAL).toBe('partial');
    expect(COVERAGE_STATUS.PLANNED).toBe('planned');
  });

  it('architectureMapping has canonicalPackage and authority on every entry', () => {
    for (const entry of rs1Content.architectureMapping) {
      expect(entry.canonicalPackage).toMatch(/^@rohinik-org\//);
      expect(entry.authority.label).toBeTruthy();
      expect(entry.authority.specification).toBeTruthy();
    }
  });

  it('conformance chain has string items', () => {
    for (const item of rs1Content.conformance.chain) {
      expect(typeof item).toBe('string');
      expect(item.length).toBeGreaterThan(0);
    }
  });

  it('lifecycle has steps with required fields', () => {
    for (const step of rs1Content.lifecycle.steps) {
      expect(step.id).toBeTruthy();
      expect(step.label).toBeTruthy();
      expect(step.description).toBeTruthy();
    }
  });
});

describe('RSHero', () => {
  it('renders H1 with text RS-1', () => {
    render(<RSHero />);
    expect(screen.getByRole('heading', { level: 1, name: /^rs-1$/i })).toBeInTheDocument();
  });

  it('renders eyebrow text', () => {
    render(<RSHero />);
    expect(screen.getByText(rs1Content.hero.eyebrow)).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<RSHero />);
    expect(screen.getByText(rs1Content.hero.subtitle)).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<RSHero />);
    expect(screen.getByText(rs1Content.hero.description)).toBeInTheDocument();
  });

  it('renders all register terms as dt elements', () => {
    render(<RSHero />);
    for (const item of rs1Content.hero.register) {
      expect(screen.getByText(item.term)).toBeInTheDocument();
    }
  });

  it('renders all register descriptions as dd elements', () => {
    render(<RSHero />);
    for (const item of rs1Content.hero.register) {
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }
  });

  it('section has id="overview"', () => {
    render(<RSHero />);
    expect(document.getElementById('overview')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<RSHero />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('RSOverview', () => {
  it('renders section with id="what-is-rs1"', () => {
    render(<RSOverview />);
    expect(document.getElementById('what-is-rs1')).toBeInTheDocument();
  });

  it('renders h2 "What is RS-1?"', () => {
    render(<RSOverview />);
    expect(
      screen.getByRole('heading', { level: 2, name: /^what is rs-1\?$/i }),
    ).toBeInTheDocument();
  });

  it('renders all purpose items', () => {
    render(<RSOverview />);
    for (const item of rs1Content.overview.purpose) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it('renders all notIntendedTo items', () => {
    render(<RSOverview />);
    for (const item of rs1Content.overview.notIntendedTo) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it('has no axe violations', async () => {
    const { container } = render(<RSOverview />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('ImplementedSpecifications', () => {
  it('renders section with id="implemented-specs"', () => {
    render(<ImplementedSpecifications />);
    expect(document.getElementById('implemented-specs')).toBeInTheDocument();
  });

  it('renders h2 "Implemented Specifications"', () => {
    render(<ImplementedSpecifications />);
    expect(
      screen.getByRole('heading', { level: 2, name: /^implemented specifications$/i }),
    ).toBeInTheDocument();
  });

  it('table has correct column headers including "Implementation Status"', () => {
    render(<ImplementedSpecifications />);
    expect(screen.getByRole('columnheader', { name: /^id$/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /^specification$/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /^version$/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /^status$/i })).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /^implementation status$/i }),
    ).toBeInTheDocument();
  });

  it('renders AFS-0001 row', () => {
    render(<ImplementedSpecifications />);
    expect(screen.getByText('AFS-0001')).toBeInTheDocument();
  });

  it('renders pending notice below table', () => {
    render(<ImplementedSpecifications />);
    expect(document.querySelector('[role="note"]')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<ImplementedSpecifications />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('CapabilityCoverage', () => {
  it('renders section with id="coverage"', () => {
    render(<CapabilityCoverage />);
    expect(document.getElementById('coverage')).toBeInTheDocument();
  });

  it('renders h2 "Capability Coverage"', () => {
    render(<CapabilityCoverage />);
    expect(
      screen.getByRole('heading', { level: 2, name: /^capability coverage$/i }),
    ).toBeInTheDocument();
  });

  it('renders all coverage labels', () => {
    render(<CapabilityCoverage />);
    for (const item of rs1Content.coverage) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });

  it('renders text status labels not symbols', () => {
    render(<CapabilityCoverage />);
    // Status must be text, not ✓ or ~ or ○
    const dds = document.querySelectorAll('dd');
    for (const dd of dds) {
      expect(dd.textContent).not.toMatch(/[✓~○]/);
    }
  });

  it('has no axe violations', async () => {
    const { container } = render(<CapabilityCoverage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('ConformanceModel', () => {
  it('renders conformance statement', () => {
    render(<ConformanceModel />);
    expect(screen.getByText(rs1Content.conformance.statement)).toBeInTheDocument();
  });

  it('renders all chain items', () => {
    render(<ConformanceModel />);
    for (const item of rs1Content.conformance.chain) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it('chain contains Architectural compatibility maintained', () => {
    expect(rs1Content.conformance.chain).toContain('Architectural compatibility maintained');
  });

  it('chain items are in an ordered list', () => {
    render(<ConformanceModel />);
    expect(document.querySelector('ol')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<ConformanceModel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('DesignPrinciples', () => {
  it('renders exactly 6 principle cards', () => {
    render(<DesignPrinciples />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(6);
  });

  it('principle indices are 01-06', () => {
    render(<DesignPrinciples />);
    for (const p of rs1Content.principles) {
      expect(screen.getByText(p.index)).toBeInTheDocument();
    }
  });

  it('has no axe violations', async () => {
    const { container } = render(<DesignPrinciples />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('RepositoryStructure', () => {
  it('renders all domain entries', () => {
    render(<RepositoryStructure />);
    for (const domain of rs1Content.repository.domains) {
      expect(screen.getByText(domain.label)).toBeInTheDocument();
    }
  });

  it('has no axe violations', async () => {
    const { container } = render(<RepositoryStructure />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('DevelopmentLifecycle', () => {
  it('renders 5 lifecycle steps', () => {
    render(<DevelopmentLifecycle />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(5);
  });

  it('Specification Published step precedes Release step in DOM', () => {
    render(<DevelopmentLifecycle />);
    const spec = screen.getByText('Specification Published').closest('li');
    const release = screen.getByText('Release').closest('li');
    expect(spec).toBeInTheDocument();
    expect(release).toBeInTheDocument();
    if (spec && release) {
      expect(spec.compareDocumentPosition(release) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it('callout contains specifications-follow message', () => {
    render(<DevelopmentLifecycle />);
    const callout = document.querySelector('[role="note"]');
    expect(callout).toBeInTheDocument();
    expect(callout?.textContent).toMatch(/specifications never follow/i);
  });

  it('does not contain text arrow characters as structural connectors', () => {
    render(<DevelopmentLifecycle />);
    // The lifecycle pipeline uses CSS borders, not → text characters
    const visibleArrows = Array.from(document.querySelectorAll('li')).filter((li) =>
      li.textContent.includes('→'),
    );
    expect(visibleArrows).toHaveLength(0);
  });

  it('has no axe violations', async () => {
    const { container } = render(<DevelopmentLifecycle />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('RSReferences', () => {
  it('renders a link for every reference', () => {
    render(<RSReferences />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(rs1Content.references.length);
  });

  it('no dead href="#" links', () => {
    render(<RSReferences />);
    expect(document.querySelectorAll('a[href="#"]')).toHaveLength(0);
  });

  it('has no axe violations', async () => {
    const { container } = render(<RSReferences />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

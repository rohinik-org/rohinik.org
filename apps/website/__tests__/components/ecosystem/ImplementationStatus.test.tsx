import { describe, it, expect } from 'vitest';
import {
  IMPLEMENTATION_STATUS,
  IMPLEMENTATION_STATUS_LABEL,
  ecosystemContent,
} from '@/content/ecosystem/ecosystem';
import type { ImplementationStatus } from '@/content/ecosystem/types';

describe('IMPLEMENTATION_STATUS constants', () => {
  it('AVAILABLE === "available"', () => {
    expect(IMPLEMENTATION_STATUS.AVAILABLE).toBe('available');
  });
  it('FOUNDATION_IMPLEMENTATION === "foundation-implementation"', () => {
    expect(IMPLEMENTATION_STATUS.FOUNDATION_IMPLEMENTATION).toBe('foundation-implementation');
  });
  it('IN_DEVELOPMENT === "in-development"', () => {
    expect(IMPLEMENTATION_STATUS.IN_DEVELOPMENT).toBe('in-development');
  });
  it('PLANNED === "planned"', () => {
    expect(IMPLEMENTATION_STATUS.PLANNED).toBe('planned');
  });
});

describe('IMPLEMENTATION_STATUS_LABEL', () => {
  it('has an entry for every ImplementationStatus value', () => {
    const statuses: ImplementationStatus[] = [
      'available',
      'foundation-implementation',
      'in-development',
      'planned',
    ];
    for (const s of statuses) {
      expect(IMPLEMENTATION_STATUS_LABEL[s]).toBeTruthy();
    }
  });
  it('labels are human-readable strings', () => {
    expect(IMPLEMENTATION_STATUS_LABEL['available']).toBe('Available');
    expect(IMPLEMENTATION_STATUS_LABEL['foundation-implementation']).toBe(
      'Foundation Implementation',
    );
    expect(IMPLEMENTATION_STATUS_LABEL['in-development']).toBe('In Development');
    expect(IMPLEMENTATION_STATUS_LABEL['planned']).toBe('Planned');
  });
});

describe('ecosystemContent data invariants', () => {
  it('TypeScript SDK status === "foundation-implementation"', () => {
    const ts = ecosystemContent.sdks.items.find((s) => s.language === 'TypeScript');
    expect(ts).toBeDefined();
    expect(ts?.status).toBe('foundation-implementation');
  });
  it('all capability domains have status === "planned"', () => {
    for (const d of ecosystemContent.capabilityEcosystem.domains) {
      expect(d.status).toBe('planned');
    }
  });
  it('all provider domains have status === "planned"', () => {
    for (const d of ecosystemContent.providerEcosystem.domains) {
      expect(d.status).toBe('planned');
    }
  });
  it('all tooling items have status === "planned"', () => {
    for (const t of ecosystemContent.tooling.tools) {
      expect(t.status).toBe('planned');
    }
  });
  it('overview cards: Specifications and Reference Standards are "available", rest are "planned"', () => {
    const specs = ecosystemContent.overview.cards.find((c) => c.label === 'Specifications');
    const rs = ecosystemContent.overview.cards.find((c) => c.label === 'Reference Standards');
    expect(specs?.status).toBe('available');
    expect(rs?.status).toBe('available');
    const rest = ecosystemContent.overview.cards.filter(
      (c) => c.label !== 'Specifications' && c.label !== 'Reference Standards',
    );
    for (const c of rest) {
      expect(c.status).toBe('planned');
    }
  });
  it('roadmap: Foundation milestone status === "completed"', () => {
    const foundation = ecosystemContent.roadmap.milestones.find((m) => m.label === 'Foundation');
    expect(foundation?.status).toBe('completed');
  });
  it('roadmap: Runtime milestone status === "active"', () => {
    const runtime = ecosystemContent.roadmap.milestones.find((m) => m.label === 'Runtime');
    expect(runtime?.status).toBe('active');
  });
  it('has exactly 12 capability domains', () => {
    expect(ecosystemContent.capabilityEcosystem.domains).toHaveLength(12);
  });
  it('has exactly 8 provider domains', () => {
    expect(ecosystemContent.providerEcosystem.domains).toHaveLength(8);
  });
  it('has exactly 8 tooling items', () => {
    expect(ecosystemContent.tooling.tools).toHaveLength(8);
  });
  it('has exactly 9 SDKs', () => {
    expect(ecosystemContent.sdks.items).toHaveLength(9);
  });
  it('has exactly 6 roadmap milestones', () => {
    expect(ecosystemContent.roadmap.milestones).toHaveLength(6);
  });
  it('has exactly 6 get-involved actions', () => {
    expect(ecosystemContent.getInvolved.actions).toHaveLength(6);
  });
  it('has exactly 6 overview cards', () => {
    expect(ecosystemContent.overview.cards).toHaveLength(6);
  });
  it('has exactly 4 principles', () => {
    expect(ecosystemContent.principles).toHaveLength(4);
  });
  it('foundation chain has 5 nodes', () => {
    expect(ecosystemContent.foundation.chain).toHaveLength(5);
  });
  it('foundation chain first node is Foundation Constitution', () => {
    expect(ecosystemContent.foundation.chain[0].label).toBe('Foundation Constitution');
  });
  it('foundation chain last node is Community Implementations', () => {
    const last = ecosystemContent.foundation.chain[ecosystemContent.foundation.chain.length - 1];
    expect(last.label).toBe('Community Implementations');
  });
  it('RS-1 reference standard is available', () => {
    const rs1 = ecosystemContent.referenceStandards.items.find((r) => r.id === 'rs-1');
    expect(rs1?.status).toBe('available');
    expect(rs1?.href).toBe('/reference-standards/rs-1');
  });
  it('RS-2 and RS-3 are planned with no href', () => {
    const rs2 = ecosystemContent.referenceStandards.items.find((r) => r.id === 'rs-2');
    const rs3 = ecosystemContent.referenceStandards.items.find((r) => r.id === 'rs-3');
    expect(rs2?.status).toBe('planned');
    expect(rs3?.status).toBe('planned');
    expect(rs2?.href).toBeUndefined();
    expect(rs3?.href).toBeUndefined();
  });
});

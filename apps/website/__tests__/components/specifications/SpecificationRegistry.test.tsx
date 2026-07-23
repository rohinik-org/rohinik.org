import { describe, expect, it } from 'vitest';
import { getSpecificationRegistry } from '@/lib/specifications/registry';

describe('getSpecificationRegistry', () => {
  it('returns a non-empty array', async () => {
    const specs = await getSpecificationRegistry();
    expect(specs.length).toBeGreaterThan(0);
  });

  it('contains unique specification identifiers', async () => {
    const specs = await getSpecificationRegistry();
    const ids = specs.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('contains unique slugs', async () => {
    const specs = await getSpecificationRegistry();
    const slugs = specs.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every record has a non-empty version', async () => {
    const specs = await getSpecificationRegistry();
    for (const spec of specs) {
      expect(spec.version.length).toBeGreaterThan(0);
    }
  });

  it('every status is a recognised value', async () => {
    const ALLOWED = ['draft', 'review', 'candidate', 'frozen', 'deprecated', 'superseded'];
    const specs = await getSpecificationRegistry();
    for (const spec of specs) {
      expect(ALLOWED).toContain(spec.status);
    }
  });

  it('every authority is a recognised value', async () => {
    const ALLOWED = [
      'constitutional',
      'foundational',
      'architectural',
      'normative',
      'informative',
      'operational',
    ];
    const specs = await getSpecificationRegistry();
    for (const spec of specs) {
      expect(ALLOWED).toContain(spec.authority);
    }
  });

  it('normative records have an authority set', async () => {
    const specs = await getSpecificationRegistry();
    for (const spec of specs.filter((s) => s.normative)) {
      expect(spec.authority.length).toBeGreaterThan(0);
    }
  });

  it('publishes AFS-0001 as frozen version 1.0', async () => {
    const specs = await getSpecificationRegistry();
    const afs = specs.find(({ id }) => id === 'AFS-0001');
    expect(afs).toMatchObject({ version: '1.0', status: 'frozen', normative: true });
  });

  it('every href starts with /specifications/', async () => {
    const specs = await getSpecificationRegistry();
    for (const spec of specs) {
      expect(spec.href).toMatch(/^\/specifications\//);
    }
  });

  it('no specification is simultaneously frozen and superseded', async () => {
    const specs = await getSpecificationRegistry();
    for (const spec of specs) {
      expect(spec.status === 'frozen' && spec.supersededBy.length > 0).toBe(false);
    }
  });

  it('publishedAt uses ISO date format when present', async () => {
    const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;
    const specs = await getSpecificationRegistry();
    for (const spec of specs) {
      if (spec.publishedAt) expect(spec.publishedAt).toMatch(ISO_RE);
      if (spec.updatedAt) expect(spec.updatedAt).toMatch(ISO_RE);
    }
  });
});

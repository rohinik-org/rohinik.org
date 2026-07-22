import { describe, it, expect } from 'vitest';
import {
  FOOTER_SECTIONS,
  FOOTER_EXTERNAL_LINKS,
  FOUNDATION_NAME,
  FOUNDATION_TAGLINE,
  FOUNDATION_YEAR,
} from '../footer.js';

describe('footer config', () => {
  it('has 3 footer sections', () => {
    expect(FOOTER_SECTIONS).toHaveLength(3);
  });

  it('every section has a title and at least one link', () => {
    FOOTER_SECTIONS.forEach((section) => {
      expect(section.title.length).toBeGreaterThan(0);
      expect(section.links.length).toBeGreaterThan(0);
    });
  });

  it('GitHub is in external links', () => {
    const github = FOOTER_EXTERNAL_LINKS.find((l) => l.label === 'GitHub');
    expect(github).toBeDefined();
    expect(github?.href).toContain('github.com');
    expect(github?.external).toBe(true);
  });

  it('FOUNDATION_NAME is Rohinik Foundation', () => {
    expect(FOUNDATION_NAME).toBe('Rohinik Foundation');
  });

  it('FOUNDATION_YEAR is 2026', () => {
    expect(FOUNDATION_YEAR).toBe(2026);
  });

  it('FOUNDATION_TAGLINE is defined and non-empty', () => {
    expect(FOUNDATION_TAGLINE.length).toBeGreaterThan(0);
  });

  it('governance link is present in Foundation section', () => {
    const foundation = FOOTER_SECTIONS.find((s) => s.title === 'Foundation');
    expect(foundation).toBeDefined();
    const govLink = foundation?.links.find((l) => l.href === '/governance');
    expect(govLink).toBeDefined();
  });
});

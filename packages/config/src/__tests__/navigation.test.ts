import { describe, it, expect } from 'vitest';
import { NAV_ITEMS } from '../navigation.js';

describe('navigation config', () => {
  it('has exactly 9 items', () => {
    expect(NAV_ITEMS).toHaveLength(9);
  });

  it('first item is Home at /', () => {
    expect(NAV_ITEMS[0]).toEqual({ label: 'Home', href: '/' });
  });

  it('contains all required routes', () => {
    const hrefs = NAV_ITEMS.map((item) => item.href);
    expect(hrefs).toContain('/architecture');
    expect(hrefs).toContain('/specifications');
    expect(hrefs).toContain('/governance');
    expect(hrefs).toContain('/rs-1');
    expect(hrefs).toContain('/ecosystem');
    expect(hrefs).toContain('/documentation');
    expect(hrefs).toContain('/releases');
    expect(hrefs).toContain('/community');
  });

  it('does not contain /registry or /downloads (wrong route names)', () => {
    const hrefs = NAV_ITEMS.map((item) => item.href);
    expect(hrefs).not.toContain('/registry');
    expect(hrefs).not.toContain('/downloads');
  });
});

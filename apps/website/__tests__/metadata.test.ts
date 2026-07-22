import { describe, expect, it } from 'vitest';
import { metadata, viewport } from '@/app/layout';
import { SITE_NAME, SITE_ORIGIN, SITE_DESCRIPTION, SITE_LOCALE } from '@/constants/site';

describe('metadata export', () => {
  it('sets metadataBase to site origin', () => {
    expect((metadata.metadataBase as URL).toString()).toBe(`${SITE_ORIGIN}/`);
  });

  it('sets title with template', () => {
    expect((metadata.title as { template: string; default: string }).template).toBe(
      `%s | ${SITE_NAME}`,
    );
    expect((metadata.title as { template: string; default: string }).default).toBe(SITE_NAME);
  });

  it('sets description', () => {
    expect(metadata.description).toBe(SITE_DESCRIPTION);
  });

  it('sets openGraph metadata', () => {
    const og = metadata.openGraph as Record<string, unknown>;
    expect(og.siteName).toBe(SITE_NAME);
    expect(og.locale).toBe(SITE_LOCALE);
    expect(og.type).toBe('website');
  });

  it('sets twitter card', () => {
    const tw = metadata.twitter as Record<string, unknown>;
    expect(tw.card).toBe('summary_large_image');
  });

  it('sets robots to index and follow', () => {
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });
});

describe('viewport export', () => {
  it('sets width device-width', () => {
    expect(viewport.width).toBe('device-width');
  });

  it('sets initial scale 1', () => {
    expect(viewport.initialScale).toBe(1);
  });

  it('sets theme-color', () => {
    expect(Array.isArray(viewport.themeColor)).toBe(true);
  });
});

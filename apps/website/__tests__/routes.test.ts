import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { resolve } from 'path';

const APP_DIR = resolve(__dirname, '../app');

const EXPECTED_ROUTES = [
  '(marketing)/page.tsx',
  'architecture/page.tsx',
  'specifications/page.tsx',
  'governance/page.tsx',
  'rs-1/page.tsx',
  'ecosystem/page.tsx',
  'documentation/page.tsx',
  'releases/page.tsx',
  'community/page.tsx',
];

const EXPECTED_FOUNDATION_FILES = [
  'not-found.tsx',
  'error.tsx',
  'loading.tsx',
  'robots.ts',
  'sitemap.ts',
];

describe('route files', () => {
  it.each(EXPECTED_ROUTES)('%s exists', (route) => {
    expect(existsSync(resolve(APP_DIR, route))).toBe(true);
  });
});

describe('foundation files', () => {
  it.each(EXPECTED_FOUNDATION_FILES)('%s exists', (file) => {
    expect(existsSync(resolve(APP_DIR, file))).toBe(true);
  });
});

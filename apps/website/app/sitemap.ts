import type { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/constants/site';

const STATIC_ROUTES = [
  '/',
  '/architecture',
  '/specifications',
  '/governance',
  '/rs-1',
  '/ecosystem',
  '/documentation',
  '/releases',
  '/community',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map((url) => ({
    url: `${SITE_ORIGIN}${url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: url === '/' ? 1 : 0.8,
  }));
}

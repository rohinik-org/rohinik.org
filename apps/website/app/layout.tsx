import type { Metadata, Viewport } from 'next';
import { Hanken_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

import { Providers } from './providers';
import '../styles/globals.css';

import {
  SITE_NAME,
  SITE_ORIGIN,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_LANGUAGE,
} from '@/constants/site';

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f9fb' },
    { media: '(prefers-color-scheme: dark)', color: '#2d3133' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={SITE_LANGUAGE}
      className={`${hanken.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <main id="main-content">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { SITE_TAGLINE, SITE_NAME } from '@/constants/site';

export const metadata: Metadata = { title: 'Home' };

export default function HomePage() {
  return (
    <PageShell
      label="ROHINIK FOUNDATION"
      title={SITE_TAGLINE}
      description={`${SITE_NAME}. Memory First. Capability First. LLM Last.`}
    />
  );
}

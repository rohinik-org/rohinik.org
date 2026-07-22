import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { SITE_TAGLINE } from '@/constants/site';

export const metadata: Metadata = { title: 'Home' };

export default function HomePage() {
  return (
    <PageShell
      label="ROHINIK FOUNDATION"
      title={SITE_TAGLINE}
      description="An open intelligent computing platform built on deterministic memory, composable capabilities, and specification-driven execution."
      tagline="Memory First · Capability First · LLM Last"
    />
  );
}

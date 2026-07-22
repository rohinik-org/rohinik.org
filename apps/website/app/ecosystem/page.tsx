import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Ecosystem' };

export default function EcosystemPage() {
  return (
    <PageShell
      label="ECOSYSTEM / RS-1"
      title="Ecosystem"
      description="Drivers, Skills, Packs, Templates, Memories."
    />
  );
}

import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Releases' };

export default function ReleasesPage() {
  return (
    <PageShell
      label="FOUNDATION / RELEASES"
      title="Releases"
      description="CLI binaries, SDKs, release notes, and checksums."
    />
  );
}

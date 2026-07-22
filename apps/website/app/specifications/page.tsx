import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Specifications' };

export default function SpecificationsPage() {
  return (
    <PageShell
      label="SPECIFICATIONS / RS-1"
      title="Specification Corpus"
      description="AFS, ADR, LAW, REQ, INV, OBS, SEC, AX."
    />
  );
}

import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'RS-1' };

export default function RS1Page() {
  return (
    <PageShell
      label="ROHINIK STANDARD / RS-1"
      title="RS-1 Implementation Status"
      description="Implementation status dashboard for Rohinik Standard 1."
    />
  );
}

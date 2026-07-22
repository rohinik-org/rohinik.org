import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Governance' };

export default function GovernancePage() {
  return (
    <PageShell
      label="FOUNDATION / GOVERNANCE"
      title="Governance"
      description="Foundation structure, working groups, and contribution process."
    />
  );
}

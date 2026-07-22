import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Community' };

export default function CommunityPage() {
  return (
    <PageShell
      label="FOUNDATION / COMMUNITY"
      title="Community"
      description="Contribution guidelines, working groups, and channels."
    />
  );
}

import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Documentation' };

export default function DocumentationPage() {
  return (
    <PageShell
      label="FOUNDATION / DOCUMENTATION"
      title="Documentation"
      description="Guides, tutorials, and technical references."
    />
  );
}

import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Not Found' };

export default function NotFound() {
  return (
    <PageShell
      label="404"
      title="Page not found."
      description="The page you're looking for doesn't exist or has been moved."
    />
  );
}

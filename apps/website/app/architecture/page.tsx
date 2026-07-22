import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';

export const metadata: Metadata = { title: 'Architecture' };

export default function ArchitecturePage() {
  return (
    <PageShell
      label="ARCHITECTURE / RS-1"
      title="Layered Architecture"
      description="Foundation, Kernel, Runtime, Intelligence, Memory, Compiler, Shell."
    />
  );
}

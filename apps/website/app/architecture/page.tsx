import type { Metadata } from 'next';
import { ArchitectureHero } from '@/components/architecture/ArchitectureHero';
import { ArchitectureSectionNav } from '@/components/architecture/ArchitectureSectionNav';
import { ArchitectureExplorer } from '@/components/architecture/ArchitectureExplorer';
import { ArchitectureReferences } from '@/components/architecture/ArchitectureReferences';
import { BoundaryRegister } from '@/components/architecture/BoundaryRegister';
import { CrossCuttingSystems } from '@/components/architecture/CrossCuttingSystems';
import { ExecutionPath } from '@/components/architecture/ExecutionPath';
import { SystemProperties } from '@/components/architecture/SystemProperties';

export const metadata: Metadata = {
  title: 'Architecture',
  description:
    'Explore the layered architecture, execution model, system boundaries, and cross-cutting mechanisms of the Rohinik intelligent computing platform.',
};

export default function ArchitecturePage() {
  return (
    <>
      <ArchitectureHero />
      <ArchitectureSectionNav />
      <SystemProperties />
      <ArchitectureExplorer />
      <CrossCuttingSystems />
      <ExecutionPath />
      <BoundaryRegister />
      <ArchitectureReferences />
    </>
  );
}

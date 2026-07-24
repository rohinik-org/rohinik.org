import type { Metadata } from 'next';
import { RSHero } from '@/components/reference-standard/RSHero';
import { RSOverview } from '@/components/reference-standard/RSOverview';
import { ScopeBoundary } from '@/components/reference-standard/ScopeBoundary';
import { ImplementedSpecifications } from '@/components/reference-standard/ImplementedSpecifications';
import { CapabilityCoverage } from '@/components/reference-standard/CapabilityCoverage';
import { ArchitectureMapping } from '@/components/reference-standard/ArchitectureMapping';
import { ConformanceModel } from '@/components/reference-standard/ConformanceModel';
import { DesignPrinciples } from '@/components/reference-standard/DesignPrinciples';
import { RepositoryStructure } from '@/components/reference-standard/RepositoryStructure';
import { DevelopmentLifecycle } from '@/components/reference-standard/DevelopmentLifecycle';
import { RSReferences } from '@/components/reference-standard/RSReferences';

export const metadata: Metadata = {
  title: 'RS-1 — Reference Standard',
  description:
    'RS-1 is the canonical implementation of the Rohinik Foundation Specifications. It demonstrates architectural correctness and provides an interoperability baseline—without becoming normative.',
};

export default function RSOnePage() {
  return (
    <>
      <RSHero />
      <RSOverview />
      <ScopeBoundary />
      <ImplementedSpecifications />
      <CapabilityCoverage />
      <ArchitectureMapping />
      <ConformanceModel />
      <DesignPrinciples />
      <RepositoryStructure />
      <DevelopmentLifecycle />
      <RSReferences />
    </>
  );
}

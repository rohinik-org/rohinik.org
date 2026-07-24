import type { Metadata } from 'next';
import { EcosystemHero } from '@/components/ecosystem/EcosystemHero';
import { EcosystemIntroduction } from '@/components/ecosystem/EcosystemIntroduction';
import { EcosystemOverviewGrid } from '@/components/ecosystem/EcosystemOverviewGrid';
import { EcosystemPrinciples } from '@/components/ecosystem/EcosystemPrinciples';
import { FoundationArchitecture } from '@/components/ecosystem/FoundationArchitecture';
import { ReferenceStandardsSection } from '@/components/ecosystem/ReferenceStandardsSection';
import { CapabilityEcosystem } from '@/components/ecosystem/CapabilityEcosystem';
import { ProviderEcosystem } from '@/components/ecosystem/ProviderEcosystem';
import { DeveloperTooling } from '@/components/ecosystem/DeveloperTooling';
import { SDKSection } from '@/components/ecosystem/SDKSection';
import { CommunitySection } from '@/components/ecosystem/CommunitySection';
import { RoadmapSection } from '@/components/ecosystem/RoadmapSection';
import { GetInvolvedSection } from '@/components/ecosystem/GetInvolvedSection';

export const metadata: Metadata = {
  title: 'Ecosystem — Rohinik Foundation',
  description:
    'An open, specification-driven ecosystem for capability-based AI infrastructure. Specifications, Reference Standards, SDKs, Capabilities, Providers, and Tooling.',
};

export default function EcosystemPage() {
  return (
    <>
      <EcosystemHero />
      <EcosystemIntroduction />
      <EcosystemOverviewGrid />
      <EcosystemPrinciples />
      <FoundationArchitecture />
      <ReferenceStandardsSection />
      <CapabilityEcosystem />
      <ProviderEcosystem />
      <DeveloperTooling />
      <SDKSection />
      <CommunitySection />
      <RoadmapSection />
      <GetInvolvedSection />
    </>
  );
}

import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { WhyRohinikSection } from '@/components/home/WhyRohinikSection';
import { ArchitecturePreview } from '@/components/home/ArchitecturePreview';
import { CorePrinciplesSection } from '@/components/home/CorePrinciplesSection';
import { ExecutionFlowSection } from '@/components/home/ExecutionFlowSection';
import { SpecificationPreview } from '@/components/home/SpecificationPreview';
import { GovernanceSection } from '@/components/home/GovernanceSection';
import { CommunitySection } from '@/components/home/CommunitySection';

export const metadata: Metadata = {
  title: 'The Intelligent Computing Platform',
  description:
    'Rohinik is an open computing architecture built on deterministic memory, composable capabilities, and specification-driven execution.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyRohinikSection />
      <ArchitecturePreview />
      <CorePrinciplesSection />
      <ExecutionFlowSection />
      <SpecificationPreview />
      <GovernanceSection />
      <CommunitySection />
    </>
  );
}

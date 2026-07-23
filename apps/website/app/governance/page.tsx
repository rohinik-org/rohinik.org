import type { Metadata } from 'next';
import { GovernanceHero } from '@/components/governance/GovernanceHero';
import { GovernanceAtAGlance } from '@/components/governance/GovernanceAtAGlance';
import { GovernancePrinciples } from '@/components/governance/GovernancePrinciples';
import { AuthorityModel } from '@/components/governance/AuthorityModel';
import { GovernanceLifecycle } from '@/components/governance/GovernanceLifecycle';
import { ChangeProcess } from '@/components/governance/ChangeProcess';
import { RolesResponsibilities } from '@/components/governance/RolesResponsibilities';
import { CompatibilityRules } from '@/components/governance/CompatibilityRules';
import { ConformanceSection } from '@/components/governance/ConformanceSection';
import { ContributionWorkflow } from '@/components/governance/ContributionWorkflow';
import { GovernanceReferences } from '@/components/governance/GovernanceReferences';

export const metadata: Metadata = {
  title: 'Governance',
  description:
    'How Rohinik separates constitutional rules, architectural specifications, runtime implementations, and conformance so innovation never silently redefines the platform.',
};

export default function GovernancePage() {
  return (
    <>
      <GovernanceHero />
      <GovernanceAtAGlance />
      <GovernancePrinciples />
      <AuthorityModel />
      <GovernanceLifecycle />
      <ChangeProcess />
      <RolesResponsibilities />
      <CompatibilityRules />
      <ConformanceSection />
      <ContributionWorkflow />
      <GovernanceReferences />
    </>
  );
}

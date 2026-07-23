import type { Metadata } from 'next';
import { AuthorityHierarchy } from '@/components/specifications/AuthorityHierarchy';
import { CorpusSummary } from '@/components/specifications/CorpusSummary';
import { DecisionRecordPreview } from '@/components/specifications/DecisionRecordPreview';
import { IdentifierTaxonomy } from '@/components/specifications/IdentifierTaxonomy';
import { SpecificationFamilies } from '@/components/specifications/SpecificationFamilies';
import { SpecificationLifecycle } from '@/components/specifications/SpecificationLifecycle';
import { SpecificationReferences } from '@/components/specifications/SpecificationReferences';
import { SpecificationRegistry } from '@/components/specifications/SpecificationRegistry';
import { SpecificationsHero } from '@/components/specifications/SpecificationsHero';
import { getSpecificationRegistrySync } from '@/lib/specifications/registry';

export const metadata: Metadata = {
  title: 'Specifications',
  description:
    'Browse the authoritative Rohinik specification corpus, identifier taxonomy, authority hierarchy, and architectural decision records.',
};

export default function SpecificationsPage() {
  const specifications = getSpecificationRegistrySync();

  return (
    <>
      <SpecificationsHero specifications={specifications} />
      <CorpusSummary />
      <SpecificationRegistry specifications={specifications} />
      <SpecificationFamilies />
      <AuthorityHierarchy />
      <IdentifierTaxonomy />
      <DecisionRecordPreview />
      <SpecificationLifecycle />
      <SpecificationReferences />
    </>
  );
}

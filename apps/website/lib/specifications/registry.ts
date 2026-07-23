// ponytail: typed fixture — replace with generated manifest at apps/website/.generated/specifications.json when content pipeline lands
import type { SpecificationRecord } from './types';

const FIXTURE: readonly SpecificationRecord[] = [
  {
    id: 'AFS-0001',
    slug: 'afs-0001',
    title: 'Rohinik Foundation Specification',
    family: 'AFS',
    summary:
      'Defines the constitutional laws, architectural foundations, canonical terminology, runtime responsibilities, requirements, lifecycle rules, security constraints, and governance model of Rohinik.',
    version: '1.0',
    status: 'frozen',
    authority: 'constitutional',
    publishedAt: '2026-07-14',
    updatedAt: '2026-07-14',
    normative: true,
    href: '/specifications/afs-0001',
    dependsOn: [],
    supersedes: [],
    supersededBy: [],
    identifierClasses: [
      'LAW',
      'AX',
      'P',
      'DEF',
      'INV',
      'L',
      'R',
      'REQ',
      'SEC',
      'OBS',
      'NOTE',
      'BP',
      'EX',
      'ERR',
    ],
    tags: ['foundation', 'architecture', 'runtime', 'governance', 'conformance'],
  },
];

// ponytail: sync accessor for RSC page composition and tests; async wrapper retained for future pipeline
export function getSpecificationRegistrySync(): readonly SpecificationRecord[] {
  return FIXTURE;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getSpecificationRegistry(): Promise<readonly SpecificationRecord[]> {
  return FIXTURE;
}

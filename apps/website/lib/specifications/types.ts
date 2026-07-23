export type SpecificationStatus =
  'draft' | 'review' | 'candidate' | 'frozen' | 'deprecated' | 'superseded';

export type SpecificationAuthority =
  'constitutional' | 'foundational' | 'architectural' | 'normative' | 'informative' | 'operational';

export interface SpecificationRecord {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly family: string;
  readonly summary: string;
  readonly version: string;
  readonly status: SpecificationStatus;
  readonly authority: SpecificationAuthority;
  readonly publishedAt?: string;
  readonly updatedAt?: string;
  readonly normative: boolean;
  readonly href: string;
  readonly dependsOn: readonly string[];
  readonly supersedes: readonly string[];
  readonly supersededBy: readonly string[];
  readonly identifierClasses: readonly string[];
  readonly tags: readonly string[];
}

export type CoverageStatus = 'implemented' | 'partial' | 'planned';

export interface ArchitectureAuthority {
  readonly label: string;
  readonly specification: string;
}

export interface ArchitectureMappingEntry {
  readonly id: string;
  readonly layer: string;
  readonly canonicalPackage: string;
  readonly authority: ArchitectureAuthority;
}

// Constitutional invariant: A Reference Standard may demonstrate, clarify, or verify
// a specification, but must never introduce new normative requirements.
export interface ReferenceStandardContent {
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly register: ReadonlyArray<{ readonly term: string; readonly description: string }>;
  };
  readonly overview: {
    readonly purpose: ReadonlyArray<string>;
    readonly notIntendedTo: ReadonlyArray<string>;
  };
  readonly authority: {
    readonly chain: ReadonlyArray<{
      readonly id: string;
      readonly label: string;
      readonly description: string;
    }>;
    readonly callout: string;
  };
  readonly implementedSpecifications: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly version: string;
    readonly status: string;
    readonly coverage: string;
  }>;
  readonly coverage: ReadonlyArray<{
    readonly id: string;
    readonly label: string;
    readonly status: CoverageStatus;
  }>;
  readonly architectureMapping: ReadonlyArray<ArchitectureMappingEntry>;
  readonly conformance: {
    readonly statement: string;
    readonly chain: ReadonlyArray<string>;
    readonly chainNote: string;
  };
  readonly principles: ReadonlyArray<{
    readonly index: string;
    readonly title: string;
    readonly description: string;
  }>;
  readonly repository: {
    readonly domains: ReadonlyArray<{
      readonly id: string;
      readonly label: string;
      readonly description: string;
    }>;
  };
  readonly lifecycle: {
    readonly steps: ReadonlyArray<{
      readonly id: string;
      readonly label: string;
      readonly description: string;
    }>;
    readonly callout: string;
  };
  readonly references: ReadonlyArray<{
    readonly id: string;
    readonly label: string;
    readonly href: string;
    readonly description: string;
  }>;
}

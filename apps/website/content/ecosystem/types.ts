export type ImplementationStatus =
  'available' | 'foundation-implementation' | 'in-development' | 'planned';

export interface EcosystemNode {
  readonly id: string;
  readonly label: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly emphasis?: boolean;
}

export interface EcosystemEdge {
  readonly id: string;
  readonly from: string;
  readonly to: string;
}

export interface EcosystemGraph {
  readonly nodes: ReadonlyArray<EcosystemNode>;
  readonly edges: ReadonlyArray<EcosystemEdge>;
}

export interface EcosystemOverviewCard {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly href: string;
  readonly status: ImplementationStatus;
}

export interface EcosystemPrinciple {
  readonly index: string;
  readonly title: string;
  readonly description: string;
}

export interface FoundationNode {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly href?: string;
}

export interface ReferenceStandardSummary {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly status: ImplementationStatus;
  readonly href?: string;
}

export interface CapabilityDomain {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly status: ImplementationStatus;
}

export interface ProviderDomain {
  readonly id: string;
  readonly label: string;
  readonly purpose: string;
  readonly status: ImplementationStatus;
}

export interface Tool {
  readonly id: string;
  readonly label: string;
  readonly purpose: string;
  readonly status: ImplementationStatus;
}

export interface SDK {
  readonly id: string;
  readonly language: string;
  readonly status: ImplementationStatus;
}

export interface ParticipationRole {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly callToAction: string;
}

export interface CommunityLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly description: string;
}

export interface RoadmapMilestone {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly status: 'completed' | 'active' | 'planned';
}

export interface GetInvolvedAction {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly href: string;
}

export interface EcosystemContent {
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle: string;
    readonly graph: EcosystemGraph;
  };
  readonly introduction: {
    readonly purpose: ReadonlyArray<string>;
    readonly notIntendedTo: ReadonlyArray<string>;
  };
  readonly overview: {
    readonly cards: ReadonlyArray<EcosystemOverviewCard>;
  };
  readonly principles: ReadonlyArray<EcosystemPrinciple>;
  readonly foundation: {
    readonly chain: ReadonlyArray<FoundationNode>;
    readonly callout: string;
  };
  readonly referenceStandards: {
    readonly items: ReadonlyArray<ReferenceStandardSummary>;
    readonly callout: string;
  };
  readonly capabilityEcosystem: {
    readonly domains: ReadonlyArray<CapabilityDomain>;
    readonly callout: string;
  };
  readonly providerEcosystem: {
    readonly domains: ReadonlyArray<ProviderDomain>;
    readonly callout: string;
  };
  readonly tooling: {
    readonly tools: ReadonlyArray<Tool>;
  };
  readonly sdks: {
    readonly items: ReadonlyArray<SDK>;
    readonly note: string;
  };
  readonly community: {
    readonly participation: ReadonlyArray<ParticipationRole>;
    readonly links: ReadonlyArray<CommunityLink>;
  };
  readonly roadmap: {
    readonly milestones: ReadonlyArray<RoadmapMilestone>;
  };
  readonly getInvolved: {
    readonly actions: ReadonlyArray<GetInvolvedAction>;
  };
}

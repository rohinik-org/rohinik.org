export interface FooterLink {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface FooterSection {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export const FOOTER_SECTIONS: readonly FooterSection[] = [
  {
    title: 'Foundation',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Governance', href: '/governance' },
      { label: 'Community', href: '/community' },
    ],
  },
  {
    title: 'Standards',
    links: [
      { label: 'Specifications', href: '/specifications' },
      { label: 'RS-1', href: '/rs-1' },
      { label: 'Architecture', href: '/architecture' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/documentation' },
      { label: 'Releases', href: '/releases' },
      { label: 'Ecosystem', href: '/ecosystem' },
    ],
  },
] as const;

export const FOOTER_EXTERNAL_LINKS: readonly FooterLink[] = [
  { label: 'GitHub', href: 'https://github.com/rohinik-org/', external: true },
] as const;

export const FOUNDATION_NAME = 'Rohinik Foundation' as const;
export const FOUNDATION_TAGLINE =
  'Open intelligent computing platform. Memory First. Capability First. LLM Last.' as const;
export const FOUNDATION_YEAR = 2026 as const;

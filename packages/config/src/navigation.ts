export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Specifications', href: '/specifications' },
  { label: 'Governance', href: '/governance' },
  { label: 'RS-1', href: '/reference-standards/rs-1' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Documentation', href: '/documentation' },
  { label: 'Releases', href: '/releases' },
  { label: 'Community', href: '/community' },
] as const satisfies readonly NavItem[];

import Link from 'next/link';
import { NAV_ITEMS } from '@rohinik/config';
import { ThemeToggle } from './ThemeToggle';

export function TopNav() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant dark:border-outline">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <svg width="24" height="24" viewBox="0 0 128 128" fill="none" aria-hidden="true">
            <path d="M64,96 L108,74 L64,52 L20,74 Z" fill="var(--logo-base)" fillOpacity="0.4" />
            <path d="M64,74 L108,52 L64,30 L20,52 Z" fill="var(--logo-base)" fillOpacity="0.7" />
            <path d="M64,52 L86,41 L64,30 L42,41 Z" fill="var(--logo-accent)" />
            <line
              x1="64"
              y1="30"
              x2="64"
              y2="96"
              stroke="var(--logo-base)"
              strokeWidth="6"
              strokeDasharray="4 4"
            />
          </svg>
          <span className="font-mono text-label-caps uppercase tracking-[0.15em] text-on-surface">
            ROHINIK
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors py-5"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            aria-label="Open navigation menu"
            className="md:hidden font-mono text-label-caps uppercase border border-outline-variant px-3 py-1 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            MENU
          </button>
        </div>
      </div>
    </header>
  );
}

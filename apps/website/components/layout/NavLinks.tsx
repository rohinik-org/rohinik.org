'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@rohinik/config';
import { cn } from '@/lib/cn';

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
      {NAV_ITEMS.map(({ label, href }) => {
        const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'font-mono text-label-caps uppercase tracking-widest transition-colors py-5',
              'border-b-2',
              isActive
                ? 'text-secondary border-secondary'
                : 'text-on-surface-variant border-transparent hover:text-on-surface',
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

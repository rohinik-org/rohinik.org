import Link from 'next/link';
import type { Route } from 'next';
import {
  FOOTER_SECTIONS,
  FOOTER_EXTERNAL_LINKS,
  FOUNDATION_NAME,
  FOUNDATION_TAGLINE,
  FOUNDATION_YEAR,
} from '@rohinik/config';

export function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-low">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <span className="font-mono text-label-caps uppercase tracking-[0.15em] text-on-surface block mb-4">
              {FOUNDATION_NAME}
            </span>
            <p className="text-body-md text-on-surface-variant font-body leading-relaxed">
              {FOUNDATION_TAGLINE}
            </p>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as Route}
                      className="text-body-md text-on-surface-variant hover:text-on-surface transition-colors font-body"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-outline-variant pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p
            className="font-mono text-label-caps text-on-surface-variant tracking-widest"
            aria-label={`© ${String(FOUNDATION_YEAR)}–present ${FOUNDATION_NAME}. All rights reserved.`}
          >
            © <span>{FOUNDATION_YEAR}</span>–Present. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {FOOTER_EXTERNAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="font-mono text-label-caps text-on-surface-variant hover:text-on-surface uppercase tracking-widest transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

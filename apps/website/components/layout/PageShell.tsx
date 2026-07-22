import { cn } from '@/lib/cn';

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageShellProps {
  label?: string;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function PageShell({
  label,
  title,
  description,
  breadcrumbs,
  actions,
  aside,
  children,
  className,
}: PageShellProps) {
  return (
    <div className={cn('min-h-screen', className)}>
      <div className="dot-grid border-b border-outline-muted">
        <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-2">
                  {i > 0 && (
                    <span className="text-on-surface-variant text-xs" aria-hidden="true">
                      /
                    </span>
                  )}
                  <a
                    href={crumb.href}
                    className="font-mono text-label-caps uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors"
                  >
                    {crumb.label}
                  </a>
                </span>
              ))}
            </nav>
          )}

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              {label && (
                <div className="font-mono text-label-caps text-secondary uppercase tracking-widest mb-4">
                  {label}
                </div>
              )}
              <h1 className="font-headline text-headline-lg-mobile md:text-headline-xl font-bold text-on-surface mb-4 leading-tight tracking-tight">
                {title}
              </h1>
              {description && (
                <p className="font-body text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
          </div>
        </div>
      </div>

      {(children ?? aside) && (
        <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
          {aside ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
              <div>{children}</div>
              <aside>{aside}</aside>
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}

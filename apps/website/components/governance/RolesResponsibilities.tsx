import { governanceContent } from '@/content/governance';

export function RolesResponsibilities() {
  const { roles } = governanceContent;
  return (
    <section id="roles" aria-labelledby="roles-heading" className="border-b border-outline-variant">
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="roles-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Roles and Responsibilities
        </h2>
        <div className="divide-y divide-outline-variant border-t border-outline-variant">
          {roles.map((role) => (
            <div key={role.id} className="py-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-label-caps uppercase tracking-widest text-on-surface font-semibold">
                  {role.name}
                </span>
                <span className="font-mono text-label-caps uppercase tracking-widest text-secondary">
                  {role.authority}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <dl>
                  <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3">
                    Owns
                  </dt>
                  {role.owns.map((item) => (
                    <dd
                      key={item}
                      className="font-body text-body-md text-on-surface-variant leading-relaxed mb-1"
                    >
                      {item}
                    </dd>
                  ))}
                </dl>
                <dl>
                  <dt className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3">
                    Supports
                  </dt>
                  {role.supports.map((item) => (
                    <dd
                      key={item}
                      className="font-body text-body-md text-on-surface-variant leading-relaxed mb-1"
                    >
                      {item}
                    </dd>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

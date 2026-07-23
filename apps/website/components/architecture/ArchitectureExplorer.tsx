'use client';

import { useState } from 'react';
import { architectureContent } from '@/content/architecture';

export function ArchitectureExplorer() {
  const { layers } = architectureContent;
  const [selectedLayerId, setSelectedLayerId] = useState<string>(layers[0].id);
  const selectedLayer = layers.find((l) => l.id === selectedLayerId) ?? layers[0];

  return (
    <section
      id="layers"
      aria-labelledby="layers-heading"
      className="border-b border-outline-variant bg-surface-container-low"
    >
      <div className="max-w-site mx-auto px-[var(--spacing-margin-edge)] py-16 md:py-24">
        <h2
          id="layers-heading"
          className="font-headline text-headline-md font-bold text-on-surface mb-12"
        >
          Architectural Layers
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-0 border border-outline-variant">
          {/* Selector column */}
          <ol aria-label="System stack" className="divide-y divide-outline-variant">
            {layers.map((layer) => {
              const selected = layer.id === selectedLayerId;
              return (
                <li key={layer.id}>
                  <button
                    type="button"
                    id={`layer-selector-${layer.id}`}
                    aria-pressed={selected}
                    aria-controls="architecture-layer-detail"
                    onClick={() => {
                      setSelectedLayerId(layer.id);
                    }}
                    className={[
                      'w-full text-left px-6 py-5 flex items-start gap-4 transition-colors border-l-2',
                      selected
                        ? 'border-l-secondary bg-surface-container text-on-surface'
                        : 'border-l-transparent hover:bg-surface-container text-on-surface-variant hover:text-on-surface',
                    ].join(' ')}
                  >
                    <span className="font-mono text-label-caps text-on-surface-variant shrink-0 pt-0.5 w-6">
                      {layer.index}
                    </span>
                    <div className="min-w-0">
                      <div
                        className={[
                          'font-mono text-label-caps uppercase tracking-widest mb-1',
                          selected ? 'text-secondary' : '',
                        ].join(' ')}
                      >
                        {layer.label}
                      </div>
                      <p className="font-body text-body-md text-on-surface-variant leading-snug text-[0.8125rem]">
                        {layer.shortDescription}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Detail panel */}
          <article
            id="architecture-layer-detail"
            aria-live="polite"
            aria-labelledby={`layer-detail-${selectedLayer.id}-title`}
            className="border-t lg:border-t-0 lg:border-l border-outline-variant px-8 py-8"
          >
            <p className="font-mono text-label-caps text-on-surface-variant mb-2">
              Layer {selectedLayer.index}
            </p>
            <h3
              id={`layer-detail-${selectedLayer.id}-title`}
              className="font-headline text-headline-sm font-bold text-on-surface mb-4"
            >
              {selectedLayer.label}
            </h3>
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed mb-8">
              {selectedLayer.responsibility}
            </p>

            <section aria-labelledby={`layer-detail-${selectedLayer.id}-owns`} className="mb-6">
              <h4
                id={`layer-detail-${selectedLayer.id}-owns`}
                className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3"
              >
                Owns
              </h4>
              <ul className="space-y-1">
                {selectedLayer.owns.map((item) => (
                  <li
                    key={item}
                    className="font-body text-body-md text-on-surface-variant leading-relaxed flex gap-2"
                  >
                    <span className="text-secondary shrink-0" aria-hidden="true">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby={`layer-detail-${selectedLayer.id}-doesnotown`}
              className="mb-6"
            >
              <h4
                id={`layer-detail-${selectedLayer.id}-doesnotown`}
                className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3"
              >
                Does Not Own
              </h4>
              <ul className="space-y-1">
                {selectedLayer.doesNotOwn.map((item) => (
                  <li
                    key={item}
                    className="font-body text-body-md text-on-surface-variant leading-relaxed flex gap-2"
                  >
                    <span className="text-on-surface-variant shrink-0" aria-hidden="true">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby={`layer-detail-${selectedLayer.id}-connects`}>
              <h4
                id={`layer-detail-${selectedLayer.id}-connects`}
                className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3"
              >
                Communicates With
              </h4>
              <ul className="flex flex-wrap gap-2">
                {selectedLayer.communicatesWith.map((target) => (
                  <li
                    key={target}
                    className="font-mono text-label-caps uppercase tracking-widest text-on-surface border border-outline-variant px-3 py-1"
                  >
                    {target}
                  </li>
                ))}
              </ul>
            </section>

            {selectedLayer.specifications.length > 0 && (
              <section aria-labelledby={`layer-detail-${selectedLayer.id}-specs`} className="mt-6">
                <h4
                  id={`layer-detail-${selectedLayer.id}-specs`}
                  className="font-mono text-label-caps uppercase tracking-widest text-on-surface mb-3"
                >
                  Related Specifications
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {selectedLayer.specifications.map((spec) => (
                    <li
                      key={spec}
                      className="font-mono text-label-caps text-secondary border border-secondary px-3 py-1"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}

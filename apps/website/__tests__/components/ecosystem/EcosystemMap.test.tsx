import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EcosystemMap } from '@/components/ecosystem/EcosystemMap';
import { ecosystemContent } from '@/content/ecosystem/ecosystem';

const graph = ecosystemContent.hero.graph;

describe('EcosystemMap', () => {
  it('renders SVG with role="img"', () => {
    render(<EcosystemMap graph={graph} />);
    expect(document.querySelector('svg[role="img"]')).toBeInTheDocument();
  });

  it('aria-labelledby points to existing title id', () => {
    render(<EcosystemMap graph={graph} />);
    const svg = document.querySelector('svg');
    const labelledBy = svg?.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy ?? '')).toBeInTheDocument();
  });

  it('renders a <title> element', () => {
    render(<EcosystemMap graph={graph} />);
    expect(document.querySelector('svg title')).toBeInTheDocument();
  });

  it('renders a <desc> element', () => {
    render(<EcosystemMap graph={graph} />);
    expect(document.querySelector('svg desc')).toBeInTheDocument();
  });

  it('renders all node labels from graph data', () => {
    render(<EcosystemMap graph={graph} />);
    for (const node of graph.nodes) {
      expect(screen.getByText(node.label)).toBeInTheDocument();
    }
  });

  it('node count matches graph.nodes.length', () => {
    render(<EcosystemMap graph={graph} />);
    const rects = document.querySelectorAll('svg rect');
    expect(rects.length).toBe(graph.nodes.length);
  });

  it('no hardcoded label strings — all labels come from props', () => {
    const minimalGraph = {
      nodes: [{ id: 'test-node', label: 'Test Label XYZ', x: 10, y: 10, width: 100, height: 30 }],
      edges: [],
    };
    render(<EcosystemMap graph={minimalGraph} />);
    expect(screen.getByText('Test Label XYZ')).toBeInTheDocument();
    expect(screen.queryByText('Foundation Constitution')).not.toBeInTheDocument();
  });
});

import type { EcosystemGraph, EcosystemNode, EcosystemEdge } from '@/content/ecosystem/types';

interface EcosystemMapProps {
  graph: EcosystemGraph;
}

function nodeCenterX(node: EcosystemNode): number {
  return node.x + node.width / 2;
}

function nodeCenterY(node: EcosystemNode): number {
  return node.y + node.height / 2;
}

export function EcosystemMap({ graph }: EcosystemMapProps) {
  const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 800 480"
      role="img"
      aria-labelledby="ecosystem-map-title"
      className="w-full h-auto"
    >
      <title id="ecosystem-map-title">Rohinik Ecosystem Architecture Map</title>
      <desc>
        A directed graph showing the Rohinik ecosystem layers: Foundation Constitution at the base,
        Specifications, Reference Standards, and Architecture in the middle tier, Rohinik Runtime at
        center, SDKs, Packages, Capabilities, and Providers above, and Applications at the top.
      </desc>
      {graph.edges.map((edge: EcosystemEdge) => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);
        if (!from || !to) return null;
        return (
          <line
            key={edge.id}
            x1={nodeCenterX(from)}
            y1={nodeCenterY(from)}
            x2={nodeCenterX(to)}
            y2={nodeCenterY(to)}
            stroke="var(--sem-outline-variant)"
            strokeWidth="1"
          />
        );
      })}
      {graph.nodes.map((node: EcosystemNode) => (
        <g key={node.id}>
          <rect
            x={node.x}
            y={node.y}
            width={node.width}
            height={node.height}
            fill="var(--sem-surface)"
            stroke={node.emphasis ? 'var(--sem-secondary)' : 'var(--sem-outline-variant)'}
            strokeWidth="1"
          />
          <text
            x={nodeCenterX(node)}
            y={nodeCenterY(node)}
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="12"
            fill={node.emphasis ? 'var(--sem-secondary)' : 'var(--sem-on-surface)'}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

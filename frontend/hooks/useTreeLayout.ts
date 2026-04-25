import { DomNode } from "@/types";
import { Node, Edge } from "@xyflow/react";

const NODE_WIDTH = 60;  // lebih kecil
const NODE_HEIGHT = 60; // lebih kecil
const H_GAP = 8;        // horizontal gap antar node
const V_GAP = 80;       // vertical gap antar level

export function useTreeLayout(
  tree: DomNode | null,
  highlightedPaths: string[]
) {
  if (!tree) return { nodes: [], edges: [] };

  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const xPositions: Map<string, number> = new Map();

  // useTreeLayout.ts

  function calculateXPositions(node: DomNode, startX: number): number {
    if (node.children.length === 0) {
      xPositions.set(node.id, startX + NODE_WIDTH / 2); // ← ganti path → id
      return startX + NODE_WIDTH + H_GAP;
    }

    let currentX = startX;
    for (const child of node.children) {
      currentX = calculateXPositions(child, currentX);
    }

    const firstChildX = xPositions.get(node.children[0].id) ?? startX; // ← id
    const lastChildX = xPositions.get(
      node.children[node.children.length - 1].id               // ← id
    ) ?? currentX;

    xPositions.set(node.id, (firstChildX + lastChildX) / 2);  // ← id
    return currentX;
  }

  function buildNodes(node: DomNode) {
    const isHighlighted = highlightedPaths.includes(node.path); // path tetap untuk highlight
    const x = xPositions.get(node.id) ?? 0;                    // ← id
    const y = node.depth * (NODE_HEIGHT + V_GAP);

    nodes.push({
      id: node.id,          // ← id (bukan path)
      type: "domNode",
      position: { x: x - NODE_WIDTH / 2, y },
      data: {
        tag: node.tag,
        id_attr: node.id_attr,
        classes: node.classes,
        depth: node.depth,
        isHighlighted,
      },
    });

    for (const child of node.children) {
      edges.push({
        id: `${node.id}-${child.id}`,    // ← id
        source: node.id,                  // ← id
        target: child.id,                 // ← id
        style: {
          stroke: isHighlighted ? "#cba6f7" : "#45475a",
          strokeWidth: isHighlighted ? 2 : 0.5,
        },
      });
      buildNodes(child);
    }
  }

  calculateXPositions(tree, 0);
  buildNodes(tree);

  return { nodes, edges };
}
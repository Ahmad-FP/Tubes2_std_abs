import { DomNode } from "@/types";
import { Node, Edge } from "@xyflow/react";

export function useTreeLayout(
  tree: DomNode | null,
  highlightedPaths: string[]
) {
  if (!tree) return { nodes: [], edges: [] };

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const traverse = (node: DomNode, x: number, y: number, spacing: number) => {
    const isHighlighted = highlightedPaths.includes(node.path);

    nodes.push({
      id: node.path,
      type: "domNode",
      position: { x, y },
      data: {
        tag: node.tag,
        id_attr: node.id_attr,
        classes: node.classes,
        depth: node.depth,
        isHighlighted,
      },
    });

    const childCount = node.children.length;
    const totalWidth = (childCount - 1) * spacing;
    const startX = x - totalWidth / 2;

    node.children.forEach((child, index) => {
      const childX = startX + index * spacing;
      const childY = y + 100;

      edges.push({
        id: `${node.path}-${child.path}`,
        source: node.path,
        target: child.path,
        style: {
          stroke: isHighlighted ? "#3b82f6" : "#4b5563",
          strokeWidth: isHighlighted ? 2 : 1,
        },
      });

      traverse(child, childX, childY, spacing / 1.5);
    });
  };

  traverse(tree, 0, 0, 200);
  return { nodes, edges };
}
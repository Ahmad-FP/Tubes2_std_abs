"use client";

import { useAppStore } from "@/store/useAppStore";
import { useTreeLayout } from "@/hooks/useTreeLayout";
import DomNodeComponent from "./DomNode";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import LoadingSpinner from "../shared/LoadingSpinner";

const nodeTypes = { domNode: DomNodeComponent };

export default function TreeVisualizer() {
  const { domTree, highlightedPaths, maxDepth, isScraping } = useAppStore();
  const { nodes, edges } = useTreeLayout(domTree, highlightedPaths);

  if (isScraping) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner text="Parsing DOM Tree..." />
      </div>
    );
  }

  if (!domTree) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <p className="text-gray-400 text-sm">
          Masukkan URL atau HTML untuk memulai
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-2">
      {/* Stats bar */}
      <div className="flex gap-4 text-xs text-gray-400">
        <span>
          Kedalaman maksimum:{" "}
          <span className="text-blue-400 font-medium">{maxDepth}</span>
        </span>
        <span>
          Total node:{" "}
          <span className="text-blue-400 font-medium">{nodes.length}</span>
        </span>
      </div>

      {/* ReactFlow canvas */}
      <div className="flex-1 rounded-lg overflow-hidden border border-gray-700">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          maxZoom={2}
          className="bg-gray-950"
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#374151"
          />
          <Controls className="!bg-gray-800 !border-gray-700" />
          <MiniMap
            className="!bg-gray-900"
            nodeColor={(node) =>
              node.data.isHighlighted ? "#3b82f6" : "#374151"
            }
          />
        </ReactFlow>
      </div>
    </div>
  );
}
"use client";

import { useAppStore } from "@/store/useAppStore";
import { DomNode } from "@/types";

function MatchItem({ node, index }: { node: DomNode; index: number }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-700 
                    bg-gray-800/30 hover:bg-gray-800/60 transition-colors">
      <span className="text-xs text-gray-500 mt-0.5 w-5 shrink-0">
        {index + 1}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-emerald-400 font-mono text-sm font-bold">
            &lt;{node.tag}&gt;
          </span>
          {node.id_attr && (
            <span className="text-yellow-400 font-mono text-xs">
              #{node.id_attr}
            </span>
          )}
          {node.classes.map((cls) => (
            <span key={cls} className="text-purple-400 font-mono text-xs">
              .{cls}
            </span>
          ))}
          <span className="text-gray-500 text-xs ml-auto">
            depth: {node.depth}
          </span>
        </div>
        <p className="text-gray-500 font-mono text-xs mt-1 truncate">
          {node.path}
        </p>
      </div>
    </div>
  );
}

export default function MatchList() {
  const { matches, isLoading } = useAppStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-400 text-sm">Mencari elemen...</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-400 text-sm">Belum ada hasil penelusuran</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-1">
      {matches.map((node, index) => (
        <MatchItem key={node.path} node={node} index={index} />
      ))}
    </div>
  );
}
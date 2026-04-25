import { memo } from "react";
import { Handle, Position } from "@xyflow/react";

interface DomNodeData {
  tag: string;
  id_attr?: string;
  classes: string[];
  depth: number;
  isHighlighted: boolean;
}

function DomNodeComponent({ data }: { data: DomNodeData }) {
  const { tag, id_attr, classes, isHighlighted } = data;

  return (
    <div
      className={`px-3 py-2 rounded-lg border text-xs font-mono min-w-[80px] text-center
        transition-all duration-300
        ${isHighlighted
          ? "border-blue-500 bg-blue-900/40 text-blue-300 shadow-lg shadow-blue-500/20"
          : "border-gray-600 bg-gray-800 text-gray-300"
        }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-500" />

      {/* Tag name */}
      <span className={`font-bold ${isHighlighted ? "text-blue-400" : "text-emerald-400"}`}>
        &lt;{tag}&gt;
      </span>

      {/* ID attribute */}
      {id_attr && (
        <div className="text-yellow-400 text-[10px]">#{id_attr}</div>
      )}

      {/* Classes */}
      {classes.length > 0 && (
        <div className="text-purple-400 text-[10px]">
          .{classes.join(" .")}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-gray-500" />
    </div>
  );
}

export default memo(DomNodeComponent);
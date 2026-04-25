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
      style={{
        padding: "4px 8px",
        borderRadius: "6px",
        border: isHighlighted
          ? "1px solid var(--iris, #cba6f7)"
          : "1px solid var(--border, #45475a)",
        backgroundColor: isHighlighted
          ? "rgba(203,166,247,0.15)"
          : "var(--bg-card, #313244)",
        minWidth: "60px",
        maxWidth: "100px",
        textAlign: "center",
        fontSize: "9px",
        fontFamily: "monospace",
      }}
    >
      <Handle type="target" position={Position.Top}
        style={{ background: "#6c7086", width: 4, height: 4 }} />

      {/* Tag */}
      <div style={{
        fontWeight: "bold",
        color: isHighlighted
          ? "var(--iris, #cba6f7)"
          : "var(--foam, #94e2d5)",
        fontSize: "9px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>
        &lt;{tag}&gt;
      </div>

      {/* ID */}
      {id_attr && (
        <div style={{
          color: "var(--gold, #f9e2af)",
          fontSize: "8px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          #{id_attr}
        </div>
      )}

      {/* Classes - hanya tampilkan 1 class pertama */}
      {classes.length > 0 && (
        <div style={{
          color: "var(--rose, #f38ba8)",
          fontSize: "8px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          .{classes[0]}{classes.length > 1 ? `+${classes.length - 1}` : ""}
        </div>
      )}

      <Handle type="source" position={Position.Bottom}
        style={{ background: "#6c7086", width: 4, height: 4 }} />
    </div>
  );
}

export default memo(DomNodeComponent);
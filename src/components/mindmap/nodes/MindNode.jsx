import { useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

export default function CustomNode({ id, data }) {
  const { setNodes } = useReactFlow();

  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  const startEditing = () => {
    setLabel(data.label);
    setEditing(true);
  };

  const save = () => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                label,
              },
            }
          : node,
      ),
    );

    setEditing(false);
  };

  const isRoot = data.isRoot;

  return (
    <div
      onDoubleClick={startEditing}
      className={`
        rounded-xl
        px-5
        py-3
        shadow-lg
        text-white
        min-w-[120px]
        text-center

        ${isRoot ? "bg-blue-500" : "bg-zinc-800"}
      `}
    >
      {editing ? (
        <input
          className="nodrag bg-transparent outline-none text-center w-full"
          autoFocus
          value={label}
          onFocus={(e) => e.target.select()}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();

            if (e.key === "Escape") {
              setLabel(data.label);
              setEditing(false);
            }
          }}
        />
      ) : (
        label
      )}

      <Handle type="target" position={Position.Left} className="opacity-0" />

      <Handle type="source" position={Position.Right} className="opacity-0" />
    </div>
  );
}

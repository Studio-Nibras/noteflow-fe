import { forwardRef } from "react";

import {
  ReactFlow,
  Background,
  BackgroundVariant,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import CustomNode from "./nodes/MindNode";

const MindMapCanvas = forwardRef(function MindMapCanvas(
  { nodes, edges, setNodes, setEdges },
  ref,
) {
  return (
    <div ref={ref} className="flex-1 min-h-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) =>
          setNodes((nds) => applyNodeChanges(changes, nds))
        }
        onEdgesChange={(changes) =>
          setEdges((eds) => applyEdgeChanges(changes, eds))
        }
        nodeTypes={{
          custom: CustomNode,
        }}
        fitView
        fitViewOptions={{
          padding: 0.3,
        }}
        nodesDraggable
        nodesConnectable={false}
        deleteKeyCode={null}
        elementsSelectable
      >
        <Background variant={BackgroundVariant.Lines} gap={24} size={1} />
      </ReactFlow>
    </div>
  );
});

export default MindMapCanvas;

import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import ThinkbeyondCard from "./ThinkbeyondCard";

export type NodeData = {
  label: string;
};

function MindMapNode({ id, data }: NodeProps<NodeData>) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#000" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <ThinkbeyondCard width={"100%"} cardName={data?.label} />
      <Handle
        type="source"
        position={Position.Bottom}
        id={id}
        style={{ background: "#000" }}
      />
    </>
  );
}

export default MindMapNode;

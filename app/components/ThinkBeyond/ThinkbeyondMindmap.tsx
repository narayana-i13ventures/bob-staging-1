"use client";
import React, { useCallback, useRef } from "react";
import ReactFlow, {
    Controls,
    OnConnectEnd,
    OnConnectStart,
    Panel,
    useStoreApi,
    Node,
    useReactFlow,
    ReactFlowProvider,
    NodeOrigin,
    ConnectionLineType,
    Background,
    BackgroundVariant
} from "reactflow";
import MindMapNode from "./MindMapNode";
import { shallow } from "zustand/shallow";
import useStore, { RFState } from "./store";

// we need to import the React Flow styles to make it work
import "reactflow/dist/style.css";
import { Box } from "@mui/material";

const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    // addChildNode: state.addChildNode,
});

const nodeTypes = {
    mindmap: MindMapNode,
};

function Flow() {
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
    } = useStore(
        selector,
        shallow
    );
    const store = useStoreApi();
    const { screenToFlowPosition } = useReactFlow();

    const getChildNodePosition = (
        event: MouseEvent | TouchEvent,
        parentNode?: Node
    ) => {
        const { domNode } = store.getState();

        if (
            !domNode ||
            // we need to check if these properites exist, because when a node is not initialized yet,
            // it doesn't have a positionAbsolute nor a width or height
            !parentNode?.positionAbsolute ||
            !parentNode?.width ||
            !parentNode?.height
        ) {
            return;
        }

        const isTouchEvent = "touches" in event;
        const x = isTouchEvent ? event.touches[0].clientX : event.clientX;
        const y = isTouchEvent ? event.touches[0].clientY : event.clientY;
        // we need to remove the wrapper bounds, in order to get the correct mouse position
        const panePosition = screenToFlowPosition({
            x,
            y,
        });

        // we are calculating with positionAbsolute here because child nodes are positioned relative to their parent
        return {
            x: panePosition.x - parentNode.positionAbsolute.x + parentNode.width / 2,
            y: panePosition.y - parentNode.positionAbsolute.y + parentNode.height / 2,
        };
    };

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            preventScrolling={true}

            fitView
            maxZoom={1}
            minZoom={0.5}
            defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        >
            <Controls showInteractive={true} />
            <Background color="#ccc" variant={BackgroundVariant.Dots} />
        </ReactFlow>
    );
}

const ThinkbeyondMindmap = () => (
    <Box sx={{ width: "100%", height: "700px" }}>
        <ReactFlowProvider>
            <Flow />
        </ReactFlowProvider>
    </Box>
);
export default ThinkbeyondMindmap;

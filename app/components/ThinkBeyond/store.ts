import {
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  XYPosition,
} from "reactflow";
import { createWithEqualityFn } from "zustand/traditional";

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
};

const useStore = createWithEqualityFn<RFState>((set, get) => ({
  nodes: [
    {
      id: "change",
      type: "mindmap",
      data: { label: "what is the change?" },
      position: { x: 0, y: 0 },
      draggable:true
    },
    {
      id: "moonshot",
      type: "mindmap",
      data: { label: "what is the moonshot?" },
      position: { x: 0, y: 700 },
    },
    {
      id: "future1",
      type: "mindmap",
      data: { label: "Future1" },
      position: { x: -300, y: 200 },
    },
    {
      id: "future1_okr",
      type: "mindmap",
      data: { label: "Future 1 OKR" },
      position: { x: -300, y: 350 },
    },
    {
      id: "future1_microframeworks",
      type: "mindmap",
      data: { label: "Microframeworks" },
      position: { x: -300, y: 500 },
    },
    {
      id: "future2",
      type: "mindmap",
      data: { label: "Future2" },
      position: { x: 0, y: 200 },
    },
    {
      id: "future2_okr",
      type: "mindmap",
      data: { label: "Future 2 OKR" },
      position: { x: 0, y: 350 },
    },
    {
      id: "future2_microframewroks",
      type: "mindmap",
      data: { label: "Microframeworks" },
      position: { x: 0, y: 500 },
    },
    {
      id: "future3",
      type: "mindmap",
      data: { label: "Future3" },
      position: { x: 300, y: 200 },
    },
    {
      id: "future3_okr",
      type: "mindmap",
      data: { label: "Future 3 OKR" },
      position: { x: 300, y: 350 },
    },
    {
      id: "future3_microframeworks",
      type: "mindmap",
      data: { label: "Microframeworks" },
      position: { x: 300, y: 500 },
    },
  ],
  edges: [
    {
      id: "1",
      source: "change",
      target: "future1",
      animated: true,
      style: { stroke: "#000", strokeWidth: 2 },
    },
    {
      id: "2",
      source: "future1",
      target: "future1_okr",
      animated: true,
      style: { stroke: "#000", strokeWidth: 2 },
    },
    {
      id: "3",
      source: "future1_okr",
      target: "future1_microframeworks",
      animated: true,
      style: { stroke: "#000", strokeWidth: 2 },
    },
    {
      id: "4",
      source: "future1_microframeworks",
      target: "moonshot",
      animated: true,
      style: { stroke: "#000", strokeWidth: 2 },
    },
    {
      id: "5",
      source: "change",
      target: "future2",
      animated: true,
      style: { stroke: "#000", strokeWidth: 2 },
    },
    {
      id: "6",
      source: "future2",
      target: "future2_okr",
      animated: true,
      style: { stroke: "#000", strokeWidth: 2 },
    },
    {
      id: "7",
      source: "future2_okr",
      target: "future2_microframewroks",
      animated: true,
      style: { stroke: "#000", strokeWidth: 2 },
    },
    {
      id: "8",
      source: "future2_microframewroks",
      target: "moonshot",
      animated: true,
      style: { stroke: "#000", strokeWidth: 2 },
    },
    {
      id: "9",
      source: "change",
      target: "future3",
      animated: true,
      style: { stroke: "#000", strokeWidth: 2 },
    },
    {
      id: "10",
      source: "future3",
      target: "future3_okr",
      animated: true,
      style: { stroke: "#000", strokeWidth: 2 },
    },
    {
      id: "11",
      source: "future3_okr",
      target: "future3_microframeworks",
      animated: true,
      style: { stroke: "#000", strokeWidth: 2 },
    },
    {
      id: "12",
      source: "future3_microframeworks",
      target: "moonshot",
      animated: false,
      style: { stroke: "#ff0000", strokeWidth: 2 },
    },
  ],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
}));

export default useStore;

import { appNode } from "@/types/appNodes";
import { TaskType } from "@/types/task";

export function CreateFlowNode(
  nodeType: TaskType,
  position?: { x: number; y: number }
): appNode {
  return {
    id: crypto.randomUUID(),
    type: "FlowScrapeNode",
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
}

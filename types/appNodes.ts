import { Node } from "@xyflow/react";
import { TaskType } from "./task";

export interface AppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface appNode extends Node {
  data: AppNodeData;
}

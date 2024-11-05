import { TaskParam, TaskParamType } from "@/types/task";
import StringParam from "./param/StringParam";
import { useReactFlow } from "@xyflow/react";
import { appNode } from "@/types/appNodes";
import { useCallback } from "react";

export default function NodeParamField({
  param,
  nodeId,
}: {
  param: TaskParam;
  nodeId: string;
}) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as appNode;
  const value = node?.data.inputs?.[param.name];
  console.log("@VALUE", value);

  const updatedNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [nodeId, updateNodeData, param.name, node?.data.inputs]
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updatedNodeParamValue}
        />
      );
    default:
      return (
        <div className="w-full">
          <div className="text-xs text-muted-foreground">Not implemented</div>
        </div>
      );
  }
}

import { TaskParam, TaskParamType } from "@/types/task";
import StringParam from "./param/StringParam";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/types/appNodes";
import { useCallback } from "react";
import BrowserInstanceParam from "@/app/workflow/_components/nodes/param/BrowserInstanceParam";
import SelectParam from "./param/SelectParam";

export default function NodeParamField({
  param,
  nodeId,
  disabled,
}: {
  param: TaskParam;
  nodeId: string;
  disabled: boolean;
}) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name];

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
          disabled={disabled}
        />
      );

    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={""}
          updateNodeParamValue={updatedNodeParamValue}
        />
      );

    case TaskParamType.SELECT:
      return (
        <SelectParam
          param={param}
          value={value}
          updateNodeParamValue={updatedNodeParamValue}
          disabled={disabled}
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

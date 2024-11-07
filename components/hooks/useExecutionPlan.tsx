import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
  }, [toObject]);
  const result = FlowToExecutionPlan(nodes, edges);
  return generateExecutionPlan;
};

export default useExecutionPlan;

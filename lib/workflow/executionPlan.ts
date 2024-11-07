import { Edge, getIncomers } from "@xyflow/react";
import { AppNode } from "@/types/appNodes";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@/types/workflow";
import { TaskRegistry } from "./task/registry";
import { get } from "http";

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlan;
};

export function FlowToExecutionPlan(
  nodes: AppNode[],
  edges: Edge[]
): FlowToExecutionPlanType {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint
  );

  if (!entryPoint) {
    throw new Error("No entry point found");
  }
    
const planned = new Set<string>();
    
  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
      },
      
      for (let phase = 2;
        phase < nodes.length || planned.size < nodes.length;
        phase++) {
        const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };
        for (const currentNode of nodes) {
            if (planned.has(currentNode.id)) {
                // Node already put in the execution plan
                continue;
            }

            const invalidInputs = getInvalidInputs(currentNode, edges, planned);
            if (invalidInputs.length > 0) {
                const incomers = getIncomers(currentNode, nodes, edges);
                if (incomers.every((incomer) => planned.has(incomer.id))) {
                    // if all incomers/edges are planned and ther are still invalid inputs
                    // then the node has an invalid input
                    // which means that the workflow is invalid
                    console.error(`Invalid inputs for node ${currentNode.id}`);
                    throw new Error("Invalid inputs");
                } else {
                    // lets skip this node for now
                    continue;
                }
            }
            nextPhase.nodes.push(currentNode);
            planned.add(currentNode.id);
        }
    
    };
  return { executionPlan };
}


function getInvalidInputs(
    node: AppNode,
    edges: Edge[],
    planned: Set<string>
) {
    const invalidInputs = [];
    const inputs = TaskRegistry[node.data.type].inputs;
    for (const input of inputs) {
        const inputValue = node.data[input.name];
        const inputValueProvided = inputValue?.length > 0;
        if (inputValueProvided) {
            continue;
        }

        // If a value is not provided by the user then we need to check 
        // if there is an output link that provides the value to the current input
        const incomingEdges = edges.filter((edge) => edge.target === node.id);
        const inputLinkedToOutput = incomingEdges.find((edge) => edge.targetHandle === input.name);

        const requiredInputProvidedByVisitedOutput = input.required && inputLinkedToOutput && planned.has(inputLinkedToOutput.source);

        if (requiredInputProvidedByVisitedOutput) {
            // the inputs is required and we have a valid value for it
            // provided by a task that is already planned
            continue;
        } else if (!input.required) {
            // if the inputs is not required but there is an output linked to it
            // then we need to be sure that the output is already planned
            if (!inputLinkedToOutput) {
                continue;
            }
            if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
                // the ouput is providing a value to the input : we are good
                continue;
            }
        }


        invalidInputs.push(input.name);
    }

    return invalidInputs;

  }
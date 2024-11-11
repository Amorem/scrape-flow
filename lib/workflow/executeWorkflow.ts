import "server-only";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { init } from "next/dist/compiled/webpack/webpack";
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from "@/types/workflow";
import { initialize } from "next/dist/server/lib/render-server";
import { waitFor } from "../helper/waitFor";

export async function ExecuteWorkflow(executionId: string) {
  const execution = await prisma.workflowExecution.findUnique({
    where: {
      id: executionId,
    },
    include: {
      workflow: true,
      phases: true,
    },
  });

  if (!execution) {
    throw new Error("Execution not found");
  }

  // TODO: Setup the execution environment

  const environment = {
    phases: {},
  };

  // TODO: Initialize workflow execution
  await initializeWorkflowExecution(executionId, execution.workflowId);

  // TODO: Initialize phases status
  await initializePhasesStatuses(execution);

  let creditsConsumed = 0;
  let executionFailed = false;
  for (const phase of execution.phases) {
    waitFor(5000);
    // TODO: Consume credits
    // TODO: Execute phase
  }

  // TODO: Finalize execution
  await finalizeExecution(
    executionId,
    execution.workflowId,
    executionFailed,
    creditsConsumed
  );

  // TODO: Cleanup execution environment

  revalidatePath("workflows/runs");
}

async function initializeWorkflowExecution(
  executionId: string,
  workflowId: string
) {
  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING,
    },
  });

  await prisma.workflow.update({
    where: {
      id: workflowId,
    },
    data: {
      lastRunAt: new Date(),
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
      lastRunId: executionId,
    },
  });
}

async function initializePhasesStatuses(execution: any) {
  await prisma.executionPhase.updateMany({
    where: {
      id: {
        in: execution.phases.map((phase: any) => phase.id),
      },
    },
    data: {
      status: ExecutionPhaseStatus.PENDING,
    },
  });
}

async function finalizeExecution(
  executionId: string,
  workflowId: string,
  executionFailed: boolean,
  creditsConsumed: number
) {
  const finalStatus = executionFailed
    ? WorkflowExecutionStatus.FAILED
    : WorkflowExecutionStatus.COMPLETED;

  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      creditsConsumed,
    },
  });

  await prisma.workflow
    .update({
      where: {
        id: workflowId,
        lastRunId: executionId,
      },
      data: {
        lastRunStatus: finalStatus,
      },
    })
    .catch((err) => {
      // Ignore error
      // this means that we have triggered others runs for this workflow
      // while an execution was running
    });
}

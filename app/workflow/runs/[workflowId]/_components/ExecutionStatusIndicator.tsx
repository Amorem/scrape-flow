import { cn } from "@/lib/utils";
import { WorkflowExecutionStatus } from "@/types/workflow";

export default function ExecutionStatusIndicator({
  status,
}: {
  status: WorkflowExecutionStatus;
}) {
  const indicatorColor: Record<WorkflowExecutionStatus, string> = {
    PENDING: "bg-slate-400",
    RUNNING: "bg-yellow-400",
    FAILED: "bg-red-400",
    COMPLETED: "bg-emerald-600",
  };
  return <div className={cn("w-2 h-2 rounded-full", indicatorColor[status])} />;
}

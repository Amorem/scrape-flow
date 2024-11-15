import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, Edit3Icon, LucideProps } from "lucide-react";

export const FillInputTask = {
  type: TaskType.FILL_INPUT,
  label: "Fill input",
  icon: (props) => <Edit3Icon className="stroke-orange-400" {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Web page",
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
      hideHandle: false,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      required: true,
      hideHandle: false,
    },
    {
      name: "Value",
      type: TaskParamType.STRING,
      required: true,
      hideHandle: false,
    },
  ] as const,
  outputs: [
    {
      name: "Wep page",
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;

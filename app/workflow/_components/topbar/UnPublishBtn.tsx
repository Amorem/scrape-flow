"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { DownloadIcon } from "lucide-react";
import { UnpublishWorkflow } from "@/app/actions/workflows/unPublishWorkflow";

export default function UnPublishBtn({ workflowId }: { workflowId: string }) {
  const mutation = useMutation({
    mutationFn: UnpublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow unpublished", { id: workflowId });
    },
    onError: (error) => {
      toast.error("Something went wrong", { id: workflowId });
    },
  });

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading("Unpublishing workflow...", { id: workflowId });
        mutation.mutate(workflowId);
      }}
    >
      <DownloadIcon size={16} className="stroke-orange-500" />
      Unpublish
    </Button>
  );
}

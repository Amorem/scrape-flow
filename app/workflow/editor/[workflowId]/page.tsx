import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Editor from "../../_components/Editor";

export default async function page({
  params,
}: {
  params: { workflowId: string };
}) {
  const { workflowId } = params;
  const { userId } = await auth();

  if (!userId) return <div>Not authenticated</div>;

  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId, userId },
  });

  if (!workflow) {
    return <div>Workflow doesnt exist</div>;
  }

  return <Editor workflow={workflow} />;
}

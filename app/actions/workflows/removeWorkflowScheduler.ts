"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function RemoveWorkflowScheduler(id: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthenticated");
  }

  await prisma.workflow.update({
    where: {
      userId,
      id,
    },
    data: {
      cron: null,
      nextRunAt: null,
    },
  });

  revalidatePath(`/workflows`);
}

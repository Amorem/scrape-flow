import { ExecutionEnvironment } from "@/types/executor";
import { waitFor } from "@/lib/helper/waitFor";
import { DeliverViaWebhookTask } from "../task/DeliverViaWebhook";

export async function DeliverViaWebhookExecutor(
  environment: ExecutionEnvironment<typeof DeliverViaWebhookTask>
): Promise<boolean> {
  try {
    const targetUrl = environment.getInput("Target URL");
    if (!targetUrl) {
      environment.log.ERROR("input->targetUrl not defined");
      return false;
    }

    const body = environment.getInput("Body");
    if (!body) {
      environment.log.ERROR("input->body not defined");
      return false;
    }

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const statusCode = response.status;
    if (statusCode !== 200) {
      environment.log.ERROR(`status code: ${statusCode}`);
      return false;
    }

    const responseBody = await response.json();
    environment.log.INFO(JSON.stringify(responseBody, null, 4));

    return true;
  } catch (error: any) {
    environment.log.ERROR(error.message);
    return false;
  }
}

import { ExecutionEnvironment } from "@/types/executor";
import { NavigateUrlTask } from "../task/NavigateUrl";

export async function NavigateUrlExecutor(
  environment: ExecutionEnvironment<typeof NavigateUrlTask>
): Promise<boolean> {
  try {
    const url = environment.getInput("URL");
    if (!url) {
      environment.log.ERROR("input->url not defined");
      return false;
    }

    await environment.getPage()!.goto(url);
    environment.log.INFO(`visited ${url}`);

    return true;
  } catch (error: any) {
    environment.log.ERROR(error.message);
    return false;
  }
}

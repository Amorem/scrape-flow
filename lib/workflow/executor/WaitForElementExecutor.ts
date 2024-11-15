import { ExecutionEnvironment } from "@/types/executor";
import { WaitForElementTask } from "../task/WaitForElement";

export async function WaitForElementExecutor(
  environment: ExecutionEnvironment<typeof WaitForElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.ERROR("input->selector not defined");
      return false;
    }

    const visibility = environment.getInput("Visibility");
    if (!visibility) {
      environment.log.ERROR("input->visibility not defined");
      return false;
    }

    await environment.getPage()!.waitForSelector(selector, {
      visible: visibility === "visible",
      hidden: visibility === "hidden",
    });

    environment.log.INFO(`Element ${selector} became: ${visibility}`);

    return true;
  } catch (error: any) {
    environment.log.ERROR(error.message);
    return false;
  }
}

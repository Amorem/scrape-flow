import { ExecutionEnvironment } from "@/types/executor";
import { FillInputTask } from "../task/FillIInput";
import { waitFor } from "@/lib/helper/waitFor";

export async function FillInputExecutor(
  environment: ExecutionEnvironment<typeof FillInputTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.ERROR("input->selector not defined");
      return false;
    }
    const value = environment.getInput("Value");
    if (!value) {
      environment.log.ERROR("input->value not defined");
      return false;
    }

    await environment.getPage()!.type(selector, value);
    await waitFor(3000);
    return true;
  } catch (error: any) {
    environment.log.ERROR(error.message);
    return false;
  }
}

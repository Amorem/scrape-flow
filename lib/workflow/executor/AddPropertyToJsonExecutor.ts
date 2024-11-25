import { ExecutionEnvironment } from "@/types/executor";
import { AddPropertyToJsonTask } from "../task/AddPropertyToJson";

export async function AddPropertyToJsonExecutor(
  environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>
): Promise<boolean> {
  try {
    const jsonData = environment.getInput("JSON");
    if (!jsonData) {
      environment.log.ERROR("input->JSON not defined");
      return false;
    }

    const propertyName = environment.getInput("Property name");
    if (!propertyName) {
      environment.log.ERROR("input->propertyName not defined");
      return false;
    }

    const propertyValue = environment.getInput("Property value");
    if (!propertyValue) {
      environment.log.ERROR("input->propertyValue not defined");
      return false;
    }

    const json = JSON.parse(jsonData);
    json[propertyName] = propertyValue;

    environment.setOutput("Updated JSON", JSON.stringify(json));
    return true;
  } catch (error: any) {
    environment.log.ERROR(error.message);
    return false;
  }
}

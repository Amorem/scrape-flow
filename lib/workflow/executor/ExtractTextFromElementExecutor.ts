import { ExecutionEnvironment } from "@/types/executor";
import { ExtractTextFromElementTask } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";

export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.ERROR("Selector is not provided");
      return false;
    }
    const html = environment.getInput("Html");
    if (!html) {
      environment.log.ERROR("HTML is not provided");
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      environment.log.ERROR(`Element not found for selector: ${selector}`);
      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      environment.log.ERROR(`No text found for selector: ${selector}`);
      return false;
    }

    environment.setOutput("Extracted text", extractedText);

    return true;
  } catch (error: any) {
    environment.log.ERROR(error.message);
    return false;
  }
}

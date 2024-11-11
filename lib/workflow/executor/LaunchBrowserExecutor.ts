import { waitFor } from "@/lib/helper/waitFor";
import { ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "@/lib/workflow/task/LaunchBrowser";
import puppeteer from "puppeteer";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");
    console.log("Launching browser for website: ", websiteUrl);
    const browser = await puppeteer.launch({
      headless: false, // For testing
    });
    await waitFor(3000);
    await browser.close();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

import { ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "@/lib/workflow/task/LaunchBrowser";
import puppeteer from "puppeteer";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");

    const browser = await puppeteer.launch({
      headless: true,
    });
    environment.log.INFO(`Browser started successfully`);
    environment.setBrowser(browser);
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.INFO(`Opened page at: ${websiteUrl}`);
    return true;
  } catch (error: any) {
    environment.log.ERROR(error.message);
    return false;
  }
}

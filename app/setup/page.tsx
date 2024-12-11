import { waitFor } from "@/lib/helper/waitFor";
import { SetupUser } from "../actions/billing/setupUser";

export default async function SetupPage() {
  await waitFor(5000);
  return await SetupUser();
}

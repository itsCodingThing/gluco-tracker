import { getMeasurements } from "@/lib/firestore";
import { getUserData } from "@/lib/storage";
import { defer } from "react-router-dom";

export interface PageLoaderData {
  measurements: ReturnType<typeof getMeasurements>;
}
export type AwaitedLoaderData = Awaited<ReturnType<typeof getMeasurements>>;

export async function measurementPageLoader() {
  const user = await getUserData();

  return defer({
    measurements: getMeasurements(user.userId),
  });
}

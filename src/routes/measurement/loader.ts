import { getMeasurements } from "@/lib/db";
import { storage } from "@/lib/storage";
import { defer } from "react-router-dom";

export interface PageLoaderData {
  measurements: ReturnType<typeof getMeasurements>;
}
export type AwaitedLoaderData = Awaited<ReturnType<typeof getMeasurements>>;

export async function measurementPageLoader() {
  const user = await storage.getUserData();

  return defer({
    measurements: getMeasurements(user.userId),
  });
}

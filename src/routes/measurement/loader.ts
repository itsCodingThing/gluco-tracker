import { getMeasurements } from "@/lib/firestore/measurement";
import { getUserData } from "@/lib/storage";
import { defer } from "react-router-dom";

export type MeasurementLoaderData = Awaited<ReturnType<typeof getMeasurements>>;
export interface MeasurementPageLoaderData {
  measurements: MeasurementLoaderData;
}

export async function measurementLoader() {
  const user = await getUserData();

  return defer({
    measurements: getMeasurements(user.userId),
  });
}

import { getMeasurements } from "@/lib/firestore";
import { getUserData } from "@/lib/storage";
import { defer } from "react-router-dom";

type AwaitedLoaderData = Awaited<ReturnType<typeof getMeasurements>>;
export interface MeasurementPageLoaderData {
  measurements: AwaitedLoaderData;
}

export async function measurementLoader() {
  const user = await getUserData();

  return defer({
    measurements: getMeasurements(user.userId),
  });
}

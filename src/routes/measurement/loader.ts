import { getMeasurements } from "@/lib/db";
import { defer } from "react-router-dom";

export interface PageLoaderData {
  measurements: ReturnType<typeof getMeasurements>;
}
export type AwaitedLoaderData = Awaited<ReturnType<typeof getMeasurements>>;

export async function loader() {
  const id = localStorage.getItem("uid") ?? "";

  return defer({
    measurements: getMeasurements(id),
  });
}

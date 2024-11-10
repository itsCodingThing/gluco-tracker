import { getMeasurementByType, getMeasurements } from "@/backend/measurement";
import { getUserData } from "@/lib/storage";
import { defer, LoaderFunctionArgs, redirect } from "react-router-dom";

export interface MeasurementPageLoaderData {
  measurements: ReturnType<typeof getMeasurements>;
  measurementByType: Awaited<ReturnType<typeof getMeasurementByType>>;
}

export async function measurementLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");

  const user = await getUserData();
  if (user.isErr) {
    return redirect("/login");
  }

  let measurementByType: MeasurementPageLoaderData["measurementByType"] = [];

  if (type) {
    measurementByType = await getMeasurementByType(type);
  }

  return defer({
    measurements: getMeasurements(user.unwrap().userId),
    measurementByType,
  });
}

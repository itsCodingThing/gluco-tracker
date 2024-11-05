import { getMeasurementDetailsByUserId } from "@/lib/firestore/measurement-details";
import { getUserData } from "@/lib/storage";
import { defer, redirect } from "react-router-dom";

export interface DashboardPageLoaderData {
  user: ReturnType<typeof getUserData>;
  measurementDetails: Awaited<ReturnType<typeof getMeasurementDetailsByUserId>>;
}

export default async function dashboardPageLoader() {
  try {
    const result = await getUserData();

    if (!result.isAuthenticated) {
      return redirect("/login");
    }

    const measurementDetails = await getMeasurementDetailsByUserId(
      result.userId,
    );

    return defer({
      user: result,
      measurementDetails,
    });
  } catch {
    return redirect("/login");
  }
}

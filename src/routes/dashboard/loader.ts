import { getMeasurementDetailsByUserId } from "@/lib/firestore/measurement-details";
import { getProfile } from "@/lib/firestore/profile";
import { getUserData } from "@/lib/storage";
import { defer, redirect } from "react-router-dom";

export interface DashboardPageLoaderData {
  user: ReturnType<typeof getUserData>;
  measurementDetails: Awaited<ReturnType<typeof getMeasurementDetailsByUserId>>;
  profile: Awaited<ReturnType<typeof getProfile>>;
}

export default async function dashboardPageLoader() {
  try {
    const user = await getUserData();

    if (!user.isAuthenticated) {
      return redirect("/login");
    }

    const measurementDetails = await getMeasurementDetailsByUserId(user.userId);
    const profile = await getProfile(user.userId);

    return defer({
      user: user,
      measurementDetails,
      profile,
    });
  } catch {
    return redirect("/login");
  }
}

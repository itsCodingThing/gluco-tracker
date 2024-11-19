import { getLoggedInUser } from "@/backend/auth";
import { getMeasurementDetailsByUserId } from "@/backend/measurement";
import { getProfile } from "@/backend/profile";
import { AuthUser } from "@/types/auth";
import { defer, redirect } from "react-router-dom";


export interface DashboardPageLoaderData {
  user: AuthUser;
  measurementDetails: Awaited<ReturnType<typeof getMeasurementDetailsByUserId>>;
  profile: Awaited<ReturnType<typeof getProfile>>;
}

export default async function dashboardPageLoader() {
  const user = getLoggedInUser();
  if (!user) {
    return redirect("/login");
  }

  try {
    const [measurementDetails, profile] = await Promise.all([
      getMeasurementDetailsByUserId(user.userId),
      getProfile(user.userId),
    ]);

    return defer({
      user: user,
      measurementDetails,
      profile,
    });
  } catch {
    return redirect("/login");
  }
}

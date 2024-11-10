import { getMeasurementDetailsByUserId } from "@/backend/measurement";
import { getProfile } from "@/backend/profile";
import { getUserData } from "@/lib/storage";
import { defer, redirect } from "react-router-dom";

export interface DashboardPageLoaderData {
  user: ReturnType<typeof getUserData>;
  measurementDetails: Awaited<ReturnType<typeof getMeasurementDetailsByUserId>>;
  profile: Awaited<ReturnType<typeof getProfile>>;
}

export default async function dashboardPageLoader() {
  const result = await getUserData();
  const user = result.match<{ isAuthenticated: boolean; userId: string }>({
    onOk: (v) => v,
    onErr: () => {
      return { isAuthenticated: false, userId: "" };
    },
  });

  if (!user.isAuthenticated) {
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

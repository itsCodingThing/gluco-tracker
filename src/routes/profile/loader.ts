import { getProfile } from "@/lib/firestore/profile";
import { getUserData } from "@/lib/storage";
import { defer } from "react-router-dom";

type ProfileLoaderData = Awaited<ReturnType<typeof getProfile>>;

export interface ProfilePageLoaderData {
  profile: ProfileLoaderData;
}

export async function profilePageLoader() {
  const user = await getUserData();
  const profile = await getProfile(user.userId);

  return defer({
    profile,
  });
}

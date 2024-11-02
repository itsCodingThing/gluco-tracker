import type { UserData } from "@/lib/storage";
import { useRouteLoaderData } from "react-router-dom";

export function useUser() {
  const user = useRouteLoaderData("root") as UserData;

  return user;
}

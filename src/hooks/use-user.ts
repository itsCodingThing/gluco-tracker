import type { AuthUser } from "@/types/auth";
import { useRouteLoaderData } from "react-router-dom";

export function useUser() {
  const user = useRouteLoaderData("root") as AuthUser;

  return user;
}

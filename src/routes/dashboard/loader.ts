import { storage } from "@/lib/storage";
import { redirect } from "react-router-dom";

export default async function dashboardPageLoader() {
  try {
    const result = await storage.getUserData();

    if (!result.isAuthenticated) {
      return redirect("/login");
    }

    return result;
  } catch {
    return redirect("/login");
  }
}

import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./routes/login/page";
import { authProvider } from "./lib/auth";
import DashboardPage from "./routes/dashboard/page";
import DashboardLayout from "./routes/dashboard/layout";
import ProfilePage from "./routes/profile/page";
import MeasurementPage from "./routes/measurement/page";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      if (!authProvider.isAuthenticated) {
        return redirect("/login");
      }

      return null;
    },
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "profile",
        Component: ProfilePage,
      },
      {
        path: "measurement",
        Component: MeasurementPage,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

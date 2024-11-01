import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./routes/login/page";
import { authProvider } from "./lib/auth";
import DashboardPage from "./routes/dashboard/page";
import DashboardLayout from "./routes/dashboard/layout";

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
        lazy: async () => {
          const ProfilePage = await import("./routes/profile/page");
          return {
            Component: ProfilePage.default,
          };
        },
      },
      {
        path: "measurement",
        lazy: async () => {
          const MeasuremenPage = await import("./routes/measurement/page");
          const { loader } = await import("./routes/measurement/loader");

          return {
            Component: MeasuremenPage.default,
            loader,
          };
        },
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

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./routes/login/page";
import DashboardPage from "./routes/dashboard/page";
import DashboardLayout from "./routes/dashboard/layout";
import dashboardPageLoader from "./routes/dashboard/loader";
import SignupPage from "./routes/signup/pape";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader: dashboardPageLoader,
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "add-measurement",
        lazy: async () => {
          const AddMeasurementPage = await import(
            "./routes/add-measurement/page"
          );

          return {
            Component: AddMeasurementPage.default,
          };
        },
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
          const { measurementPageLoader } = await import(
            "./routes/measurement/loader"
          );

          return {
            Component: MeasuremenPage.default,
            loader: measurementPageLoader,
          };
        },
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

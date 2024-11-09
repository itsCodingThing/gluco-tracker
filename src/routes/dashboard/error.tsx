import { useRouteError } from "react-router-dom";

export default function DashboardErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="container mx-auto">
      <h1>Error Something went wrong</h1>
      <p>clear your cache and login again</p>
    </div>
  );
}

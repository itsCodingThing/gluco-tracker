import Header from "./header";
import { formatDate } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CirclePlusIcon } from "@/components/icons";
import { Link, useRouteLoaderData } from "react-router-dom";
import type { DashboardPageLoaderData } from "./loader";
import PageTransition from "@/components/page-transition";

export default function DashboardPage() {
  const data = useRouteLoaderData("root") as DashboardPageLoaderData;

  return (
    <PageTransition>
      <div className="h-full container mx-auto">
        <Header title="GlucoTracker" />
        <div className="p-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Latest Reading</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center">
                {data.measurementDetails?.latestMeasurement.measuremnt || "--"}
                <span className="text-xl"> mg/dL</span>
              </div>
              <div className="text-center text-muted-foreground">
                {formatDate(
                  data.measurementDetails?.latestMeasurement.date || new Date(),
                  "dd-MM-yyyy hh:mm",
                ) || "No readings yet"}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-10 grid place-items-center gap-2">
          <Link to="add-measurement">
            <Card className="w-[200px] h-[200px]">
              <CardContent className="h-full flex flex-col justify-center items-center gap-3">
                <p>Add Readings</p>
                <CirclePlusIcon />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}

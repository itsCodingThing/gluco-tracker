import { lazy, Suspense } from "react";
import Header from "./header";
import { formatDate } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Loader from "@/components/loader";

const latestMeasurement = {
  measurement: 123,
  createdAt: new Date().toISOString(),
};

const AddMeasurementCard = lazy(() => import("./add-measurement-card"));

export default function DashboardPage() {
  return (
    <div className="h-full container mx-auto">
      <Header title="GlucoTracker" />
      <div className="p-4">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Latest Reading</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center">
              {latestMeasurement.measurement || "--"}
              <span className="text-xl"> mg/dL</span>
            </div>
            <div className="text-center text-muted-foreground">
              {formatDate(latestMeasurement.createdAt, "dd-MM-yyyy hh:mm") ||
                "No readings yet"}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-10 grid place-items-center gap-2">
        <Suspense fallback={<Loader />}>
          <AddMeasurementCard />
        </Suspense>
      </div>
    </div>
  );
}

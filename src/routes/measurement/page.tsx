import { lazy, Suspense } from "react";
import Loader from "@/components/loader";
import { MeasurementPageLoaderData } from "./loader";
import { Await, useLoaderData } from "react-router-dom";
import PageTransition from "@/components/page-transition";

const MeasurementTable = lazy(() => import("./measurement-table"));
const MeasurementChart = lazy(() => import("./chart"));

export default function MeasurementPage() {
  const data = useLoaderData() as MeasurementPageLoaderData;

  return (
    <PageTransition>
      <div className="container mx-auto grid gap-3 p-2">
        <Suspense fallback={<Loader />}>
          <Await resolve={data.measurements}>
            <MeasurementChart />
          </Await>
        </Suspense>

        <Suspense fallback={<Loader />}>
          <Await resolve={data.measurements}>
            <MeasurementTable />
          </Await>
        </Suspense>
      </div>
    </PageTransition>
  );
}

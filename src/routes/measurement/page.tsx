import { lazy, Suspense } from "react";
import Loader from "@/components/loader";
import { MeasurementChart } from "./chart";
import { MeasurementPageLoaderData } from "./loader";
import { Await, useLoaderData } from "react-router-dom";
import PageTransition from "@/components/page-transition";

const MeasurementTable = lazy(() => import("./measurement-table"));

export default function MeasurementPage() {
  const data = useLoaderData() as MeasurementPageLoaderData;

  return (
    <PageTransition>
      <div className="container mx-auto grid">
        <MeasurementChart />
        <Suspense fallback={<Loader />}>
          <Await resolve={data.measurements}>
            <MeasurementTable />
          </Await>
        </Suspense>
      </div>
    </PageTransition>
  );
}

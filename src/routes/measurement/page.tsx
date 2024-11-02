import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Suspense } from "react";
import Loader from "@/components/loader";
import { MeasurementChart } from "./chart";
import { AwaitedLoaderData, PageLoaderData } from "./loader";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";

function MeasurementTable() {
  const data = useAsyncValue() as AwaitedLoaderData;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Reading</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Dosage</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((result) => {
          return (
            <TableRow key={result.id}>
              <TableCell className="font-medium">
                {result.measurement}
              </TableCell>
              <TableCell>{result.status}</TableCell>
              <TableCell>{result.dosage}</TableCell>
              <TableCell>{result.createdAt}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableCaption>Most recent readings.</TableCaption>
    </Table>
  );
}

export default function MeasurementPage() {
  const data = useLoaderData() as PageLoaderData;

  return (
    <div className="container mx-auto grid">
      <MeasurementChart />
      <Suspense fallback={<Loader />}>
        <Await resolve={data.measurements}>
          <MeasurementTable />
        </Await>
      </Suspense>
    </div>
  );
}

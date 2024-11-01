import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVerticalIcon } from "lucide-react";
import { MeasurementChart } from "./chart";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Loader from "@/components/loader";
import { AwaitedLoaderData, PageLoaderData } from "./loader";

function MeasurementTable() {
  const data = useAsyncValue() as AwaitedLoaderData;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Reading</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="max-h-[300px] overflow-y-auto">
        {data.map((result) => {
          return (
            <TableRow key={result.id}>
              <TableCell className="font-medium">{result.reading}</TableCell>
              <TableCell>{result.status}</TableCell>
              <TableCell>{result.createdAt}</TableCell>
              <TableCell className="text-center">
                <EllipsisVerticalIcon />
              </TableCell>
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
    <div className="container mx-auto">
      <MeasurementChart />
      <Suspense fallback={<Loader />}>
        <Await resolve={data.measurements}>
          <MeasurementTable />
        </Await>
      </Suspense>
    </div>
  );
}

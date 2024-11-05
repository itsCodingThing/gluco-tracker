import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
  Table,
} from "@/components/ui/table";
import { useAsyncValue } from "react-router-dom";
import { MeasurementLoaderData } from "./loader";

export default function MeasurementTable() {
  const data = useAsyncValue() as MeasurementLoaderData;

  return (
    <>
      <div className="my-3">
        <p>Only shows last 3 months of data</p>
        <p>You can download data for later months</p>
      </div>
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
    </>
  );
}

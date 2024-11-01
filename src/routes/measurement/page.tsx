import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";
import { getMeasurements } from "@/lib/db";
import { useLocalStorage } from "react-use";
import { EllipsisVerticalIcon, LoaderCircleIcon } from "lucide-react";
import { MeasurementChart } from "./chart";

export default function MeasurementPage() {
  const [value] = useLocalStorage<string>("uid", "", { raw: true });
  const { data, isLoading } = useSWR(
    { url: "/api/user/measurement", id: value ?? "" },
    ({ id }) => getMeasurements(id),
    {
      revalidateOnFocus: false,
    },
  );

  if (isLoading) {
    return (
      <div className="w-full h-40 grid place-items-center">
        <LoaderCircleIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <MeasurementChart />
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
          {data?.map((result) => {
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
    </div>
  );
}

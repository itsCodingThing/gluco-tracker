import { getAllUserReadings } from "@/lib/db";
import { useLocalStorage } from "react-use";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ReadingsPage() {
  const [value] = useLocalStorage<string>("uid", "", { raw: true });
  const { data, isLoading } = useSWR(
    { url: "user/readings", id: value ?? "" },
    ({ id }) => getAllUserReadings(id),
    {
      revalidateOnFocus: false,
    },
  );

  if (isLoading) {
    return <p>laoding</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold">Readings</h1>
      <Table>
        <TableCaption>Most recent readings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Reading</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((result) => {
            return (
              <TableRow key={result.id}>
                <TableCell className="font-medium">{result.reading}</TableCell>
                <TableCell>normal</TableCell>
                <TableCell>{result.createdAt}</TableCell>
                <TableCell className="text-right">:</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

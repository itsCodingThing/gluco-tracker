import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { useAsyncValue } from "react-router-dom";
import { MeasurementLoaderData } from "./loader";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function SelectRowCount({ onSelect }: { onSelect: (value: string) => void }) {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="Rows" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Rows</SelectLabel>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="30">30</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function useTable<T>(data: T[]) {
  // useState hooks order is important do not touch
  const [options, setOptions] = useState({ perPageRows: 5 });
  const [rows, setRows] = useState(() => {
    const list = data.slice(0, options.perPageRows);
    return list;
  });
  const [page, setPage] = useState(() => {
    return {
      currentPage: 1,
      maxPages: Math.ceil(data.length / options.perPageRows),
    };
  });

  function updateRowsCount(count: number) {
    setRows(() => {
      if (count > data.length) {
        const list = data.slice(0, data.length);
        return list;
      }

      const list = data.slice(0, count);
      return list;
    });
  }

  function gotoNextPage() {
    const nextPage = page.currentPage + 1;

    if (nextPage < page.maxPages) {
      const startIdx = page.currentPage * options.perPageRows;
      const endIdx = nextPage * options.perPageRows;

      const list = data.slice(startIdx, endIdx);

      setRows(list);
      setPage((prev) => ({ ...prev, currentPage: nextPage }));
    }
  }

  function gotoPrevPage() {
    const prevPage = page.currentPage - 1;

    if (prevPage > 0) {
      const startIdx = (prevPage - 1) * options.perPageRows;
      const endIdx = prevPage * options.perPageRows;

      const list = data.slice(startIdx, endIdx);

      setRows(list);
      setPage((prev) => ({ ...prev, currentPage: prevPage }));
    }
  }

  function gotoPage(n: number) {
    if (n > 0 && n < page.maxPages) {
      const startIdx = (n - 1) * options.perPageRows;
      const endIdx = n * options.perPageRows;

      const list = data.slice(startIdx, endIdx);

      setRows(list);
      setPage((prev) => ({ ...prev, currentPage: n }));
    }
  }

  function updatePerPageRows(n: number) {
    setOptions({ perPageRows: n });
    updateRowsCount(n);
  }

  return {
    rows,
    updatePerPageRows,
    pagination: {
      gotoNextPage,
      gotoPrevPage,
      gotoPage,
      currentPage: page.currentPage,
    },
  };
}

export default function MeasurementTable() {
  const data = useAsyncValue() as MeasurementLoaderData;
  const table = useTable(data);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reading</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.rows.map((result) => {
            return (
              <TableRow key={result.id}>
                <TableCell className="font-medium">
                  {result.measurement}
                </TableCell>
                <TableCell>{result.status}</TableCell>
                <TableCell>{result.dosage}</TableCell>
                <TableCell className="w-[100px]">{result.type}</TableCell>
                <TableCell>{result.createdAt}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 px-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.pagination.gotoPrevPage();
          }}
        >
          Prev
        </Button>
        <SelectRowCount
          onSelect={(v) => {
            table.updatePerPageRows(Number(v));
          }}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.pagination.gotoNextPage();
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
}

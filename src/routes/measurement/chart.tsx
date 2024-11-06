import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useMemo } from "react";
import { useAsyncValue } from "react-router-dom";
import { MeasurementLoaderData } from "./loader";
import { groupBy } from "@/lib/utils";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function MeasurementChart() {
  const data = useAsyncValue() as MeasurementLoaderData;
  const total = useMemo(() => {
    return groupBy(data, "type");
  }, [data]);
  const [activeChart, setActiveChart] = useState(total[0][0]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Measurement/Dosage</CardTitle>
          <CardDescription>
            Showing avg measurement and dosage for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {total.map((group) => {
            const chart = group[0];
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">{chart}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {chart}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {total
          .filter((value) => value[0] === activeChart)
          .map((value) => (
            <ChartContainer
              key={value[0]}
              config={{ type: { label: value[0], color: "#2563eb" } }}
              className="min-h-[200px] w-full"
            >
              <BarChart data={value[1]}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="createdAt"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                />
                <Bar dataKey="measurement" fill="red" radius={4} />
              </BarChart>
            </ChartContainer>
          ))}
      </CardContent>
    </Card>
  );
}

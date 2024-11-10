import Loader from "@/components/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetcher, useRouteLoaderData } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { DashboardPageLoaderData } from "../dashboard/loader";
import { MeasurementPageLoaderData } from "./loader";
import { formatDate } from "@/lib/date";

export default function MeasurementChart() {
  const { profile } = useRouteLoaderData("root") as DashboardPageLoaderData;
  const fetcher = useFetcher<MeasurementPageLoaderData>();

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Measurement/Dosage</CardTitle>
          <CardDescription>
            Showing avg measurement and dosage for the last 3 months
          </CardDescription>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {profile?.medication.map((value, i) => {
                  return (
                    <SelectItem
                      value={value}
                      key={i}
                      onClick={() => {
                        fetcher.load(`/measurement?type=${value}`);
                      }}
                    >
                      {value}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {fetcher.state === "loading" ? (
          <Loader />
        ) : (
          <>
            {fetcher.data ? (
              <>
                {fetcher.data.measurementByType.length ? (
                  <ChartContainer
                    config={{ type: { label: "type", color: "#2563eb" } }}
                    className="min-h-[200px] w-full"
                  >
                    <BarChart data={fetcher.data.measurementByType}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="createdAt"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        tickFormatter={(value) => {
                          return formatDate(value, "dd-MMM");
                        }}
                      />
                      <Bar dataKey="measurement" fill="red" radius={4} />
                    </BarChart>
                  </ChartContainer>
                ) : (
                  <div className="text-center">no data available</div>
                )}
              </>
            ) : (
              <div className="text-center">select type</div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

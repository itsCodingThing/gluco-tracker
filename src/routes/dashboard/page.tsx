import AddReminderCard from "./add-reminder-card";
import AddReadingsCard from "./add-readings-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function Header({ title }: { title: string }) {
  return (
    <header className="p-4 bg-primary text-primary-foreground">
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  );
}

const glucoseReadings = [
  { id: 1, value: 120, date: "2024-10-28 09:00" },
  { id: 2, value: 110, date: "2024-10-28 14:00" },
  { id: 3, value: 130, date: "2024-10-28 20:00" },
];

export default function DashboardPage() {
  return (
    <div className="h-full container mx-auto">
      <Header title="GlucoTracker" />
      <div className="p-4">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Latest Reading</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center">
              {glucoseReadings[0]?.value || "--"}{" "}
              <span className="text-xl">mg/dL</span>
            </div>
            <div className="text-center text-muted-foreground">
              {glucoseReadings[0]?.date || "No readings yet"}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-10 grid place-items-center gap-2">
        <AddReadingsCard />
        <AddReminderCard />
      </div>
    </div>
  );
}

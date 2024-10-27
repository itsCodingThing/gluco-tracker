import AddReadingsCard from "./reading-card";

function AppHeader({ title }: { title: string }) {
  return <h1 className="text-center text-4xl font-bold mb-5">{title}</h1>;
}

export default function DashboardPage() {
  return (
    <div className="h-screen container mx-auto">
      <AppHeader title="GlocoTracker" />
      <div className="grid place-items-center gap-3">
        <AddReadingsCard />
      </div>
    </div>
  );
}

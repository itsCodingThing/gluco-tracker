import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouteLoaderData } from "react-router-dom";
import { ProfilePageLoaderData } from "./loader";
import { Badge } from "@/components/ui/badge";

export default function ProfileTab() {
  const { profile } = useRouteLoaderData("root") as ProfilePageLoaderData;

  return (
    <Tabs defaultValue="medications" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="measurements">Measurements</TabsTrigger>
        <TabsTrigger value="medications">Medications</TabsTrigger>
        <TabsTrigger value="appointments">Reminders</TabsTrigger>
      </TabsList>
      <TabsContent value="measurements">
        <Card>
          <CardHeader>
            <CardTitle>Measurements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Hypertension diagnosed in 2015</li>
              <li>Type 2 Diabetes diagnosed in 2018</li>
              <li>Appendectomy in 2010</li>
              <li>Fractured right wrist in 2005</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="medications">
        <Card>
          <CardHeader>
            <CardTitle>Current Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full flex gap-1 flex-wrap">
              {profile?.medication.map((med, i) => {
                return <Badge key={i}>{med}</Badge>;
              })}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="appointments">
        <Card>
          <CardHeader>
            <CardTitle>Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>General Check-up</span>
                <span className="text-muted-foreground">15/07/2023</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Diabetes Follow-up</span>
                <span className="text-muted-foreground">22/08/2023</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

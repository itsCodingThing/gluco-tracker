import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOutIcon } from "@/components/icons";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "@/components/loader";
import { signout } from "@/lib/auth.ts";

const ProfileCard = lazy(() => import("./profile-card.tsx"));

function ProfileTab() {
  return (
    <Tabs defaultValue="measurements" className="w-full">
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
            <ul className="list-disc pl-5 space-y-2">
              <li>Lisinopril 10mg - Once daily</li>
              <li>Metformin 500mg - Twice daily</li>
              <li>Aspirin 81mg - Once daily</li>
            </ul>
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

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Suspense fallback={<Loader />}>
        <ProfileCard />
      </Suspense>

      <ProfileTab />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Name:</strong> Jane Doe
            </p>
            <p>
              <strong>Relationship:</strong> Spouse
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 987-6543
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          onClick={async () => {
            await signout();
            navigate("/login");
          }}
        >
          <LogOutIcon className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}

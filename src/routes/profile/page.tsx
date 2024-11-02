import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Phone,
  FileText,
  Activity,
  User,
  Clipboard,
} from "lucide-react";

function ProfileCard() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
            <div className="relative w-24 h-24 mx-auto sm:w-32 sm:h-32">
              <img
                src="https://picsum.photos/200"
                alt="Patient photo"
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex flex-wrap items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">John Doe</h1>
              <Badge variant="outline" className="text-sm">
                Patient ID: 12345
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>DOB: 15/05/1980 (43 years)</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>Last Visit: 10/06/2023</span>
              </div>
              <div className="flex items-center">
                <Activity className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>Blood Type: A+</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProfileTab() {
  return (
    <Tabs defaultValue="medical-history" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="medical-history">Medical History</TabsTrigger>
        <TabsTrigger value="medications">Medications</TabsTrigger>
        <TabsTrigger value="appointments">Appointments</TabsTrigger>
      </TabsList>
      <TabsContent value="medical-history">
        <Card>
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
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
            <CardTitle>Upcoming Appointments</CardTitle>
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
  return (
    <div className="container mx-auto p-4 space-y-6">
      <ProfileCard />
      <ProfileTab />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Allergies</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Penicillin - Severe reaction</li>
              <li>Peanuts - Moderate reaction</li>
            </ul>
          </CardContent>
        </Card>

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
        <Button variant="outline">
          <Clipboard className="w-4 h-4 mr-2" />
          Print Summary
        </Button>
        <Button>
          <User className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
}

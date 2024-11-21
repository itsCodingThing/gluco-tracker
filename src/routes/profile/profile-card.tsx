import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  PhoneIcon,
  UserPenIcon,
} from "@/components/icons";
import { Link, useRouteLoaderData } from "react-router-dom";
import { DashboardPageLoaderData } from "../dashboard/loader";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/date";

export default function ProfileCard() {
  const { toast } = useToast();
  const { profile } = useRouteLoaderData("root") as DashboardPageLoaderData;

  if (!profile) {
    return <p>profile</p>;
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
            <div className="relative w-24 h-24 mx-auto sm:w-32 sm:h-32">
              <img
                src={profile.img}
                alt="Patient photo"
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex flex-wrap items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <Badge variant="outline" className="text-sm">
                Patient ID: {profile.patientId.split("-").at(0)}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>DOB: {formatDate(profile.dob, "dd-MMM-yyyy")}</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                <span>{profile.contact}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button
          variant="outline"
          onClick={() => {
            const profileLink = { url: "/profile" };

            try {
              if (navigator.canShare(profileLink)) {
                navigator
                  .share(profileLink)
                  .then(() => {
                    console.log("share");
                  })
                  .catch(() => {
                    console.log("unable to share");
                  });
              }
            } catch {
              toast({ variant: "destructive", title: "Share is available" });
            }
          }}
        >
          Share
        </Button>
        <Link to="/profile/edit">
          <Button variant="outline">
            <UserPenIcon />
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

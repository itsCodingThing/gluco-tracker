import { ChevronLeftIcon, CloudUploadIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  Link,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import { formatDate } from "@/lib/date";
import { fileOpen } from "browser-fs-access";
import { useState } from "react";
import Loader from "@/components/loader";
import PageTransition from "@/components/page-transition";
import { DashboardPageLoaderData } from "@/routes/dashboard/loader";

export default function EditProfile() {
  const navigation = useNavigation();
  const { profile } = useRouteLoaderData("root") as DashboardPageLoaderData;
  const [img, setImg] = useState("");

  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        <div className="flex">
          <Link to="/profile">
            <ChevronLeftIcon />
          </Link>
          <h1 className="w-full text-center font-bold text-xl mb-3">
            Edit Profile
          </h1>
        </div>
        <Form method="post" className="grid grid-cols-2 gap-4 py-4">
          <div className="col-span-2">
            <Button
              className="w-full"
              variant="outline"
              onClick={async () => {
                const blob = await fileOpen({
                  mimeTypes: ["image/*"],
                });
                setImg("https://picsum.photos/200");
                console.log(blob);
              }}
            >
              <CloudUploadIcon />
              Upload Image
            </Button>
            {img.length ? (
              <Input className="hidden" name="img" defaultValue={img} />
            ) : null}
          </div>
          <div>
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" defaultValue={profile?.name} />
          </div>
          <div>
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" name="email" defaultValue={profile?.email} />
          </div>
          <div>
            <Label htmlFor="dob" className="text-right">
              dob
            </Label>
            <Input
              id="dob"
              name="dob"
              type="date"
              defaultValue={
                profile?.dob
                  ? formatDate(profile.dob, "yyyy-MM-dd")
                  : formatDate(new Date(), "yyyy-MM-dd")
              }
            />
          </div>
          <div>
            <Label htmlFor="contact" className="text-right">
              Contact
            </Label>
            <Input
              id="contact"
              name="contact"
              defaultValue={profile?.contact}
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="medication" className="text-right">
              Medication
            </Label>
            <Input
              id="medication"
              name="medication"
              defaultValue={profile?.medication?.join(",")}
            />
          </div>

          <Button className="col-span-2" type="submit">
            {navigation.state === "submitting" ? <Loader /> : "Save changes"}
          </Button>
        </Form>
      </div>
    </PageTransition>
  );
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { ChevronLeftIcon } from "@/components/icons";
import {
  Form,
  Link,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import Loader from "@/components/loader";
import { DashboardPageLoaderData } from "../dashboard/loader";

export default function AddReminderPage() {
  const { profile } = useRouteLoaderData("root") as DashboardPageLoaderData;
  const navigation = useNavigation();

  return (
    <div className="min-h-svh container mx-auto p-2">
      <div className="flex">
        <Link to="/">
          <ChevronLeftIcon />
        </Link>
        <h1 className="w-full text-center font-bold text-xl mb-3">
          Add Reminder
        </h1>
      </div>
      <Form method="post" className="grid grid-cols-4 gap-3">
        <div className="col-span-2">
          <Label htmlFor="dosage" className="text-left">
            dosage
          </Label>
          <div className="flex w-full items-center space-x-2">
            <Input
              name="dosage"
              id="dosage"
              placeholder="00.00"
              inputMode="numeric"
              autoComplete="off"
              required
            />
            <span>ml</span>
          </div>
        </div>
        <div className="col-span-2">
          <Label htmlFor="date" className="text-left">
            date
          </Label>
          <div className="flex w-full">
            <DatePicker clock hiddenInput />
          </div>
        </div>
        <div className="col-span-4">
          <Label htmlFor="type" className="text-left">
            dosage type
          </Label>
          <div className="flex w-full items-center space-x-2">
            <Select required name="type">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {profile?.medication.map((value, i) => {
                    return (
                      <SelectItem value={value} key={i}>
                        {value}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="col-span-4">
          <Label htmlFor="description" className="text-left">
            description
          </Label>
          <Input
            name="description"
            id="description"
            placeholder="Enter related notes or remarks"
            autoComplete="off"
          />
        </div>
        <Button type="submit" className="col-span-4">
          {navigation.state === "submitting" ? <Loader /> : "Save"}
        </Button>
      </Form>
    </div>
  );
}

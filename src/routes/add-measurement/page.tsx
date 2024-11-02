import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/hooks/use-user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { createNewMeasurement } from "@/lib/db";
import type { CreateMeasurementInput } from "@/lib/db";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeftIcon } from "@/components/icons";
import { Link } from "react-router-dom";

export default function AddMeasurementPage() {
  const { userId } = useUser();
  const { toast } = useToast();

  return (
    <div className="min-h-svh container mx-auto p-2">
      <div className="flex">
        <Link to="/">
          <ChevronLeftIcon />
        </Link>
        <h1 className="w-full text-center font-bold text-xl mb-3">
          Add Measurement
        </h1>
      </div>
      <form
        className="grid grid-cols-4 gap-3"
        onSubmit={async (e) => {
          e.preventDefault();

          const form = e.currentTarget;
          const formdata = new FormData(form);
          const payload: CreateMeasurementInput = {
            ...Object.fromEntries(formdata),
            userId,
            measurement: Number(formdata.get("measurement") ?? 0),
            type: (formdata.get("type") as string) ?? "",
            dosage: Number(formdata.get("dosage") ?? 0),
          };

          try {
            await createNewMeasurement(payload);
            toast({ title: "Added successfully." });
          } catch (error) {
            toast({
              title: "failed to upload. Check entered data",
              variant: "destructive",
            });
            console.log(error);
          }
        }}
      >
        <div className="col-span-2">
          <Label htmlFor="measurement" className="text-left">
            measurement
          </Label>
          <div className="flex w-full items-center space-x-2">
            <Input
              name="measurement"
              id="measurement"
              placeholder="00.00"
              inputMode="numeric"
              required
              autoComplete="off"
            />
            <span>mg/dL</span>
          </div>
        </div>
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
          <div className="flex w-full items-center space-x-2">
            <DatePicker clock />
          </div>
        </div>
        <div className="col-span-2">
          <Label htmlFor="type" className="text-left">
            dosage type
          </Label>
          <div className="flex w-full items-center space-x-2">
            <Select required name="type">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>add new +</SelectLabel>
                  <SelectItem value="type-1">type-1</SelectItem>
                  <SelectItem value="type-2">type-2</SelectItem>
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
          Save
        </Button>
      </form>
    </div>
  );
}

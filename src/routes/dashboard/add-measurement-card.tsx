import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { z } from "zod";
import { useState } from "react";
import { useLocalStorage } from "react-use";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Card, CardContent } from "@/components/ui/card";

const AddReadingSchema = z.object({
  userId: z.string(),
  measurement: z.coerce.number(),
  date: z.coerce.date().default(() => new Date()),
  dosage: z.coerce.number().optional(),
  description: z.string().optional(),
});

export default function AddMeasurementCard() {
  const [open, setOpen] = useState(false);
  const [uid] = useLocalStorage<string>("uid", "", { raw: true });
  const { toast } = useToast();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Card className="w-[200px] h-[200px]">
          <CardContent className="h-full flex flex-col justify-center items-center gap-3">
            <p>Add Readings</p>
            <CirclePlusIcon />
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent full>
        <SheetHeader>
          <SheetTitle>Add your reading</SheetTitle>
          <SheetDescription>your reading will saved.</SheetDescription>
        </SheetHeader>
        <form
          className="grid grid-cols-4 gap-3"
          onSubmit={async (e) => {
            e.preventDefault();

            const form = e.currentTarget;
            const formdata = Object.fromEntries(new FormData(form));
            console.log(formdata);
            const payload = AddReadingSchema.safeParse({
              ...formdata,
              userId: uid,
            });

            if (payload.success) {
              console.log(payload.data);
              form.reset();
              toast({ title: "saved successfully" });
              setOpen(false);
            } else {
              toast({ variant: "destructive", title: "unable to save" });
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
      </SheetContent>
    </Sheet>
  );
}

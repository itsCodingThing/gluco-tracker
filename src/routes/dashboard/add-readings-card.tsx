import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { addNewReadings } from "@/lib/db";
import { CirclePlusIcon, LoaderCircleIcon } from "lucide-react";
import { z } from "zod";
import { useLocalStorage } from "react-use";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

const AddReadingSchema = z.object({
  id: z.string(),
  value: z.coerce.number(),
  date: z.coerce.date().default(() => new Date()),
});

export default function AddReadingsCard() {
  const { trigger, isMutating } = useSWRMutation(
    "api/reading/add",
    (_, { arg }: { arg: z.output<typeof AddReadingSchema> }) => {
      return addNewReadings({
        userId: arg.id,
        reading: arg.value.toString(),
        createdAt: arg.date.toISOString(),
      });
    },
  );
  const [open, setOpen] = useState(false);
  const [value] = useLocalStorage<string>("uid", "", { raw: true });
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
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Add your reading</SheetTitle>
          <SheetDescription>your reading will saved.</SheetDescription>
        </SheetHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formdata = new FormData(form);
            const payload = AddReadingSchema.safeParse({
              id: value,
              ...Object.fromEntries(formdata.entries()),
            });

            if (payload.success) {
              trigger(payload.data).then(() => {
                form.reset();
                toast({ title: "saved successfully" });
                setOpen(false);
              });
            } else {
              toast({ variant: "destructive", title: "unable to save" });
            }
          }}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="value" className="text-right">
              value
            </Label>
            <Input
              name="value"
              id="value"
              defaultValue="00.00"
              className="col-span-2"
              inputMode="numeric"
              required
              disabled={isMutating}
            />
            <p>mg/dL</p>
          </div>
          <Button type="submit">
            {isMutating ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

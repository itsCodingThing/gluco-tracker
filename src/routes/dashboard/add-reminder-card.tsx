import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CirclePlusIcon } from "lucide-react";
import { z } from "zod";

const FormSchema = z.object({
  value: z.coerce.number(),
  date: z.coerce.date().default(() => new Date()),
});

export default function AddReminderCard() {
  const { toast } = useToast();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-[200px] h-[200px]">
          <CardContent className="h-full flex flex-col justify-center items-center gap-3">
            <p>Add Reminder</p>
            <CirclePlusIcon />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add reminder</DialogTitle>
          <DialogDescription>
            set reminder for your medication
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const payload = FormSchema.safeParse(
              Object.fromEntries(form.entries()),
            );

            if (payload.success) {
              alert(payload.data);
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
            />
            <p>mg/dL</p>
          </div>
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

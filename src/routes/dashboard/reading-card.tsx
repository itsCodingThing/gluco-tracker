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
import { CirclePlusIcon } from "lucide-react";

export default function AddReadingsCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-[200px] h-[200px]">
          <CardContent className="h-full flex flex-col justify-center items-center gap-3">
            <p>Add Readings</p>
            <CirclePlusIcon />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add readings</DialogTitle>
          <DialogDescription>Add meters reading below</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="value" className="text-right">
              value
            </Label>
            <Input
              name="measurement"
              id="value"
              defaultValue="Pedro Duarte"
              className="col-span-2"
              inputMode="numeric"
            />
            <p>mg/dL</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              date
            </Label>
            <Input
              name="date"
              id="date"
              defaultValue="@peduarte"
              className="col-span-2"
              type="date"
            />
          </div>
        </div>
        <Button type="submit">Save</Button>
      </DialogContent>
    </Dialog>
  );
}

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { addHours, format, addMinutes, subHours, subMinutes } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronUpIcon, ChevronDownIcon } from "lucide-react";

export function TimePicker({
  date,
  onSelect,
}: {
  date: Date;
  onSelect: (date: Date) => void;
}) {
  const [selected, setSelected] = useState("");
  const [time, setTime] = useState(date);

  useEffect(() => {
    setTime(date);
  }, [date]);

  const updateTime = (action: "inc" | "dec") => {
    let newTime;

    if (action === "inc") {
      if (selected === "h") {
        newTime = addHours(time, 1);
      }
      if (selected === "m") {
        newTime = addMinutes(time, 1);
      }
    }

    if (action === "dec") {
      if (selected === "h") {
        newTime = subHours(time, 1);
      }
      if (selected === "m") {
        newTime = subMinutes(time, 1);
      }
    }

    if (newTime) {
      setTime(newTime);
      onSelect(newTime);
    }
  };

  return (
    <div className="rounded-t-md border-b border-input bg-background hover:bg-accent hover:text-accent-foreground">
      <div className="h-full p-1 flex gap-2 justify-center items-center">
        <span
          onClick={() => setSelected("h")}
          className={cn(
            "p-1 rounded-md border border-input bg-background cursor-pointer",
            {
              "border-black": selected === "h",
            },
          )}
        >
          {format(time, "hh")}
        </span>
        :
        <span
          onClick={() => setSelected("m")}
          className={cn(
            "p-1 rounded-md border border-input bg-background cursor-pointer",
            {
              "border-black": selected === "m",
            },
          )}
        >
          {format(time, "mm")}
        </span>
        <span>{format(time, "a")}</span>
        <div className="flex gap-1">
          <ChevronUpIcon
            className="p-1 rounded-md border border-input bg-background cursor-pointer"
            onClick={() => updateTime("inc")}
          />
          <ChevronDownIcon
            className="p-1 rounded-md border border-input bg-background cursor-pointer"
            onClick={() => updateTime("dec")}
          />
        </div>
      </div>
    </div>
  );
}

interface DatePickerProps {
  hiddenInput?: boolean;
  showIcon?: boolean;
  clock?: boolean;
  onSelect?: (date: Date) => void;
}
export function DatePicker({
  hiddenInput = false,
  showIcon = true,
  clock,
  onSelect,
}: DatePickerProps) {
  const [date, setDate] = useState<Date>(new Date());

  const onSelectDate = (d: Date) => {
    setDate(d);
    onSelect?.(date);
  };

  return (
    <>
      {hiddenInput ? (
        <input name="date" type="hidden" defaultValue={date.toISOString()} />
      ) : null}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            {showIcon && <CalendarIcon className="mr-2 h-4 w-4" />}
            {date ? format(date, "dd:MM:yy hh:mm a") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {clock && <TimePicker date={date} onSelect={onSelectDate} />}
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              if (d) {
                onSelectDate(d);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}

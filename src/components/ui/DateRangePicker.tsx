import React from "react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};


interface DateRangePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: DateRange;
  onDateChange?: (value: DateRange) => void;
}

export function DateRangePicker({
  value,
  onDateChange,
  className,
  ...props
}: DateRangePickerProps) {
  const [range, setRange] = React.useState<DateRange>(value || { from: undefined, to: undefined });

  React.useEffect(() => {
    if (value) setRange(value);
  }, [value]);

  const handlePredefinedRange = (days: number) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);

    const newRange = { from, to };
    setRange(newRange);
    onDateChange?.(newRange);
  };

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={() => handlePredefinedRange(7)}>
          Last 7 days
        </Button>
        <Button variant="outline" size="sm" onClick={() => handlePredefinedRange(30)}>
          Last 30 days
        </Button>
        <Button variant="outline" size="sm" onClick={() => handlePredefinedRange(90)}>
          Last 90 days
        </Button>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        {range.from && range.to
          ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
          : "Select a date range"}
      </div>
    </div>
  );
}

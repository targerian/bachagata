import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

export const Calendar: React.FC<CalendarProps> = ({
  onDateSelect,
  selectedDate,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selected, setSelected] = useState<Date | undefined>(selectedDate);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    setSelected(newDate);
    onDateSelect?.(newDate);
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    return (
      selected.getDate() === day &&
      selected.getMonth() === currentDate.getMonth() &&
      selected.getFullYear() === currentDate.getFullYear()
    );
  };

  const isPastDate = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  return (
    <div className="flex flex-col gap-0.5">
      {/* Month Navigation */}
      <div className="flex items-center p-1 justify-between">
        <button
          onClick={handlePrevMonth}
          className="text-text-primary hover:text-rose-gold transition-colors"
        >
          <div className="flex size-10 items-center justify-center">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </button>
        <p className="text-text-primary text-base font-bold leading-tight flex-1 text-center">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </p>
        <button
          onClick={handleNextMonth}
          className="text-text-primary hover:text-rose-gold transition-colors"
        >
          <div className="flex size-10 items-center justify-center">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {/* Day headers */}
        {daysOfWeek.map((day) => (
          <p
            key={day}
            className="text-text-secondary text-[13px] font-bold leading-normal tracking-[0.015em] flex h-12 w-full items-center justify-center pb-0.5"
          >
            {day}
          </p>
        ))}

        {/* Empty cells for days before month starts */}
        {Array.from({ length: startingDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="h-12 w-full" />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const past = isPastDate(day);
          const selected = isSelected(day);

          return (
            <button
              key={day}
              onClick={() => !past && handleDateClick(day)}
              disabled={past}
              className={cn(
                "h-12 w-full text-sm font-medium leading-normal transition-colors",
                past && "text-text-secondary/50 cursor-not-allowed",
                !past && !selected && "text-text-primary hover:bg-white/10",
                selected && "text-text-primary",
              )}
            >
              <div
                className={cn(
                  "flex size-full items-center justify-center rounded-full",
                  selected && "bg-rose-gold",
                )}
              >
                {day}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

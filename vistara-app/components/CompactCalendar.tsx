"use client";

import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

type CompactCalendarProps = {
  value?: string;
  onChange: (date: string) => void;
  minDate?: string;
};

function formatDate(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function parseDate(value?: string) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function displayDate(value?: string) {
  const date = parseDate(value);
  if (!date) return "Select date";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function CompactCalendar({
  value = "",
  onChange,
  minDate = "",
}: CompactCalendarProps) {
  const [open, setOpen] = useState(false);

  const selectedDate = parseDate(value);
  const minimumDate = parseDate(minDate);

  const [currentMonth, setCurrentMonth] = useState(
    selectedDate
      ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const result: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) result.push(null);
    for (let day = 1; day <= totalDays; day++) result.push(day);

    return result;
  }, [year, month]);

  const isDisabled = (day: number) => {
    const date = new Date(year, month, day);

    const minimum =
      minimumDate ||
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );

    return date < minimum;
  };

  const isSelected = (day: number) =>
    selectedDate
      ? selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year
      : false;

  const selectDate = (day: number) => {
    if (isDisabled(day)) return;

    onChange(formatDate(new Date(year, month, day)));
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* DATE BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 text-left"
      >
        <CalendarDays size={15} className="shrink-0 text-[#555]" />

        <span
          className={`text-sm font-medium ${
            value ? "text-[#111]" : "text-[#999]"
          }`}
        >
          {displayDate(value)}
        </span>
      </button>

      {/* CALENDAR POPOVER */}
     {open && (
  <div className="absolute left-0 top-[calc(100%+8px)] z-[999] w-[270px] rounded-2xl border border-[#DDD7CE] bg-white p-3 shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
          {/* HEADER */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setCurrentMonth(new Date(year, month - 1, 1))
              }
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#F5F5F5]"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-sm font-semibold">
              {currentMonth.toLocaleString("en-IN", {
                month: "long",
                year: "numeric",
              })}
            </span>

            <button
              type="button"
              onClick={() =>
                setCurrentMonth(new Date(year, month + 1, 1))
              }
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-[#F5F5F5]"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* WEEK */}
          <div className="mb-1 grid grid-cols-7 text-center text-[9px] font-semibold uppercase text-[#999]">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* DAYS */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) =>
              day === null ? (
                <div key={`empty-${index}`} className="h-8" />
              ) : (
                <button
                  key={day}
                  type="button"
                  disabled={isDisabled(day)}
                  onClick={() => selectDate(day)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs transition ${
                    isSelected(day)
                      ? "bg-black text-white"
                      : isDisabled(day)
                        ? "cursor-not-allowed text-[#D5D5D5]"
                        : "text-[#222] hover:bg-[#F1F1F1]"
                  }`}
                >
                  {day}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
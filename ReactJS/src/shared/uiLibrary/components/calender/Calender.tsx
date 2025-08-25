import { LineArrowIcon } from "@/shared/uiLibrary/assets/icons/lineArrowIcon";
import "@/shared/uiLibrary/assets/scss/atoms/calender.scss";
import classNames from "classnames";
import React, { forwardRef, useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { type CalendarProps, DAYS_SHORT, daysInMonth, firstDay } from "./Calender.utils";

const Calender = forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  const {
    year,
    month,
    monthsToShow = 2,
    events = [],
    allowRange = false,
    disableDatesBefore,
    disableDatesAfter,
    disableSpecificDates = [],
    multiMonth = false, // number or boolean
    weekStartsOn = 0,
    onChange,
    onMonthChange,
    selectedRange: controlledRange,
    selectedDate: controlledDate,
    ...rest
  } = props;

  const today = new Date();
  const defaultYear = year ?? today.getFullYear();
  const defaultMonth = month ?? today.getMonth() + 1;

  // local state for uncontrolled
  const [uncontrolledDate, setUncontrolledDate] = useState<string>("");
  const [uncontrolledRange, setUncontrolledRange] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  });
  const [currentYear, setCurrentYear] = useState(defaultYear);
  const [baseMonth, setBaseMonth] = useState(defaultMonth);

  // controlled or uncontrolled
  const selectedDate = controlledDate ?? uncontrolledDate;
  const selectedRange = controlledRange ?? uncontrolledRange;

  // multiMonth count
  const monthsCount = typeof multiMonth === "number" ? multiMonth : multiMonth ? monthsToShow : 1;
  const months = Array.from({ length: monthsCount }, (_, i) => baseMonth + i);

  const isDateDisabled = (date: Date) => {
    if (disableDatesBefore && date < disableDatesBefore) return true;
    if (disableDatesAfter && date > disableDatesAfter) return true;
    if (disableSpecificDates.some((d) => d.toDateString() === date.toDateString())) return true;
    return false;
  };

  const getEvent = (dateStr: string) => events.find((ev) => ev.date === dateStr);

  const formatDate = (y: number, m: number, d: number) =>
    `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const handleClick = (day: number, monthIndex: number, year: number) => {
    const formatted = formatDate(year, monthIndex, day);
    const dateObj = new Date(year, monthIndex - 1, day);
    if (isDateDisabled(dateObj)) return;

    if (allowRange) {
      if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
        const newRange = { start: formatted, end: null };
        onChange?.(newRange);
        if (!controlledRange) setUncontrolledRange(newRange);
      } else if (selectedRange.start && !selectedRange.end) {
        const newRange =
          new Date(formatted) < new Date(selectedRange.start)
            ? { start: formatted, end: selectedRange.start }
            : { start: selectedRange.start, end: formatted };
        onChange?.(newRange);
        if (!controlledRange) setUncontrolledRange(newRange);
      }
      if (!controlledDate) setUncontrolledDate("");
    } else {
      const singleRange = { start: formatted, end: formatted };
      onChange?.(singleRange);
      if (!controlledDate) setUncontrolledDate(formatted);
      if (!controlledRange) setUncontrolledRange(singleRange);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!controlledDate) setUncontrolledDate(value);

    const parts = value.split("-");
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        setCurrentYear(y);
        setBaseMonth(m);
      }
    }
  };

  const handlePrev = () => {
    setBaseMonth((prev) => {
      if (prev === 1) {
        setCurrentYear((y) => y - 1);
        onMonthChange?.(12, currentYear - 1);
        return 12;
      }
      onMonthChange?.(prev - 1, currentYear);
      return prev - 1;
    });
  };

  const handleNext = () => {
    setBaseMonth((prev) => {
      if (prev === 12) {
        setCurrentYear((y) => y + 1);
        onMonthChange?.(1, currentYear + 1);
        return 1;
      }
      onMonthChange?.(prev + 1, currentYear);
      return prev + 1;
    });
  };

  const isInRange = (dateStr: string) => {
    if (!allowRange) return false;
    if (!selectedRange.start || !selectedRange.end) return false;
    const d = new Date(dateStr);
    return d >= new Date(selectedRange.start) && d <= new Date(selectedRange.end);
  };

  return (
    <div className="calender" ref={ref} {...rest}>
      <div className="calender--text-field">
        <Input
          type="text"
          placeholder="YYYY-MM-DD"
          value={selectedDate || selectedRange.start || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="calender--controls-month">
        <div className="calender--controls">
          <Button type="button" variant="solid" onClick={handlePrev} className="calender--controls-next">
            <LineArrowIcon />
          </Button>
          <Button type="button" variant="solid" onClick={handleNext} className="calender--controls-prev">
            <LineArrowIcon />
          </Button>
        </div>

        <div className="calender--month">
          {months.map((mRaw) => {
            const d = new Date(currentYear, mRaw - 1, 1);
            const displayYear = d.getFullYear();
            const displayMonth = d.getMonth() + 1;

            const calendarDays: (number | null)[] = [];
            const first = (firstDay(displayYear, displayMonth) - weekStartsOn + 7) % 7;
            for (let i = 0; i < first; i++) calendarDays.push(null);

            const totalDays = daysInMonth(displayYear, displayMonth);
            for (let i = 1; i <= totalDays; i++) calendarDays.push(i);

            const weeks: (number | null)[][] = [];
            for (let i = 0; i < calendarDays.length; i += 7) {
              weeks.push(calendarDays.slice(i, i + 7));
            }

            return (
              <div key={`${displayYear}-${displayMonth}`}>
                <div className="calender--month-name">
                  <h3>
                    {new Date(displayYear, displayMonth - 1).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                </div>
                <table style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {DAYS_SHORT.slice(weekStartsOn).concat(DAYS_SHORT.slice(0, weekStartsOn)).map((day) => (
                        <th key={day}>
                          <p className="calender--month-day--name">{day}</p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {weeks.map((week, i) => (
                      <tr key={i}>
                        {week.map((day, j) => {
                          if (day === null)
                            return (
                              <td key={j}>
                                <button className="calender--blank-date"></button>
                              </td>
                            );

                          const formatted = formatDate(displayYear, displayMonth, day);
                          const dateObj = new Date(displayYear, displayMonth - 1, day);
                          const isToday = dateObj.toDateString() === today.toDateString();
                          const ev = getEvent(formatted);
                          const disabled = isDateDisabled(dateObj);
                          const inRange = isInRange(formatted);

                          return (
                            <td key={j} style={{ textAlign: "center", padding: "3px" }}>
                              <button
                                type="button"
                                title={ev?.label}
                                disabled={disabled}
                                className={classNames({
                                  active: isToday,
                                  selected: selectedDate === formatted || inRange,
                                  event: !!ev,
                                  [ev?.type || ""]: !!ev,
                                  disabled,
                                })}
                                onClick={() => handleClick(day, displayMonth, displayYear)}
                              >
                                {day}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

Calender.displayName = "Calender";
export default Calender;

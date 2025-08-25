

import React from "react";
import type { EventType } from "../../utils/types";



// Calendar props interface
export interface CalendarProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  year?: number;
  month?: number;
  monthsToShow?: number;
  events?: EventType[];
  allowRange?: boolean;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
  disableSpecificDates?: Date[];
  multiMonth?: number;
  weekStartsOn?: number;
  selectedDate?: string; // ✅ controlled selectedDate
  selectedRange?: { start: string | null; end: string | null }; // ✅ controlled selectedRange
  onChange?: (range: { start: string | null; end: string | null }) => void;
  onMonthChange?: (month: number, year: number) => void;
}

// Utility constants & functions
export const DAYS_SHORT: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const firstDay = (year: number, month: number, day: number = 1) => {
  return new Date(year, month - 1, day).getDay();
};
export const daysInMonth = (year: number, month: number, day: number = 0) => {
  return new Date(year, month, day).getDate();
};

// export const daysOfMonth = (year: number, month: number): string[] => {
//   const days: number = new Date(year, month, 0).getDate();

//   return Array.from({length:days},(_:number,index:number)=>{
//     const d = new Date(year, month -1, index + 1);
//     const mm = String(d.getMonth()+1).padStart(2,'0');
//     const dd = String(d.getDay()+1).padStart(2,'0')
//     return `${d.getFullYear()}-${mm}-${dd}`
//   })
// };

// export const daysOfMonthUTC = (year:number,month:number):string[]=>{

//     const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
//     return Array.from({ length: days }, (_, i) => {
//       const d = new Date(Date.UTC(year, month - 1, i + 1));
//       const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
//       const dd = String(d.getUTCDate()).padStart(2, '0');
//       return `${d.getUTCFullYear()}-${mm}-${dd}`;
//     });

// }

// export const dateObjectsOfMonth=(year:number, month:number /* 1-12 */)=> {
//   const days = new Date(year, month, 0).getDate();
//   return Array.from({ length: days }, (_, i) => new Date(year, month - 1, i + 1));
// }
// export const eachDayOfMonth = (year: number, month: number): Date[] => {
//   const days = new Date(year, month, 0).getDate();
//   return Array.from({ length: days }, (_, i) => new Date(year, month - 1, i + 1));
// };
// test.utils.ts
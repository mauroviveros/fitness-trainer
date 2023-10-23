import { Injectable } from "@angular/core";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";

@Injectable({
  providedIn: "root"
})
export class DateService {

  get daysOfWeek() : string[] { return this.getDaysOfWeek("long"); }

  getDaysOfWeek(weekday? : "long" | "short" | "narrow") : string[] {
    const daysOfWeek: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date("01-01-2023"); // 1 Enero 2023 - Domingo
      date.setDate(date.getDate() + i);
      daysOfWeek.push(date.toLocaleDateString("es-AR", { weekday }));
    }
    return daysOfWeek;
  }

  getAge(birthdate: Date) : number{
    const timeDiff = Math.abs(Date.now() - birthdate.getTime());
    const age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }

  highlightCalendar(daysOfWeek?: number[]) : MatCalendarCellClassFunction<Date> {
    return (cellDate, view) => {
      if(view !== "month" || !daysOfWeek) return "";
      const date = cellDate.getDay();
      return daysOfWeek.includes(date) ? "highlight_day" : "";
    };
  }

  getDayOfWeek(date: Date): number { return date.getDay(); }

  getWeekOfMonth(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstWeekday = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const offsetDate = date.getDate() + firstWeekday - 1;
    const index = 1;
    const weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7);
    const week = index + Math.floor(offsetDate / 7);

    return (week === weeksInMonth ? index + 5 : week) - 1;
  }

  countWeeksOfMonth(dateIN: Date, dateOUT: Date, day: number){
    let count = 0;
    const fechaActual = new Date(dateIN);

    while (fechaActual <= dateOUT) {
      if (fechaActual.getDay() === day) count++;
      fechaActual.setDate(fechaActual.getDate() + 1);
    }

    return count;
  }
}

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
}

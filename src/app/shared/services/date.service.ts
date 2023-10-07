import { Injectable } from "@angular/core";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";

@Injectable({
  providedIn: "root"
})
export class DateService {
  



  get daysOfWeek() : string[] {
    const daysOfWeek: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date("01-01-2023"); // 1 Enero 2023 - Domingo
      date.setDate(date.getDate() + i);
      daysOfWeek.push(date.toLocaleDateString("es-AR", { weekday: "long" }));
    }
    return daysOfWeek;
  }

  highlightCalendar(daysOfWeek?: number[]) : MatCalendarCellClassFunction<Date> {
    return (cellDate, view) => {
      if(view !== "month" || !daysOfWeek) return "";
      const date = cellDate.getDay();
      return daysOfWeek.includes(date) ? "highlight_day" : "";
    };
  }
}

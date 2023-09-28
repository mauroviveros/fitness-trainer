import { Component, EventEmitter, Input, OnChanges, Output, inject } from "@angular/core";
import { DateUtilsService } from "src/app/shared/services/date-utils.service";

@Component({
  selector: "routine-week-day",
  templateUrl: "./week-day.component.html",
  styleUrls: ["./week-day.component.scss"]
})
export class WeekDayComponent implements OnChanges {
  readonly dateUtils = inject(DateUtilsService);
  @Input() daysOfWeek: number[] = [];
  @Output() changeDayOfWeek = new EventEmitter();
  dayIndex = 0;

  ngOnChanges(){
    this.changeDayOfWeek.emit(this.daysOfWeek[0]);
  }

  canNext(direction: "before" | "after"){
    switch(direction){
      case "after": return this.dayIndex < this.daysOfWeek.length - 1;
      case "before": return this.dayIndex > 0;
      default: return false;
    }
  }

  next(direction: "before" | "after"){
    let sum = 0;
    if(direction === "after" && this.canNext(direction)) sum = 1;
    if(direction === "before" && this.canNext(direction)) sum = -1;
    this.dayIndex = this.dayIndex + sum;
    this.changeDayOfWeek.emit(this.daysOfWeek[this.dayIndex]);
  }
}

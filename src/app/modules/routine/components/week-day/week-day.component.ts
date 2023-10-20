import { Component, EventEmitter, Input, OnChanges, Output, inject } from "@angular/core";

import { DateService } from "src/app/shared/services/date.service";

@Component({
  selector: "routine-week-day",
  templateUrl: "./week-day.component.html",
  styleUrls: ["./week-day.component.scss"]
})
export class WeekDayComponent implements OnChanges {
  private readonly dateService = inject(DateService);
  readonly daysOfWeek = this.dateService.getDaysOfWeek("long");
  @Input() days? : number[];
  @Input() date! : Date;
  @Output() changeDay = new EventEmitter<Date>();
  index = -1;

  ngOnChanges(){
    this.set(this.date);
  }

  set(date: Date) : void {
    this.index = date.getDay();
  }

  next(move: 1 | -1) : void {
    if(!this.days) return;

    const date = new Date(this.date);
    let index = this.index;
    let noFound = true;

    while(noFound){
      date.setDate(date.getDate() + move);
      index = date.getDay();
      if(this.days.includes(index)) noFound = false;
    }

    this.changeDay.emit(date);
  }

}

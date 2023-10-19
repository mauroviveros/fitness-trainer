import { Component, EventEmitter, Input, OnChanges, Output, inject } from "@angular/core";
import { DateService } from "src/app/shared/services/date.service";


@Component({
  selector: "routine-week-day",
  templateUrl: "./week-day.component.html",
  styleUrls: ["./week-day.component.scss"]
})
export class WeekDayComponent implements OnChanges {
  private readonly date = inject(DateService);
  readonly daysOfWeek = this.date.getDaysOfWeek("long");
  @Input() days? : number[];
  @Output() changeDay = new EventEmitter();
  index = -1;

  ngOnChanges(){
    if(this.days) this.next(1);
  }

  next(move: 1 | -1){
    if(!this.days) return;
    const index = this.days.at(this.days.indexOf(this.index) + move);
    this.index = index !== undefined ? index : 0;

    this.changeDay.emit(this.index);
  }
}

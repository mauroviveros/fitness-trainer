import { Component, Input, inject } from "@angular/core";

import { Routine } from "src/app/shared/interfaces/routine";
import { RoutineService } from "../../services/routine.service";
import { DateService } from "src/app/shared/services/date.service";

@Component({
  selector: "routine-information",
  templateUrl: "./information.component.html",
  styleUrls: ["./information.component.scss"]
})
export class InformationComponent {
  private readonly routineSrv = inject(RoutineService);
  private readonly date = inject(DateService);

  @Input() routine?: Routine;

  readonly levels = this.routineSrv.levels;
  readonly daysOfWeek = this.date.getDaysOfWeek("narrow");

  selectDay(index: number) : boolean | undefined {
    if(!this.routine) return false;
    if(index !== 0 && index !== 1 && index !== 2 && index !== 3 && index !== 4 && index !== 5 && index !== 6) return false;
    return this.routine.daysOfWeek.includes(index);
  }
}

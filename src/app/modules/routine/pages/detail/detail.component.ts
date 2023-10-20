import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, tap } from "rxjs";

import { RoutineService } from "../../services/routine.service";

import { Routine } from "src/app/shared/interfaces/routine";
import { dayOfWeek } from "src/app/shared/interfaces/interfaces";

@Component({
  selector: "routine-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly RoutineSrv = inject(RoutineService);
  private readonly subscriptions : Subscription[] = [];
  routine : Routine = {} as Routine;
  date : Date = new Date();

  isLoading = true;

  ngOnInit(){
    this.subscriptions.push(this.initRoutine());
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initRoutine() : Subscription {
    return this.RoutineSrv.detail(this.route.snapshot.params["_id"]).pipe(
      tap(() => this.isLoading = false)
    ).subscribe({
      error: () => this.router.navigate(["/customers"]),
      next: routine => this.routine = routine
    });
  }

  dateFilter = (d: Date | null): boolean => {
    const cellDate = (d || new Date());
    if(!this.routine.dateIN || !this.routine.dateOUT) return false;
    const isAfterIN = cellDate.getTime() >= this.routine.dateIN.getTime();
    const isBeforeOUT = cellDate.getTime() <= this.routine.dateOUT.getTime();
    const isIncludeInDays = this.routine.daysOfWeek.includes(cellDate.getDay() as dayOfWeek);
    return isAfterIN && isBeforeOUT && isIncludeInDays;
  };
}

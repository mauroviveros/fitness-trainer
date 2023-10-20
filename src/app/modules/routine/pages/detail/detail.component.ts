import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, map, switchMap, tap } from "rxjs";

import { RoutineService } from "../../services/routine.service";
import { UserService } from "src/app/core/modules/auth/services/user.service";

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
  private readonly user = inject(UserService);
  private readonly subscriptions : Subscription[] = [];
  routine : Routine = {} as Routine;
  date : Date = new Date();

  isAdmin = false;
  isLoading = true;

  ngOnInit(){
    this.subscriptions.push(this.initRoutine());
    this.subscriptions.push(this.initUser());
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initRoutine() : Subscription {
    return this.route.params.pipe(
      tap(() => this.isLoading = false),
      switchMap(params => params["_id"] ? this.RoutineSrv.detail(params["_id"]) : this.RoutineSrv.getOwn()),
      map(response => Array.isArray(response) ? response : [response])
    ).subscribe({
      error: () => this.router.navigate(["/customers"]),
      next: routines => {
        if(!this.route.snapshot.params["_id"]){
          routines = routines.filter(routine => {
            return this.date >= routine.dateIN && this.date <= routine.dateOUT;
          });
        }

        if(!routines.length) this.router.navigate([""]);
        else this.routine = routines[0];
      }
    });
  }

  private initUser() : Subscription {
    return this.user.$data.pipe(
      map(user => user._admin)
    ).subscribe(bool => this.isAdmin = bool);
  }

  dateFilter = (d: Date | null): boolean => {
    const cellDate = (d || new Date());
    if(!this.routine.dateIN || !this.routine.dateOUT) return false;
    const isIncludeInDays = this.routine.daysOfWeek.includes(cellDate.getDay() as dayOfWeek);
    return cellDate >= this.routine.dateIN && cellDate <= this.routine.dateOUT && isIncludeInDays;
  };
}

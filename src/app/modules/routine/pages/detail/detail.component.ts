import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, tap } from "rxjs";

import { RoutineService } from "../../services/routine.service";

import { Routine } from "src/app/shared/interfaces/routine";

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
  routine? : Routine;

  isLoading = true;

  ngOnInit(){
    this.subscriptions.push(this.initRoutine());
  }

  private initRoutine(){
    return this.RoutineSrv.detail(this.route.snapshot.params["_id"]).pipe(
      tap(() => this.isLoading = false)
    ).subscribe({
      error: () => this.router.navigate(["/customers"]),
      next: routine => this.routine = routine
    });
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

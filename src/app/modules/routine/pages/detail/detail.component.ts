import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { RoutineService } from "../../services/routine.service";

import { Routine } from "src/app/shared/interfaces/routine";
import { Subscription } from "rxjs";

@Component({
  selector: "routine-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly RoutineSrv = inject(RoutineService);
  private readonly subscriptions : Subscription[] = [];
  routine? : Routine;

  ngOnInit(){
    this.subscriptions.push(this.initRoutine());
  }

  private initRoutine(){
    return this.RoutineSrv.detail(this.route.snapshot.params["_id"])
      .subscribe(routine => this.routine = routine);
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

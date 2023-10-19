import { Component, Input, OnDestroy, OnInit, inject } from "@angular/core";
import { dayOfWeek } from "src/app/shared/interfaces/interfaces";
import { Routine } from "src/app/shared/interfaces/routine";
import { RoutineService } from "../../services/routine.service";
import { BehaviorSubject, Subscription, combineLatest, filter, switchMap, tap } from "rxjs";
import { Scheme } from "src/app/shared/interfaces/scheme";
import { SchemeService } from "../../services/scheme.service";

@Component({
  selector: "routine-exercises",
  templateUrl: "./exercises.component.html",
  styleUrls: ["./exercises.component.scss"]
})
export class ExercisesComponent implements OnInit, OnDestroy {
  private readonly scheme = inject(SchemeService);
  private readonly routineService = inject(RoutineService);
  private subscriptions : Subscription[] = [];
  @Input() routine!: Routine;

  schemesDM : Scheme[][] = [];

  isLoading = true;
  $day = new BehaviorSubject<dayOfWeek | undefined>(undefined);

  ngOnInit(){
    this.subscriptions.push(this.initSchemes());
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  initSchemes(){
    return this.$day.pipe(
      filter(day => day !== undefined),
      tap(() => this.isLoading = true),
      switchMap(day => {
        return combineLatest([
          this.scheme.getList(this.routineService.ref(this.routine), day as dayOfWeek, "WARM_UP"),
          this.scheme.getList(this.routineService.ref(this.routine), day as dayOfWeek, "TRAINING"),
        ]);
      })
    ).subscribe(schemesDM => {
      this.schemesDM = schemesDM;
      this.isLoading = false;
    });
  }

  create(){
    if(!this.routine || this.$day.value === undefined) return;
    const scheme = {} as Scheme;
    scheme.routine = this.routineService.ref(this.routine);
    scheme.weekOfMonth = 0;
    scheme.dayOfWeek = this.$day.value;

    this.routineService.openExercise(1, scheme);
  }
}
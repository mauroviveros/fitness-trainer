import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, inject } from "@angular/core";
import { BehaviorSubject, Subscription, combineLatest, filter, switchMap, tap } from "rxjs";

import { RoutineService } from "../../services/routine.service";
import { SchemeService } from "../../services/scheme.service";
import { DateService } from "src/app/shared/services/date.service";
import { UserService } from "src/app/core/modules/auth/services/user.service";

import { Routine } from "src/app/shared/interfaces/routine";
import { Scheme } from "src/app/shared/interfaces/scheme";
import { UserDoc } from "src/app/shared/interfaces/user";
import { dayOfWeek } from "src/app/shared/interfaces/interfaces";

@Component({
  selector: "routine-exercises",
  templateUrl: "./exercises.component.html",
  styleUrls: ["./exercises.component.scss"]
})
export class ExercisesComponent implements OnInit, OnChanges, OnDestroy {
  private readonly scheme = inject(SchemeService);
  private readonly userService = inject(UserService);
  private readonly routineService = inject(RoutineService);
  private readonly dateService = inject(DateService);
  private subscriptions : Subscription[] = [];
  @Output() changeDate = new EventEmitter();
  @Input() routine!: Routine;
  @Input() date!: Date;

  schemesDM : Scheme[][] = [];

  isLoading = true;
  user?: UserDoc;
  $day = new BehaviorSubject<number | undefined>(undefined);
  $week = new BehaviorSubject<number | undefined>(undefined);

  ngOnInit(){
    this.subscriptions.push(this.initSchemes());
    this.subscriptions.push(this.initUser());
  }

  ngOnChanges() {
    if(this.routine._id && this.date){
      this.$day.next(this.dateService.getDayOfWeek(this.date));
      this.$week.next(this.dateService.getWeekOfMonth(this.date));
    }
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initSchemes() : Subscription {
    return combineLatest([this.$day, this.$week]).pipe(
      filter(filter => filter[0] !== undefined),
      filter(filter => filter[1] !== undefined),
      tap(() => this.isLoading = true),
      switchMap(filter => {
        return combineLatest([
          this.scheme.getList(this.routineService.ref(this.routine), filter[0] as dayOfWeek, filter[1] as number, "WARM_UP"),
          this.scheme.getList(this.routineService.ref(this.routine), filter[0] as dayOfWeek, filter[1] as number, "TRAINING"),
        ]);
      })
    ).subscribe(schemesDM => {
      this.schemesDM = schemesDM;
      this.isLoading = false;
    });
  }

  private initUser() : Subscription {
    return this.userService.$data.subscribe(user => this.user = user);
  }

  canCreateThisDay() : boolean {
    return this.date >= this.routine.dateIN && this.date <= this.routine.dateOUT;
  }

  create() : void {
    if(!this.routine || this.$day.value === undefined) return;
    const scheme = {} as Scheme;
    scheme.routine = this.routineService.ref(this.routine);
    scheme.weekOfMonth = this.$week.value as number;
    scheme.dayOfWeek = this.$day.value as dayOfWeek;

    this.routineService.openExercise(1, scheme);
  }
}
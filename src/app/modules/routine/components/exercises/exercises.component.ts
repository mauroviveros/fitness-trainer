import { Component, Input, OnDestroy, OnInit, inject } from "@angular/core";
import { BehaviorSubject, Subscription, filter, switchMap, tap } from "rxjs";

import { RoutineUtilsService } from "../../services/routine-utils.service";

import { Scheme } from "src/app/shared/interfaces/scheme";
import { SchemeService } from "../../services/scheme.service";
import { MatListOption } from "@angular/material/list";

@Component({
  selector: "routine-exercises",
  templateUrl: "./exercises.component.html",
  styleUrls: ["./exercises.component.scss"]
})
export class ExercisesComponent implements OnInit, OnDestroy {
  private readonly routineUtils = inject(RoutineUtilsService);
  private readonly scheme = inject(SchemeService);
  private subscription?: Subscription;
  @Input() daysOfWeek: number[] = [];
  @Input() customer!: string;
  @Input() canComplete!: boolean;
  isLoading = false;

  schemesCategory: Scheme[][] = [];
  $dayOfWeek = new BehaviorSubject<number | undefined>(undefined);
  getCategoryIcon = this.routineUtils.getCategoryIcon;

  ngOnInit(){
    this.subscription = this.initList();
  }
  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  private initList(){
    return this.$dayOfWeek.pipe(
      filter(number => number !== undefined),
      tap(() => this.isLoading = true),
      switchMap(number => this.scheme.$list(number || 0, this.customer))
    ).subscribe(schemes => {
      this.isLoading = false;

      this.schemesCategory = [];
      schemes.forEach(scheme => {
        let index = 0;
        if(scheme.exercise.category !== "WARM_UP") index = 1;
        if(!this.schemesCategory[index]) this.schemesCategory[index] = [];
        this.schemesCategory[index].push(scheme);
      });
    });
  }

  onChangeDayOfWeek(number: number){
    this.$dayOfWeek.next(number);
  }

  openSheet(option: MatListOption, scheme: Scheme){
    if(!option.disabled) option.toggle();
    this.routineUtils.openBottomSheet(scheme, this.canComplete);
  }

  add(){
    const newExercise = { dayOfWeek: this.$dayOfWeek.value } as Scheme;
    this.routineUtils.openExercise(newExercise, 1, this.customer);
  }
}

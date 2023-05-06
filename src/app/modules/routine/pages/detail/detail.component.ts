import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription, switchMap, combineLatest } from "rxjs";
import { MatBottomSheet } from "@angular/material/bottom-sheet";

import { RoutineService } from "../../services/routine.service";
import { ExerciseService } from "src/app/modules/exercise/services/exercise.service";
import { UserService } from "src/app/modules/auth/services/user.service";

import { Exercise } from "src/app/shared/interfaces/exercises";
import { Routine, RoutineExercise, RoutineExerciseWeigh } from "src/app/shared/interfaces/routine";
import { MatListOption } from "@angular/material/list";

import { DetailExerciseBottomSheetComponent } from "../../components/detail-exercise-bottom-sheet/detail-exercise-bottom-sheet.component";
import { MatDialog } from "@angular/material/dialog";
import { DetailDialogComponent } from "../../components/detail-dialog/detail-dialog.component";
import { CompleteExerciseDialogComponent } from "../../components/complete-exercise-dialog/complete-exercise-dialog.component";
import { FormControl } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";


interface DaySelected{
  index: number
  exercises: RoutineExercise[]
}

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnDestroy{
  private subscription?: Subscription;
  isAdmin = false;
  exercises: Exercise[] = [];
  routine: Routine = {} as Routine;
  dayName = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
  fullDayName = ["domingo", "lunes", "martes", "miércoles", "jueves", "vienes", "sábado"];
  daySelected: DaySelected = {} as DaySelected;
  fecha = new FormControl(new Date());


  constructor(
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private exerciseService: ExerciseService,
    private routineService: RoutineService
  ){
    this.subscription = this.userService.user.pipe(
      switchMap(user => {
        let uid = user._id;
        if(user.admin){
          uid = this.route.snapshot.params["_id"];
          this.isAdmin = true;
        }
        return combineLatest([
          this.routineService.getByUser(uid),
          this.exerciseService.exercises
        ]);
      })
    ).subscribe(response => {
      this.routine = response[0];
      this.exercises = response[1];

      this.routine.exercises = this.routine.exercises?.map(exercise => {
        const _exercise = this.exercises.filter(({ _id }) => {
          if(typeof exercise._id === "string") return false;
          return _id === exercise._id.id;
        })[0];
        if(_exercise){
          exercise._id = _exercise._id;
          exercise.name = _exercise.name;
          exercise.description = _exercise.description;
          exercise.video = _exercise.video;
        }
        return exercise;
      });

      if(this.fecha.value) this.daySelected.index = this.fecha.value.getDay();
      this.selectDay(this.daySelected.index);
    });
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  private selectDay(index: number){
    this.daySelected.index = index;
    if(!this.routine.exercises) this.daySelected.exercises = [];
    else this.daySelected.exercises = this.routine.exercises.filter((exercise) => {
      return exercise.day === this.routine.days[index];
    });
  }

  dateFilter = (d: Date | null): boolean => {
    const cellDate = (d || new Date());
    if(!this.routine.dateIN || !this.routine.dateOUT) return false;
    const isAfterIN = cellDate.getTime() >= this.routine.dateIN.getTime();
    const isBeforeOUT = cellDate.getTime() <= this.routine.dateOUT.getTime();
    const isIncludeInDays = this.routine.days.includes(cellDate.getDay());
    return isAfterIN && isBeforeOUT && isIncludeInDays;
  };

  getIndexWeight(): number | undefined{
    const getSameDays = (mes: number, anio: number, day: number) => {
      const numDias = new Date(anio, mes + 1, 0). getDate();
      const days: number[] = [];

      for(let i = 1; i <= numDias; i++){
        const fecha = new Date(anio, mes, i);
        if(fecha.getDay() === day){
          days.push(i);
        }
      }
      return days;
    };

    const date = this.fecha.value;
    if(!date) return;
    const days = getSameDays(date.getMonth(), date.getFullYear(), this.daySelected.index);
    return days.indexOf(date.getDate());
  }

  isDisabledOption(){
    const fechaActual = new Date();
    const nextTimeDay = fechaActual;
    nextTimeDay.setDate(fechaActual.getDate() + 1);

    if(!this.fecha.value) return false;
    return this.fecha.value.getDate() >= nextTimeDay.getDate();
  }

  isAvailableDay(){
    const fecha = new Date();
    if(!this.routine.days) return false;
    return this.routine.days.includes(fecha.getDay());
  }

  
  onDateChange(event: MatDatepickerInputEvent<Date>){
    if(!event.value) return;
    this.selectDay(event.value.getDay());
  }

  hasRealWeight(exercise: RoutineExercise): boolean{
    const index = this.getIndexWeight();
    if(index === undefined) return false;
    return exercise.weighs[index].real !== 0;
  }

  open(option: MatListOption, exercise: RoutineExercise){
    if(option.disabled && !this.isAdmin) return;
    option.toggle();
    this.bottomSheet.open(DetailExerciseBottomSheetComponent, { data: { hasRealWeight: this.hasRealWeight(exercise) } }).afterDismissed().subscribe((action?: string) => {
      if(action === "video") window.open(exercise.video, "_blank");
      if(action === "description") this.dialog.open(DetailDialogComponent, { data: exercise.description });
      if(action === "view" || action === "execute"){
        const index = this.getIndexWeight();
        if(index === undefined) return;
        this.dialog.open(CompleteExerciseDialogComponent, { data: exercise.weighs[index] }).afterClosed().subscribe((real: number | string) => {
          if(action !== "execute") return;
          if(typeof real === "string") return;
          if(real < 0 || real === undefined) return;
          if(!this.routine.exercises) return;
          const _newWeigh: RoutineExerciseWeigh = { real: real || 0, meta: exercise.weighs[index].meta };
          const _weights = [...exercise.weighs];
          _weights[index] = _newWeigh;
          
          const _exerciseIndex = this.routine.exercises?.indexOf(exercise);
          const _exercises = [...this.routine.exercises];
          _exercises[_exerciseIndex].weighs = _weights;

          option.toggle();
          this.routineService.updateExercises(_exercises, this.routine._id);
        });
      }
    });
  }
}

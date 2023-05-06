import { Component, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Subscription, combineLatest, map, switchMap, filter } from "rxjs";

import { RoutineService } from "../../services/routine.service";

import { AddExerciseDialogComponent } from "../../components/add-exercise-dialog/add-exercise-dialog.component";

import { Routine, RoutineExercise } from "src/app/shared/interfaces/routine";
import { ExerciseService } from "src/app/modules/exercise/services/exercise.service";
import { Exercise } from "src/app/shared/interfaces/exercises";
import { MatSnackBar } from "@angular/material/snack-bar";

interface DaySelected{
  index: number
  exercises: RoutineExercise[]
}

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"]
})
export class UpdateComponent implements OnDestroy{
  private subscription?: Subscription;
  exercises: Exercise[] = [];
  routine: Routine = {} as Routine;
  dayName = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
  fullDayName = ["domingo", "lunes", "martes", "miércoles", "jueves", "vienes", "sábado"];
  daySelected: DaySelected = {} as DaySelected;


  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private routineService: RoutineService,
  ){
    this.subscription = combineLatest([this.routineService.get(this.route.snapshot.params["_id"]), this.exerciseService.exercises]).subscribe(response => {
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
      this.selectDay(this.daySelected.index || 0);
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

  moveDay(move: 1 | -1){
    const nextDay = this.daySelected.index + move;
    if(nextDay < 0 || nextDay >= this.routine.days.length) return;
    this.selectDay(nextDay);
  }

  open(exercise: RoutineExercise){
    const dialogOptions = { data: { exercises: this.exercises, routine: this.routine, exercise } };

    this.dialog.open(AddExerciseDialogComponent, dialogOptions).afterClosed().pipe().subscribe();
  }

  deleteExercise(event: Event, index: number){
    event.stopPropagation();
    const _exercises = this.routine.exercises?.filter((_, i) => i !== index);
    this.routineService.updateExercises(_exercises as RoutineExercise[], this.routine._id).then(() => {
      this.snackBar.open("✅ Rutina borrada correctamente");
    });
  }
  
  addExercise(){
    const dialogOptions = { data: { exercises: this.exercises, routine: this.routine, day: this.daySelected.index } };
    this.dialog.open(AddExerciseDialogComponent, dialogOptions).afterClosed().pipe(
      filter(newExercise => !!newExercise),
      map(newExercise => {
        const _exercise = this.exercises.filter(exercise => exercise._id === newExercise.exercise)[0];
        delete newExercise.exercise;
        return Object.assign({}, _exercise, newExercise);
      }),
      map(newExercise => {
        const _exercises = this.routine.exercises ? this.routine.exercises.slice() : [];
        _exercises.push(newExercise);
        return _exercises as RoutineExercise[];
      }),
      switchMap((exercises) => this.routineService.updateExercises(exercises, this.routine._id))
    ).subscribe(() => {
      this.snackBar.open("✅ Rutina creada correctamente");
    });
  }
}

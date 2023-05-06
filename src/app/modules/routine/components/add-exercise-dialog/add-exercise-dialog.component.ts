import { Component, Inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import * as moment from "moment";
import { Exercise } from "src/app/shared/interfaces/exercises";
import { Routine, RoutineExercise, RoutineExerciseWeigh } from "src/app/shared/interfaces/routine";

interface DialogData{
  routine: Routine,
  exercises: Exercise[],
  exercise: RoutineExercise,
  day: number
}

@Component({
  selector: "app-add-exercise-dialog",
  templateUrl: "./add-exercise-dialog.component.html",
  styleUrls: ["./add-exercise-dialog.component.scss"]
})
export class AddExerciseDialogComponent {
  isNew = false;
  days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  exercises: Exercise[] = [];
  form: FormGroup = this.formBuilder.group({
    exercise: [null, [Validators.required]],
    day: [null, [Validators.required]],
    series: [null, [Validators.required]],
    reps: [null, [Validators.required]],
    weighs: this.formBuilder.array([])
  });

  enableDays = this.days.map((day, i) => {
    return { _id: i, name: day };
  }).filter((_, i) => {
    return this.data.routine.days.includes(i);
  });

  get weighsForm(): FormArray{
    return this.form.get("weighs") as FormArray;
  }

  constructor(
    private dialogRef: MatDialogRef<AddExerciseDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
  ){
    this.exercises = this.data.exercises;
    if(this.data.day !== undefined){
      this.form.get("day")?.setValue(this.data.day);
      this.updateWeights(this.data.day);
    }
    if(this.data.exercise){
      this.isNew = true;
      this.form.get("exercise")?.setValue(this.data.exercise._id);
      this.form.get("day")?.setValue(this.data.exercise.day);
      this.form.get("series")?.setValue(this.data.exercise.series);
      this.form.get("reps")?.setValue(this.data.exercise.reps);
      this.updateWeights(this.data.exercise.day, this.data.exercise.weighs);

      this.form.disable();
    }
  }

  private getDaysCount(dayNum: number){
    let count = 0;
    const currentDate = moment(this.data.routine.dateIN);
    while(currentDate.isSameOrBefore(this.data.routine.dateOUT)){
      if(currentDate.day() === dayNum) count++;
      currentDate.add(1, "day");
    }

    return count;
  }

  updateWeights(dayNum: number, weighs?: RoutineExerciseWeigh[]){
    const count = this.getDaysCount(dayNum);
    this.weighsForm.clear();
    for(let i = 0; i < count; i++){
      let value = null;
      if(weighs) value = weighs[i].meta;
      this.weighsForm.push(this.formBuilder.control(value, [Validators.required]));
    }
  }

  submit(){
    if(this.form.invalid) return;

    this.form.value.weighs = this.form.value.weighs.map((weigh: number) => {
      return { meta: weigh, real: 0 };
    });

    this.dialogRef.close(this.form.value);
  }
}

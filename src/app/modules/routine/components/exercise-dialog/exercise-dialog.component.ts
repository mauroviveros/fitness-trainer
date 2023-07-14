import { Component, Inject, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ExerciseService } from "src/app/modules/exercise/services/exercise.service";
import { Scheme } from "src/app/shared/interfaces/scheme";

interface DialogData{
  scheme: Scheme,
  mode: 1 | 2 | 3
  customer?: string
}

const RIR = [
  { value: -1, label: "AL FALLO" },
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" }
];

@Component({
  selector: "routine-exercise-dialog",
  templateUrl: "./exercise-dialog.component.html",
  styleUrls: ["./exercise-dialog.component.scss"]
})
export class ExerciseDialogComponent {
  private readonly exercises = inject(ExerciseService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef);
  readonly $exercises = this.exercises.$list;
  readonly RIR = RIR;

  readonly form: FormGroup = this.formBuilder.group({
    _id: [null],
    customer: [null, [Validators.required]],
    dayOfWeek: [null, [Validators.required]],
    exercise: [null, [Validators.required]],
    series: [null, [Validators.required]],
    reps: [null, [Validators.required]],
    rir: [-1, [Validators.required]]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData){
    Object.keys(this.form.controls).forEach(controlName => {
      if(!this.data.scheme[controlName]) return;

      let value = this.data.scheme[controlName];
      if(controlName === "customer") value = this.data.scheme[controlName]._id;
      if(controlName === "exercise") value = this.data.scheme[controlName]._id;
      this.form.controls[controlName].setValue(value);
    });
    if(this.data.customer) this.form.controls["customer"].setValue(this.data.customer);
  }

  submit(){
    if(this.form.invalid) return;

    this.dialogRef.close(this.form.value);
  }
}

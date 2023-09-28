import { Component, Inject, OnInit, inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ExerciseService } from "src/app/modules/exercise/services/exercise.service";
import { Scheme } from "src/app/shared/interfaces/scheme";
import { RoutineUtilsService } from "../../services/routine-utils.service";

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
export class ExerciseDialogComponent implements OnInit {
  private readonly routineUtils = inject(RoutineUtilsService);
  private readonly exercises = inject(ExerciseService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef);
  readonly $exercises = this.exercises.$list;
  readonly RIR = RIR;
  readonly getCategoryIcon = this.routineUtils.getCategoryIcon;

  readonly form: FormGroup = this.formBuilder.group({
    _id: [null],
    sensations: [null],
    customer: [null, [Validators.required]],
    dayOfWeek: [null, [Validators.required]],
    exercise: [null, [Validators.required]],
    series: [null, [Validators.required]],
    reps: [null, [Validators.required]],
    rir: [-1, [Validators.required]],
    weights: this.formBuilder.array([])
  });

  get weights(){
    return this.form.get("weights") as FormArray;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData){}

  ngOnInit(){
    for(let i = 0; i < this.data.scheme.series; i++){
      this.weights.push(this.formBuilder.control(null, [Validators.required]));
    }

    Object.keys(this.form.controls).forEach(controlName => {
      if(this.data.mode === 3) this.form.controls[controlName].disable();
      if(!this.data.scheme[controlName]) return;

      let value = this.data.scheme[controlName];
      if(controlName === "customer" || controlName === "exercise") value = this.data.scheme[controlName]._id;
      this.form.controls[controlName].setValue(value);
    });

    if(!this.form.controls["customer"].value) this.form.controls["customer"].setValue(this.data.customer);
  }

  submit(){
    if(this.form.invalid) return;

    this.dialogRef.close(this.form.value);
  }
}

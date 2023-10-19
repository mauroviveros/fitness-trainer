import { Component, Inject, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExerciseService } from "src/app/modules/exercise/services/exercise.service";
import { Category, Exercise } from "src/app/shared/interfaces/exercise";
import { SchemeService } from "../../services/scheme.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Scheme } from "src/app/shared/interfaces/scheme";
import { MatSelectChange } from "@angular/material/select";
import { firstValueFrom } from "rxjs";

interface DetailDialogContent {
  mode: 1 | 2 | 3,
  scheme: Scheme
}

@Component({
  selector: "routine-exercise-dialog",
  templateUrl: "./exercise-dialog.component.html"
})
export class ExerciseDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialog = inject(MatDialogRef<ExerciseDialogComponent>);
  private readonly exercise = inject(ExerciseService);
  private readonly scheme = inject(SchemeService);
  
  $exercises = this.exercise.$list;
  RIR = this.scheme.RIR;
  isSaving = false;
  mode : 1 | 2 | 3 = 3;
  ref(exercise: Exercise){ return this.exercise.ref(exercise); }

  readonly form: FormGroup = this.formBuilder.group({
    _id: [null],
    weekOfMonth: [null, [Validators.required]],
    dayOfWeek: [null, [Validators.required]],
    routine: [null, [Validators.required]],
    exercise: [null, [Validators.required]],
    category: [null, [Validators.required]],
    series: [null, [Validators.required, Validators.min(0)]],
    reps: [null, [Validators.required, Validators.min(0)]],
    rir: [-1, [Validators.required]]
  });

  constructor(@Inject(MAT_DIALOG_DATA) data: DetailDialogContent){
    this.mode = data.mode;
    if(!data.scheme) return;
    const controlsName = Object.keys(this.form.controls);
    controlsName.forEach(controlName => {
      if(controlName === "rir" && !data.scheme[controlName]) data.scheme[controlName] = -1;

      this.form.controls[controlName].setValue(data.scheme[controlName]);

      if(data.mode === 3) this.form.controls[controlName].disable();
      if(data.mode !== 1) this.form.controls[controlName].markAsTouched();
    });
  }


  getCategoryIcon(category: Category){
    return this.exercise.getIcon(category);
  }

  onChangeExercise(select: MatSelectChange){
    firstValueFrom(this.exercise.detail(select.value.id)).then(exercise => {
      this.form.controls["category"].setValue(exercise?.category);
    });
  }

  submit(){
    if(this.form.invalid) return;
    this.isSaving = true;

    this.scheme.upload(this.form.value)
      .then(() => this.dialog.close())
      .finally(() => this.isSaving = false);
  }
}

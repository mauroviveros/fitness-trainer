import { Component, Inject, inject } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DocumentData, DocumentReference } from "@angular/fire/firestore";

import { ExerciseService } from "src/app/modules/exercise/services/exercise.service";
import { SchemeService } from "../../services/scheme.service";

import { Exercise } from "src/app/shared/interfaces/exercise";
import { Scheme } from "src/app/shared/interfaces/scheme";

import { exerciseSelected } from "../../validators/exercise.validator";

interface DetailDialogContent {
  mode: 1 | 2 | 3,
  scheme: Scheme
  isEdit: boolean
  months?: number
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
  isEdit = false;
  months = 0;
  mode : 1 | 2 | 3 = 3;

  readonly form: FormGroup = this.formBuilder.group({
    _id: [null],
    weekOfMonth: [null, [Validators.required]],
    dayOfWeek: [null, [Validators.required]],
    routine: [null, [Validators.required]],
    exercise: [null, [Validators.required, exerciseSelected()]],
    category: [null, [Validators.required]],
    series: [null, [Validators.required, Validators.min(0)]],
    reps: [null, [Validators.required, Validators.min(0)]],
    rir: [null],
    sensations: [null],
    weights: this.formBuilder.array([])
  });

  get weights(){
    return this.form.get("weights") as FormArray;
  }

  get title() : string {
    if(this.mode === 1) return "Creando ejercicio";
    else if(this.mode === 2){
      return this.isEdit ? "Editando ejercicio" : "Completando ejercicio";
    } else return "Detalle del ejercicio";
  }

  constructor(@Inject(MAT_DIALOG_DATA) data: DetailDialogContent){
    this.mode = data.mode;
    this.isEdit = data.isEdit;
    this.months = data.months || 0;
    if(!data.scheme) return;

    for(let i = 0; i < data.scheme.series; i++){
      this.weights.push(this.formBuilder.control(null, [Validators.required, Validators.min(0)]));
    }

    if(this.mode === 3) this.form.controls["sensations"].disable();

    Object.keys(this.form.controls).forEach(controlName => {
      if(controlName === "rir" && !data.scheme[controlName]) return;
      if(controlName === "sensations" && !data.scheme[controlName]) return;
      if(controlName === "weights" && !data.scheme[controlName]?.length) return;

      this.form.controls[controlName].setValue(data.scheme[controlName]);

      if(data.mode === 3) this.form.controls[controlName].disable();
      if(data.mode !== 1) this.form.controls[controlName].markAsTouched();
    });
  }

  ref(exercise: Exercise){ return this.exercise.ref(exercise); }

  getCategoryIcon(exercise?: Exercise) : string {
    return this.exercise.getIcon(exercise?.category);
  }

  compareRef(value: DocumentReference<DocumentData>, reference?: DocumentReference<DocumentData>) : boolean {
    return value.id === reference?.id;
  }

  onChangeExercise(exercise: Exercise) : void {
    this.form.controls["category"].setValue(exercise.category);
    this.form.controls["rir"].clearValidators();
    if(exercise.category === "TRAINING") this.form.controls["rir"].setValidators(Validators.required);
    this.form.controls["rir"].updateValueAndValidity();
  }

  formatExercise(exercise?: Exercise){
    return exercise ? exercise.name : "";
  }

  needRIR(exercise?: Exercise){
    return exercise?.category === "TRAINING";
  }

  async submit() : Promise<void> {
    if(this.form.invalid) return;
    this.isSaving = true;
    const value = this.form.value;
    value.exercise = this.ref(value.exercise);

    for(let i = 0; i <= this.months; i++){
      const scheme = { ...value };
      scheme.weekOfMonth = i;
      await this.scheme.upload(scheme);
    }

    this.dialog.close();
    this.isSaving = false;
  }
}

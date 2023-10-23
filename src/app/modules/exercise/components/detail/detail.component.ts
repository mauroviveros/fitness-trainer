import { Component, Inject, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { ExerciseService } from "../../services/exercise.service";
import { Exercise } from "src/app/shared/interfaces/exercise";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { VideoService } from "src/app/shared/services/video.service";


interface DetailDialogContent {
  mode: 1 | 2 | 3,
  exercise: Exercise
}

@Component({
  selector: "exercise-detail",
  templateUrl: "./detail.component.html"
})
export class DetailComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialog = inject(MatDialogRef<DetailComponent>);
  private readonly exercise = inject(ExerciseService);
  private readonly video = inject(VideoService);

  readonly MAX_LENGTH = environment.MAX_LENGTH || 24;
  readonly categories = this.exercise.categories;
  mode : 1 | 2 | 3 = 3;
  isSaving = false;

  readonly form: FormGroup = this.formBuilder.group({
    _id: [null],
    name: [null, [Validators.required, Validators.maxLength(this.MAX_LENGTH)]],
    description: [null, [Validators.required]],
    category: [null, [Validators.required]],
    video: [null, [Validators.required, this.video.validate()]]
  });

  get categoryIcon(){ return this.exercise.getIcon(this.form.controls["category"].value); }
  get title(){
    switch(this.mode){
      case 1: return "Crear Ejercicio";
      case 2: return "Editar Ejercicio";
      case 3: return "Detalle Ejercicio";
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) data: DetailDialogContent){
    this.mode = data.mode;
    if(!data.exercise) return;
    const controlsName = Object.keys(this.form.controls);
    controlsName.forEach(controlName => {
      this.form.controls[controlName].setValue(data.exercise[controlName]);
      if(data.mode === 3) this.form.controls[controlName].disable();
      if(data.mode !== 1) this.form.controls[controlName].markAsTouched();
    });
  }

  submit(){
    if(this.form.invalid) return;
    this.isSaving = true;
    this.exercise.upload(this.form.value)
      .then(() => this.dialog.close())
      .finally(() => this.isSaving = false);
  }
}

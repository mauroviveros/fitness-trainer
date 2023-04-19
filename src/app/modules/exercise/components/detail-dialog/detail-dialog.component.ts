import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Exercise, ExerciseOUT } from "src/app/shared/interfaces/exercises";

interface DialogData{
  exercise?: Exercise,
  mode?: 1 | 2 | 3
}

@Component({
  selector: "exercise-detail-dialog",
  templateUrl: "./detail-dialog.component.html",
  styleUrls: ["./detail-dialog.component.scss"]
})
export class DetailDialogComponent {
  mode = 3;
  form: FormGroup = this.formBuilder.group({
    name        : [null, [Validators.required]],
    description : [null, [Validators.required]],
    video       : [null, [Validators.required]]
  });

  get title(){
    return this.mode === 1 ? "Nuevo ejercicio" : "Detalle del ejercicio";
  }

  constructor(
    private dialogRef: MatDialogRef<DetailDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
  ){
    if(this.data.mode) this.mode = this.data.mode;

    if(this.data.exercise){
      this.form.get("name")?.setValue(this.data.exercise.name);
      this.form.get("description")?.setValue(this.data.exercise.description);
      this.form.get("video")?.setValue(this.data.exercise.video);
    }

    if(this.mode === 3){
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].disable();
      });
    }
  }

  submit(){
    if(this.form.invalid) return;
    this.dialogRef.close(this.form.value as ExerciseOUT);
  }
}

import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-complete-exercise-dialog",
  templateUrl: "./complete-exercise-dialog.component.html",
  styleUrls: ["./complete-exercise-dialog.component.scss"]
})
export class CompleteExerciseDialogComponent {
  editable = true;
  form: FormGroup = this.formBuilder.group({
    real: [null, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CompleteExerciseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public weight: { meta: number, real: number }
  ){
    const ctrl = this.form.get("real");
    if(this.weight.real && ctrl){
      ctrl.setValue(this.weight.real);
      ctrl.disable();
      this.editable = false;
    }
  }

  submit(){
    if(this.form.invalid) return;
    this.dialogRef.close(this.form.value.real);
  }
}

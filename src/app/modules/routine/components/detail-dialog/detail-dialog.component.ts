import { Component, Inject, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Routine } from "src/app/shared/interfaces/routine";
import { DateService } from "src/app/shared/services/date.service";
import { MediaService } from "src/app/shared/services/media.service";
import { RoutineService } from "../../services/routine.service";

interface DetailDialogContent {
  mode: 1 | 2 | 3,
  routine: Routine
}

@Component({
  selector: "routine-detail-dialog",
  templateUrl: "./detail-dialog.component.html"
})
export class DetailDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialog = inject(MatDialogRef<DetailDialogComponent>);
  private readonly routine = inject(RoutineService);
  private readonly media = inject(MediaService);
  private readonly date = inject(DateService);

  mode : 1 | 2 | 3 = 3;
  isSaving = false;

  readonly $isMobile = this.media.$isMobile;
  readonly form : FormGroup = this.formBuilder.group({
    // _id: [null],
    customer: [null],
    admin: [null],
    daysOfWeek: [[], [Validators.required]],
    dateIN: [null, [Validators.required]],
    dateOUT: [null, [Validators.required]],
    level: [null, [Validators.required]],
    kal: [null, [Validators.required]],
    objective: [null, [Validators.required]]
  });

  get title(){
    switch(this.mode){
      case 1: return "Crear Rutina";
      case 2: return "Editar Rutina";
      case 3: return "Detalle Rutina";
    }
  }
  

  daysOfWeek = this.date.daysOfWeek;
  levels = this.routine.levels;
  highlight = this.date.highlightCalendar;

 

  constructor(@Inject(MAT_DIALOG_DATA) data: DetailDialogContent){
    this.mode = data.mode;
    const controlsName = Object.keys(this.form.controls);
    controlsName.forEach(controlName => {
      this.form.controls[controlName].setValue(data.routine[controlName]);
      // if(data.mode === 3) this.form.controls[controlName].disable();
      // if(data.mode !== 1) this.form.controls[controlName].markAsTouched();
    });
  }


  submit() : void {
    if(this.form.invalid) return;
    this.isSaving = true;
    
    this.routine.upload(this.form.value)
      .then(() => this.dialog.close())
      .finally(() => this.isSaving = false);

    setTimeout(() => {
      this.isSaving = false;
    }, 3000);
  }
}

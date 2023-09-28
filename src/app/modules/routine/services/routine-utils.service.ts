import { Injectable, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";

import { SchemeService } from "./scheme.service";

import { ExerciseDialogComponent } from "../components/exercise-dialog/exercise-dialog.component";
import { ExerciseBottomSheetComponent } from "../components/exercise-bottom-sheet/exercise-bottom-sheet.component";

import { Scheme } from "src/app/shared/interfaces/scheme";

@Injectable({
  providedIn: "root"
})
export class RoutineUtilsService {
  private readonly scheme = inject(SchemeService);
  private readonly dialog = inject(MatDialog);
  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly formBuilder = inject(FormBuilder);

  createForm(): FormGroup {
    return this.formBuilder.group({
      admin: [null, [Validators.required]],
      daysOfWeek: [[], [Validators.required]],
      dateIN: [null, [Validators.required]],
      dateOUT: [null, [Validators.required]],
      customer: [null, [Validators.required]],
      level: [null, [Validators.required]],
      kal: [null, [Validators.required]],
      objective: [null, [Validators.required]]
    });
  }

  getCategoryIcon(exerciseCategory: string){
    if(exerciseCategory === "TRAINING") return "fitness_center";
    if(exerciseCategory === "WARM_UP") return "directions_run";
    return "category";
  }

  openExercise(scheme: Scheme, mode = 2, customer?: string){
    return this.dialog.open(ExerciseDialogComponent, { data: { scheme, mode, customer } }).afterClosed().subscribe(scheme => {
      if(scheme) this.scheme.upload(scheme);
    });
  }

  openBottomSheet(scheme: Scheme, canComplete: boolean){
    return this.bottomSheet.open(ExerciseBottomSheetComponent, { data: { scheme, canComplete } });
  }
}

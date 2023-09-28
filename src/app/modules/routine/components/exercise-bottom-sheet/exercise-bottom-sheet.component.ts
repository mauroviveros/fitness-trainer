import { Component, Inject, OnInit, inject } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";

import { DialogService } from "src/app/shared/services/dialog.service";

import { Scheme } from "src/app/shared/interfaces/scheme";
import { RoutineUtilsService } from "../../services/routine-utils.service";

interface itemBottomSheet{
  _id: string
  icon: string
  label: string
}

@Component({
  selector: "routine-exercise-bottom-sheet",
  templateUrl: "./exercise-bottom-sheet.component.html"
})
export class ExerciseBottomSheetComponent implements OnInit {
  private readonly bottomSheetRef = inject(MatBottomSheetRef<ExerciseBottomSheetComponent>);
  private readonly dialog = inject(DialogService);
  private readonly routineUtils = inject(RoutineUtilsService);

  scheme: Scheme = {} as Scheme;
  canComplete = false;
  
  readonly items: itemBottomSheet[] = [
    { _id: "description", icon: "description", label: "detalle del ejercicio" },
    { _id: "video", icon: "play_circle", label: "video explicativo" }
  ];

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) private readonly data: { scheme: Scheme, canComplete: boolean }){
    this.scheme = data.scheme;
    this.canComplete = this.data.canComplete;
  }

  ngOnInit(){
    if(this.scheme.weights.length > 0) this.items.unshift({ _id: "complete", icon: "check_circle", label: "ver realizado" });
    else if(this.canComplete) this.items.unshift({ _id: "checkTRUE", icon: "done", label: "realizar ejercicio" });
  }


  onClick(idItem: string){
    switch(idItem){
      case "checkTRUE": this.bottomSheetRef.dismiss(); this.routineUtils.openExercise(this.scheme); break;
      case "complete": this.bottomSheetRef.dismiss(); this.routineUtils.openExercise(this.scheme, 3); break;
      case "video": this.dialog.openVideoFrame(this.scheme.exercise.name, this.scheme.exercise.video); break;
      case "description": this.dialog.open({
        title: this.scheme.exercise.name,
        texts: [this.scheme.exercise.description],
        icon: this.routineUtils.getCategoryIcon(this.scheme.exercise.category)
      }); break;
    }
  }
}

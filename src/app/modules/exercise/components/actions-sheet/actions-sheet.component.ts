import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";

import { ExerciseAction } from "src/app/shared/interfaces/exercises";

@Component({
  selector: "exercise-actions-sheet",
  templateUrl: "./actions-sheet.component.html"
})
export class ActionsSheetComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ActionsSheetComponent>
  ){}

  action(action: ExerciseAction){
    this.bottomSheetRef.dismiss(action);
  }
}

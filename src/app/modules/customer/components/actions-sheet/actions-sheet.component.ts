import { Component } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";

@Component({
  selector: "app-actions-sheet",
  templateUrl: "./actions-sheet.component.html"
})
export class ActionsSheetComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ActionsSheetComponent>
  ){}

  action(action: string){
    this.bottomSheetRef.dismiss(action);
  }
}

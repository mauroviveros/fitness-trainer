import { Component, Inject, inject } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from "@angular/material/bottom-sheet";

import { Action } from "../../interfaces/interfaces";

@Component({
  selector: "shared-actions-sheet",
  templateUrl: "./actions-sheet.component.html"
})
export class ActionsSheetComponent {
  private readonly bottomSheet = inject(MatBottomSheet);
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public actions: Action[]){}


  select(action: Action){
    this.bottomSheet.dismiss(action);
  }
}

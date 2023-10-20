import { Component, Inject, inject } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from "@angular/material/bottom-sheet";

import { Routine } from "src/app/shared/interfaces/routine";

@Component({
  selector: "customer-routines-sheet",
  templateUrl: "./routines-sheet.component.html"
})
export class RoutinesSheetComponent {
  private readonly bottomSheet = inject(MatBottomSheet);
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public routines: Routine[]){}

  select(_id: string){
    this.bottomSheet.dismiss(_id);
  }
}

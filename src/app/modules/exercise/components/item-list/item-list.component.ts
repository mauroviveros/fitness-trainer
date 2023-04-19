import { Component, Input } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";

import { Exercise, ExerciseAction } from "src/app/shared/interfaces/exercises";

import { DetailDialogComponent } from "../detail-dialog/detail-dialog.component";
import { ActionsSheetComponent } from "../actions-sheet/actions-sheet.component";
import { ExcerciseService } from "../../services/excercise.service";

@Component({
  selector: "exercise-item-list",
  templateUrl: "./item-list.component.html"
})
export class ItemListComponent {
  @Input() exercise?: Exercise;

  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private exerciseService: ExcerciseService
  ){}

  openDialog(mode = 3){
    this.dialog.open(DetailDialogComponent, { data: { exercise: this.exercise, mode } }).afterClosed().subscribe(result => {
      if(result && mode === 2 && this.exercise) this.exerciseService.update(this.exercise._id, result);
    });
  }

  actions(event: Event){
    event.stopPropagation();
    this.bottomSheet.open(ActionsSheetComponent).afterDismissed().subscribe((action: ExerciseAction) => {
      switch(action){
      case "update" : this.openDialog(2); break;
      case "detail" : this.openDialog(3); break;
      case "delete" : if(this.exercise) this.exerciseService.delete(this.exercise._id); break;
      case "video"  : if(this.exercise) window.open(this.exercise.video, "_blank"); break;
      }
    });
  }
}

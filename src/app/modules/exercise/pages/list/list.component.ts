import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { ExerciseService } from "../../services/exercise.service";
import { Exercise, ExerciseOUT } from "src/app/shared/interfaces/exercises";

import { DetailDialogComponent } from "../../components/detail-dialog/detail-dialog.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent {
  exercises?: Exercise[];

  constructor(
    private dialog: MatDialog,
    private exerciseService: ExerciseService
  ){
    this.exerciseService.exercises.subscribe(exercises => {
      this.exercises = exercises;
    });
  }

  add(){
    this.dialog.open(DetailDialogComponent, { data: { mode: 1 } }).afterClosed().subscribe((result: ExerciseOUT) => {
      if(result) this.exerciseService.create(result);
    });
  }
}

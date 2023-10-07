import { Component, Input, inject } from "@angular/core";

import { Exercise } from "src/app/shared/interfaces/exercise";
import { ExerciseService } from "../../services/exercise.service";

import { Action } from "src/app/shared/interfaces/interfaces";
import { DialogService } from "src/app/shared/services/dialog.service";

@Component({
  selector: "exercise-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent {
  private readonly dialog = inject(DialogService);
  private readonly service = inject(ExerciseService);
  @Input() exercise!: Exercise;

  actions: Action[] = [
    { _id: "video", icon: "play_circle_filled", text: "Ver Video explicativo" },
    { _id: "update", icon: "edit", text: "Editar Ejercicio" },
    { _id: "delete", icon: "delete", text: "Borrar Ejercicio" },
  ];
  get categoryIcon(){ return this.service.getIcon(this.exercise.category); }

  onAction(action: string){
    switch(action){
      case "video": console.log("video"); break;
      case "update": this.open(2); break;
      case "delete": console.log("delete"); break;
    }
  }

  open(mode: 1 | 2 | 3){
    this.service.openExercise(mode, this.exercise);
  }
}

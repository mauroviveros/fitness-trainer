import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { filter, switchMap } from "rxjs";

import { Exercise } from "src/app/shared/interfaces/exercise";
import { ExerciseService } from "../../services/exercise.service";

import { Action } from "src/app/shared/interfaces/interfaces";
import { DialogService } from "src/app/shared/services/dialog.service";

@Component({
  selector: "exercise-item",
  templateUrl: "./item.component.html"
})
export class ItemComponent {
  private readonly dialog = inject(DialogService);
  private readonly service = inject(ExerciseService);
  @Output() loading = new EventEmitter<boolean>();
  @Input() exercise!: Exercise;

  actions: Action[] = [
    { _id: "video", icon: "play_circle_filled", text: "Ver Video explicativo" },
    { _id: "update", icon: "edit", text: "Editar Ejercicio" },
    { _id: "delete", icon: "delete", text: "Borrar Ejercicio" },
  ];
  get categoryIcon(){ return this.service.getIcon(this.exercise.category); }

  onAction(action: string){
    switch(action){
      case "video": this.dialog.openVideoFrame(this.exercise.name, this.exercise.video); break;
      case "update": this.open(2); break;
      case "delete": this.delete(); break;
    }
  }

  delete(){
    this.dialog.showConfirmDelete("Borrando Ejercicio", this.exercise.name).pipe(
      filter(boolean => boolean),
      switchMap(() => this.service.delete(this.exercise._id))
    ).subscribe();
  }

  open(mode: 1 | 2 | 3){
    this.service.openExercise(mode, this.exercise);
  }
}

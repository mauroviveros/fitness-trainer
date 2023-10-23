import { Component, EventEmitter, Input, OnChanges, Output, inject } from "@angular/core";
import { filter, switchMap } from "rxjs";

import { Exercise } from "src/app/shared/interfaces/exercise";
import { ExerciseService } from "../../services/exercise.service";

import { Action } from "src/app/shared/interfaces/interfaces";
import { DialogService } from "src/app/shared/services/dialog.service";

@Component({
  selector: "exercise-item",
  templateUrl: "./item.component.html"
})
export class ItemComponent implements OnChanges {
  private readonly dialog = inject(DialogService);
  private readonly service = inject(ExerciseService);
  @Output() loading = new EventEmitter<boolean>();
  @Input() exercise!: Exercise;

  actions: Action[] = [];
  get categoryIcon(){ return this.service.getIcon(this.exercise.category); }

  ngOnChanges(){
    let actions = [
      { _id: "video", icon: "play_circle_filled", text: "Ver Video explicativo" },
      { _id: "update", icon: "edit", text: "Editar Ejercicio" },
      { _id: "delete", icon: "delete", text: "Borrar Ejercicio" },
    ];

    if(!this.exercise.video) actions = actions.filter(action => action._id !== "video");
    this.actions = actions;
  }

  onAction(action: string){
    switch(action){
      case "video": this.exercise.video ? this.dialog.openVideoFrame(this.exercise.name, this.exercise.video) : null; break;
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

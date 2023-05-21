import { Component, Input, inject } from "@angular/core";

import { Exercise } from "src/app/shared/interfaces/exercise";
import { DialogService } from "src/app/shared/services/dialog.service";

@Component({
  selector: "exercise-item-list",
  templateUrl: "./item-list.component.html"
})
export class ItemListComponent {
  private readonly dialog = inject(DialogService);
  @Input() exercise!: Exercise;


  get categoryIcon(){
    let category = "category";
    if(this.exercise.category === "WARM_UP") category = "directions_run";
    if(this.exercise.category === "TRAINING") category = "fitness_center";
    return category;
  }


  showDetail(){
    this.dialog.open({
      title: this.exercise.name,
      texts: [this.exercise.description],
      icon: this.categoryIcon
    });
  }

  showVideo(){
    this.dialog.openVideoFrame(this.exercise.name, this.exercise.video);
  }

  deleteItem(){
    this.dialog.showConfirmDelete("Borrando ejercicio", this.exercise.name);
    // TODO delete method
  }
}

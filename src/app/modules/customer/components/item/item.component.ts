import { Component, Input, inject } from "@angular/core";
import { RoutineService } from "src/app/modules/routine/services/routine.service";
import { Action } from "src/app/shared/interfaces/interfaces";

import { UserDoc } from "src/app/shared/interfaces/user";

@Component({
  selector: "customer-item",
  templateUrl: "./item.component.html"
})
export class ItemComponent {
  private readonly routine = inject(RoutineService);

  @Input() customer!: UserDoc;

  actions: Action[] = [
    { _id: "create", icon: "playlist_play", text: "Crear Rutina" },
  ];

  onAction(action: string){
    switch(action){
      case "create" : this.routine.openRoutine(1, { customer: this.customer }) ; break;
    }
  }
}

import { Component, Input, inject } from "@angular/core";
import { RoutineService } from "src/app/modules/routine/services/routine.service";
import { Action } from "src/app/shared/interfaces/interfaces";
import { Routine } from "src/app/shared/interfaces/routine";

import { UserDoc } from "src/app/shared/interfaces/user";

@Component({
  selector: "customer-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent {
  private readonly routineSrv = inject(RoutineService);

  @Input() customer!: UserDoc;
  @Input() routines: Routine[] = [];

  get actions() : Action[] {
    let actions : Action[] = [
      { _id: "create", icon: "playlist_play", text: "Crear Rutina" },
      { _id: "history", icon: "history", text: "Historial de rutinas" }
    ];

    if(this.routines.length) actions = actions.filter(action => action._id !== "create");
    if(this.routines.length <= 1) actions = actions.filter(action => action._id !== "history");

    return actions;
  }

  onAction(action: string){
    switch(action){
      case "create" : this.routineSrv.openRoutine(1, undefined, this.customer) ; break;
    }
  }
}

import { Component, Input, inject } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { RoutineService } from "src/app/modules/routine/services/routine.service";
import { Action } from "src/app/shared/interfaces/interfaces";
import { Routine } from "src/app/shared/interfaces/routine";

import { UserDoc } from "src/app/shared/interfaces/user";
import { RoutinesSheetComponent } from "../routines-sheet/routines-sheet.component";
import { filter } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "customer-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent {
  private readonly router = inject(Router);
  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly routineSrv = inject(RoutineService);

  @Input() customer!: UserDoc;
  @Input() routines: Routine[] = [];

  get actions() : Action[] {
    let actions : Action[] = [
      { _id: "create", icon: "playlist_play", text: "Crear Rutina" },
      { _id: "history", icon: "history", text: "Historial de rutinas" }
    ];

    if(this.routines.length && this.hasRoutinesWithoutFinish()) actions = actions.filter(action => action._id !== "create");
    if(this.routines.length <= 1) actions = actions.filter(action => action._id !== "history");

    return actions;
  }

  onAction(action: string){
    switch(action){
      case "create" : this.routineSrv.openRoutine(1, undefined, this.customer); break;
      case "history" : this.openBottomSheet(); break;
    }
  }

  hasRoutinesWithoutFinish(){
    const date = new Date();
    const routines = this.routines.filter(routine => date < routine.dateOUT);
    return routines.length;
  }

  openBottomSheet(){
    this.bottomSheet.open(RoutinesSheetComponent, { data: this.routines }).afterDismissed()
      .pipe(filter(routineID => !!routineID))
      .subscribe(routineID => this.router.navigate(["/routine", routineID]));
  }
}

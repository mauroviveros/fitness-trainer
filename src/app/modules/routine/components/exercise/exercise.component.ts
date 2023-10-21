import { Component, Input, OnDestroy, OnInit, inject } from "@angular/core";
import { Subscription, filter, switchMap } from "rxjs";
import { ExerciseService } from "src/app/modules/exercise/services/exercise.service";
import { Exercise } from "src/app/shared/interfaces/exercise";
import { Action } from "src/app/shared/interfaces/interfaces";
import { Scheme } from "src/app/shared/interfaces/scheme";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SchemeService } from "../../services/scheme.service";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatListOption } from "@angular/material/list";
import { ActionsSheetComponent } from "src/app/shared/components/actions-sheet/actions-sheet.component";
import { RoutineService } from "../../services/routine.service";

@Component({
  selector: "routine-exercise",
  templateUrl: "./exercise.component.html",
  styles: [" .disabled{ color: var(--mdc-list-list-item-leading-icon-color) !important; } "]
})
export class ExerciseComponent implements OnInit, OnDestroy {
  private readonly dialog = inject(DialogService);
  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly service = inject(SchemeService);
  private readonly exerciseService = inject(ExerciseService);
  private readonly routineService = inject(RoutineService);
  private readonly subscriptions: Subscription[] = [];
  @Input() scheme!: Scheme;
  @Input() isAdmin = false;
  exercise? : Exercise;

  get icon(){ return this.exerciseService.getIcon(this.exercise ? this.exercise.category : this.scheme.category); }

  get actions() : Action[] {
    let actions : Action[] = [
      { _id: "check", icon: "done", text: "Completar Ejercicio", },
      { _id: "delete", icon: "delete", text: "Borrar ejercicio" }
    ];

    if(!this.isAdmin) actions = actions.filter(action => action._id !== "delete");
    if(this.scheme.weights?.length) actions = actions.filter(action => action._id !== "check");

    return actions;
  }

  ngOnInit(){
    this.subscriptions.push(this.initExercise());
  }
  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initExercise() : Subscription {
    return this.exerciseService.detail(this.scheme.exercise.id)
      .subscribe(exercise => this.exercise = exercise);
  }

  onAction(action: string){
    switch(action){
      case "check": this.routineService.openExercise(2, this.scheme); break;
      case "delete": this.delete(); break;
    }
  }

  delete(){
    if(!this.exercise) return;
    this.dialog.showConfirmDelete("Borrando Ejercicio", this.exercise.name).pipe(
      filter(boolean => boolean),
      switchMap(() => this.service.delete(this.scheme._id))
    ).subscribe();
  }

  openBottomSheet(option: MatListOption){
    option.toggle();
    this.bottomSheet.open(ActionsSheetComponent, { data: this.actions }).afterDismissed().pipe(
      filter(action => !!action)
    ).subscribe(action => this.onAction(action._id));
  }

}

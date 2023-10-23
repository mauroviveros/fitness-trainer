import { Component, Input, OnChanges, OnDestroy, OnInit, inject } from "@angular/core";
import { DocumentData, DocumentReference } from "@angular/fire/firestore";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatListOption } from "@angular/material/list";
import { Observable, Subscription, filter, switchMap } from "rxjs";

import { ExerciseService } from "src/app/modules/exercise/services/exercise.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SchemeService } from "../../services/scheme.service";
import { RoutineService } from "../../services/routine.service";
import { AuthService } from "src/app/core/modules/auth/services/auth.service";

import { ActionsSheetComponent } from "src/app/shared/components/actions-sheet/actions-sheet.component";

import { Exercise } from "src/app/shared/interfaces/exercise";
import { Action } from "src/app/shared/interfaces/interfaces";
import { Scheme } from "src/app/shared/interfaces/scheme";
import { UserDoc } from "src/app/shared/interfaces/user";

@Component({
  selector: "routine-exercise",
  templateUrl: "./exercise.component.html",
  styles: [" .disabled{ color: var(--mdc-list-list-item-leading-icon-color) !important; } "]
})
export class ExerciseComponent implements OnInit, OnChanges, OnDestroy {
  private readonly dialog = inject(DialogService);
  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly service = inject(SchemeService);
  private readonly exerciseService = inject(ExerciseService);
  private readonly routineService = inject(RoutineService);
  private readonly authService = inject(AuthService);
  private readonly subscriptions: Subscription[] = [];
  @Input() scheme!: Scheme;
  @Input() customer!: DocumentReference<DocumentData>;
  @Input() user? : UserDoc;
  @Input() isAdmin = false;
  exercise? : Exercise;

  get icon(){ return this.exerciseService.getIcon(this.exercise ? this.exercise.category : this.scheme.category); }

  actions: Action[] = [];

  ngOnInit(){
    this.subscriptions.push(this.initExercise());
  }
  
  ngOnChanges(){
    let actions : Action[] = [
      { _id: "view", icon: "visibility", text: "Ver ejercicio realizado" },
      { _id: "check", icon: "done", text: "Completar Ejercicio", },
      { _id: "edit", icon: "edit", text: "Editar Ejercicio", },
      { _id: "detail", icon: "description", text: "Detalle del ejercicio" },
      { _id: "video", icon: "play_circle_filled", text: "Ver Video explicativo" },
      { _id: "delete", icon: "delete", text: "Borrar ejercicio" }
    ];

    if(!this.isAdmin) actions = actions.filter(action => action._id !== "delete" && action._id !== "view");
    if(this.user?._id !== this.customer.id) actions = actions.filter(action => action._id !== "check" && action._id !== "edit");
    if(this.scheme.weights?.length) actions = actions.filter(action => action._id !== "check");
    if(!this.scheme.weights?.length) actions = actions.filter(action => action._id !== "edit" && action._id !== "view");

    this.actions = actions;
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initExercise() : Subscription {
    return this.exerciseService.detail(this.scheme.exercise.id).subscribe(exercise => this.exercise = exercise);
  }

  onAction(action: string) : void {
    switch(action){
      case "view": this.routineService.openExercise(3, this.scheme); break;
      case "detail": this.showDetail(); break;
      case "video": this.showVideo(); break;
      case "check": this.routineService.openExercise(2, this.scheme); break;
      case "edit": this.routineService.openExercise(2, this.scheme, true); break;
      case "delete": this.delete(); break;
    }
  }

  showVideo() : Observable<boolean> | undefined {
    if(!this.exercise) return;
    return this.dialog.openVideoFrame(this.exercise.name, this.exercise.video);
  }

  showDetail() : Observable<boolean> | undefined {
    if(!this.exercise) return;
    return this.dialog.open({ icon: this.icon, title: this.exercise.name, texts: [this.exercise.description] });
  }

  delete() : Observable<void> | undefined {
    if(!this.exercise) return;
    return this.dialog.showConfirmDelete("Borrando Ejercicio", this.exercise.name).pipe(
      filter(boolean => boolean),
      switchMap(() => this.service.delete(this.scheme._id))
    );
  }

  openBottomSheet(option: MatListOption){
    option.toggle();
    this.bottomSheet.open(ActionsSheetComponent, { data: this.actions }).afterDismissed().pipe(
      filter(action => !!action)
    ).subscribe(action => this.onAction(action._id));
  }

}

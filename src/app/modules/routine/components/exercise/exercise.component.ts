import { Component, Input, OnDestroy, OnInit, inject } from "@angular/core";
import { Subscription, filter, switchMap } from "rxjs";
import { ExerciseService } from "src/app/modules/exercise/services/exercise.service";
import { Exercise } from "src/app/shared/interfaces/exercise";
import { Action } from "src/app/shared/interfaces/interfaces";
import { Scheme } from "src/app/shared/interfaces/scheme";
import { DialogService } from "src/app/shared/services/dialog.service";
import { SchemeService } from "../../services/scheme.service";

@Component({
  selector: "routine-exercise",
  templateUrl: "./exercise.component.html"
})
export class ExerciseComponent implements OnInit, OnDestroy {
  private readonly dialog = inject(DialogService);
  private readonly service = inject(SchemeService);
  private readonly exerciseService = inject(ExerciseService);
  private readonly subscriptions: Subscription[] = [];
  @Input() scheme!: Scheme;
  exercise? : Exercise;

  get icon(){ return this.exerciseService.getIcon(this.exercise ? this.exercise.category : this.scheme.category); }

  actions : Action[] = [
    { _id: "delete", icon: "delete", text: "Borrar ejercicio" },
  ];

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
    //   case "video": this.dialog.openVideoFrame(this.exercise.name, this.exercise.video); break;
    //   case "update": this.open(2); break;
      case "delete": this.delete(); break;
    }
  }


  delete(){
    if(!this.exercise) return;
    console.log(this.scheme);
    this.dialog.showConfirmDelete("Borrando Ejercicio", this.exercise.name).pipe(
      filter(boolean => boolean),
      switchMap(() => this.service.delete(this.scheme._id))
    ).subscribe();
  }
}

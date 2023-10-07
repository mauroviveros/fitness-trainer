import { Component, OnDestroy, OnInit, inject } from "@angular/core";

import { Exercise } from "src/app/shared/interfaces/exercise";
import { ExerciseService } from "../../services/exercise.service";
import { Subscription, tap } from "rxjs";

@Component({
  selector: "exercise-list",
  templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit, OnDestroy {
  private readonly exercise = inject(ExerciseService);
  private readonly subscriptions : Subscription[] = [];
  exercises: Exercise[] = [];
  isLoadingDM = true;
  isLoading = false;


  ngOnInit(){
    this.subscriptions.push(this.initList());
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initList(){
    return this.exercise.$list.pipe(
      tap(() => this.isLoadingDM = false)
    ).subscribe(exercises => this.exercises = exercises);
  }

  create(){
    this.exercise.openExercise(1);
  }
}

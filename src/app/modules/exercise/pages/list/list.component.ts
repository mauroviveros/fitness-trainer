import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { ExerciseService } from "../../services/exercise.service";

import { Exercise } from "src/app/shared/interfaces/exercise";

@Component({
  selector: "exercise-list",
  templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit, OnDestroy {
  private readonly exercise = inject(ExerciseService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private subscription?: Subscription;
  isLoading = true;
  list: Exercise[] = [];

  ngOnInit(){
    this.subscription = this.initList();
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  private initList(){
    return this.exercise.$list.subscribe(exercises => {
      this.isLoading = false;
      this.list = exercises;
    });
  }

  create(){
    this.router.navigate(["create"], { relativeTo: this.route });
  }
}

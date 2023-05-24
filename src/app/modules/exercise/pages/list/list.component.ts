import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ExerciseService } from "../../services/exercise.service";

import { Exercise } from "src/app/shared/interfaces/exercise";

@Component({
  selector: "exercise-list",
  templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit{
  private readonly exercise = inject(ExerciseService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  isLoading = true;
  list: Exercise[] = [];

  ngOnInit(){
    this.exercise.$list.subscribe(exercises => {
      this.isLoading = false;
      this.list = exercises;
    });
  }

  create(){ this.router.navigate(["create"], { relativeTo: this.route }); }
}

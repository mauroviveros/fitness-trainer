import { Component, OnInit, inject } from "@angular/core";
import { ExerciseService } from "../../services/exercise.service";

import { Exercise } from "src/app/shared/interfaces/exercise";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "exercise-list",
  templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit{
  private readonly exercise = inject(ExerciseService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  list: Exercise[] = [];

  ngOnInit(){
    this.exercise.$list.subscribe(exercises => {
      this.list = exercises;
    });
  }

  create(){ this.router.navigate(["create"], { relativeTo: this.route }); }
}

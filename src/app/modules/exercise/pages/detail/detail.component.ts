import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subscription, catchError, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";

import { ExerciseService } from "../../services/exercise.service";

import { Exercise } from "src/app/shared/interfaces/exercise";


interface ExerciseCategory{
  _id: string
  name: string
  icon: string
}

@Component({
  selector: "exercise-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit, OnDestroy {
  private readonly exercise = inject(ExerciseService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly subscriptions: Subscription[] = [];
  readonly maxlength = environment.MAX_LENGTH;
  readonly $mode = new BehaviorSubject<3 | 2 | 1>(3);
  categoryIcon = "category";
  isLoading = false;

  readonly categories: ExerciseCategory[] = [
    { _id: "TRAINING", name: "Entrenamiento", icon: "fitness_center" },
    { _id: "WARM_UP", name: "Calentamiento", icon: "directions_run" }
  ];

  readonly form: FormGroup = this.formBuilder.group({
    _id: [null],
    name: [null, [Validators.required, Validators.maxLength(this.maxlength)]],
    description: [null, [Validators.required]],
    category: [null, [Validators.required]],
    video: [null, [Validators.required]]
  });

  ngOnInit(){
    this.subscriptions.push(this.initRouteURL());
    this.subscriptions.push(this.initMode());
    this.subscriptions.push(this.initExerciseData());
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  private initMode(){
    return this.$mode.subscribe(mode => {
      const controlsName = Object.keys(this.form.controls);

      controlsName.forEach(controlName => {
        if(mode !== 3) this.form.controls[controlName].enable();
        else this.form.controls[controlName].disable();
      });
    });
  }

  private initRouteURL(){
    return this.route.url.subscribe(segment => {
      if(segment[0].path === "create") this.$mode.next(1);
      else if(segment[1] && segment[1].path === "edit") this.$mode.next(2);
      else this.$mode.next(3);
    });
  }

  private initExerciseData(){
    return this.$mode.pipe(
      switchMap(() => this.exercise.detail(this.route.snapshot.params["_id"])),
      catchError(() => of({} as Exercise))
    ).subscribe(exercise => {
      const controlsName = Object.keys(this.form.controls);
      controlsName.forEach(controlName => {
        this.form.controls[controlName].setValue(exercise[controlName]);
      });
    });
  }

  onAction(action:string){
    switch(action){
      case "edit": this.router.navigate(["edit"], { relativeTo: this.route }); break;
    }
  }

  onChangeCategory(_id: string){
    const category = this.categories.find(category => {
      return category._id === _id;
    });
    this.categoryIcon = category?.icon || "category";
  }

  submit(){
    if(this.form.invalid) return;

    this.isLoading = true;
    this.exercise.upload(this.form.value)
      .then(() => this.router.navigate([".."], { relativeTo: this.route }))
      .finally(() => this.isLoading = false);
  }
}

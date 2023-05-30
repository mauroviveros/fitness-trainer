import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { AuthService } from "src/app/core/modules/auth/services/auth.service";
import { RoutineUtilsService } from "../../services/routine-utils.service";
import { RoutineService } from "../../services/routine.service";

@Component({
  selector: "routine-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit, OnDestroy {
  private readonly routineUtils = inject(RoutineUtilsService);
  private readonly routine = inject(RoutineService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private subscription?: Subscription;
  isLoading = false;
  isSaving = false;

  readonly form = this.routineUtils.createForm();

  ngOnInit(){
    this.subscription = this.initAdminField();
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  private initAdminField(){
    return this.auth.$user.subscribe(user => {
      if(!user) return;
      this.form.controls["admin"].setValue(user.uid);
    });
  }

  private toggleForm(disabled: boolean){
    this.isSaving = disabled;
    const controlsName = Object.keys(this.form.controls);

    controlsName.forEach(controlName => {
      if(!disabled) this.form.controls[controlName].enable();
      else this.form.controls[controlName].disable();
    });
  }


  submit(){
    if(this.form.invalid) return;
    const value = this.form.value;

    this.toggleForm(true);
    this.routine.upload(value)
      .then(routineID => {
        this.form.markAsPristine();
        this.router.navigate(["routines", routineID, "edit"]);
      })
      .finally(() => this.toggleForm(false));
  }
}

import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";
import { Subscription } from "rxjs";

import { DateUtilsService } from "src/app/shared/services/date-utils.service";
import { AuthService } from "src/app/core/modules/auth/services/auth.service";
import { CustomerService } from "src/app/modules/customer/services/customer.service";
import { RoutineService } from "../../services/routine.service";
import { Router } from "@angular/router";

const levels = ["BAJA", "MEDIA", "INTENSA", "MUY INTENSA"];

@Component({
  selector: "routine-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit, OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly customer = inject(CustomerService);
  private readonly routine = inject(RoutineService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly dateUtils = inject(DateUtilsService);
  private subscription?: Subscription;
  isSaving = false;


  readonly levels = levels;
  readonly $customers = this.customer.$list;
  readonly form: FormGroup = this.formBuilder.group({
    admin: [null, [Validators.required]],
    days: [null, [Validators.required]],
    dateIN: [null, [Validators.required]],
    dateOUT: [null, [Validators.required]],
    customer: [null, [Validators.required]],
    level: [null, [Validators.required]],
    kal: [null, [Validators.required]],
    objective: [null, [Validators.required]]
  });

  get chips(){
    return this.dateUtils.getDays(this.form.controls["days"].value);
  }

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

  highlightSelected: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const ctrlValue = this.form.controls["days"].value;
    if(view !== "month" || !ctrlValue) return "";
    const date = cellDate.getDay();
    return ctrlValue.includes(date) ? "day_selected" : "";
  };

  onRemovedChip(indexRemoved: number){
    const ctrl = this.form.controls["days"];
    const value = ctrl.value.filter((_: number, i: number) => i !== indexRemoved);
    ctrl.setValue(value);
  }


  submit(){
    if(this.form.invalid) return;
    const value = this.form.value;

    this.toggleForm(true);
    this.routine.upload(value)
      .then(routineID => this.router.navigate(["routines", routineID, "edit"]))
      .finally(() => this.toggleForm(false));
  }
}

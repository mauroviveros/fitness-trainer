import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";
import { Subscription } from "rxjs";

import { CustomerService } from "src/app/modules/customer/services/customer.service";
import { RoutineService } from "../../services/routine.service";

import { Customer } from "src/app/shared/interfaces/customer";

@Component({
  selector: "routine-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnDestroy{
  private subscriptions: Subscription[] = [];
  customers: Customer[] = [];
  levels = [ "baja", "media", "intensa", "muy intensa" ];
  days = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
  daysChip: string[] = [];

  form: FormGroup = this.formBuilder.group({
    days: [null, [Validators.required]],
    dateIN: [null, [Validators.required]],
    dateOUT: [null, [Validators.required]],
    customer: [null, [Validators.required]],
    level: [null, [Validators.required]],
    kal: [null, [Validators.required]],
    objective: [null, [Validators.required]]
  });

  selectedDays: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const ctrl = this.form.get("days");
    if(view !== "month" || !ctrl) return "";
    
    const date = cellDate.getDay();
    return ctrl.value.includes(date) ? "selected_date" : "";
  };


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private routineService: RoutineService
  ){
    const subscriptionCustomers = this.customerService.customers.subscribe(customers => {
      this.customers = customers;
  
      const customerSelected = this.route.snapshot.queryParams["customer"];
      const exists = this.customers.some(customer => customer._id === customerSelected);

      if(exists){
        this.form.get("customer")?.setValue(customerSelected);
        this.form.get("customer")?.disable();
      }
    });

    this.subscriptions.push(subscriptionCustomers);

    const ctrlDays = this.form.get("days");
    if(!ctrlDays) return;
    const subscriptionChangesDays = ctrlDays.valueChanges.subscribe((days: number[]) => {
      this.daysChip = days.map(index => this.days[index]);
    });

    this.subscriptions.push(subscriptionChangesDays);
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
  
  removeChip(dayToRemove: number){
    const ctrl = this.form.get("days");
    if(!ctrl) return;

    const value = ctrl.value.filter((_: number, i: number) => i !== dayToRemove);
    ctrl.setValue(value);
  }
  

  submit(){
    if(this.form.invalid) return;
    const { customer, ...value } = this.form.getRawValue();
    this.routineService.create(value, customer).then(routineID => {
      this.router.navigate(["/routine", routineID, "update"]);
    });
  }
}

import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Subscription, combineLatest } from "rxjs";

import { CustomerService } from "../../services/customer.service";

import { UserDoc } from "src/app/shared/interfaces/user";
import { RoutineService } from "src/app/modules/routine/services/routine.service";
import { Routine } from "src/app/shared/interfaces/routine";

@Component({
  selector: "customer-list",
  templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit, OnDestroy {
  private readonly customer = inject(CustomerService);
  private readonly routine = inject(RoutineService);
  private subscription?: Subscription;
  list: UserDoc[] = [];
  routines: Routine[] = [];
  isLoading = true;

  ngOnInit(){
    this.subscription = this.initList();
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  hasRoutine(customerID : string){
    return !!this.routines.find(routine => routine.customer._id === customerID);
  }
  getRoutine(customerID : string){
    return this.routines.find(routine => routine.customer._id === customerID);
  }

  private initList(){
    return combineLatest([this.customer.$list, this.routine.$list]).subscribe(([list, routines]) => {
      this.isLoading = false;
      this.routines = routines;
      this.list = list;
    });
  }

  private formatDate(fecha?:Date){
    if(!fecha) return;
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`; 
  }
}
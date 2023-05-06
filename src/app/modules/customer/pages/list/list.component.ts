import { Component } from "@angular/core";
import { combineLatest, tap } from "rxjs";

import { UserDocument } from "src/app/modules/auth/interfaces/user";

import { CustomerService } from "../../services/customer.service";
import { RoutineService } from "src/app/modules/routine/services/routine.service";
import { Routine } from "src/app/shared/interfaces/routine";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent {
  isLoading = true;
  customers: UserDocument[] = [];

  constructor(
    private customerService: CustomerService,
    private routineService: RoutineService
  ){
    combineLatest([this.customerService.customers, this.routineService.getList()]).pipe(
      tap(() => this.isLoading = false)
    ).subscribe(response => {
      this.customers = response[0];
      this.customers = this.customers.map(customer => {
        const routine = response[1].filter(routine => {
          return routine["customer"].id === customer._id;
        })[0];

        customer.routine = routine as Routine;
        return customer;
      });
    });
  }
}

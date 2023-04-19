import { Component } from "@angular/core";
import { tap } from "rxjs";

import { UserDocument } from "src/app/modules/auth/interfaces/user";

import { CustomerService } from "../../services/customer.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent {
  isLoading = true;
  customers: UserDocument[] = [];

  constructor(
    private customerService: CustomerService
  ){
    this.customerService.customers.pipe(
      tap(() => this.isLoading = false)
    ).subscribe(customers => {
      this.customers = customers;
    });
  }
}

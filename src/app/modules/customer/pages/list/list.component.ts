import { Component } from "@angular/core";
import { CustomerService } from "../../services/customer.service";
import { UserDocument } from "src/app/modules/auth/interfaces/user";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent {
  customers: UserDocument[] = [];

  constructor(
    private customerService: CustomerService
  ){
    this.customerService.customers.subscribe(customers => {
      this.customers = customers;
    });
  }

}

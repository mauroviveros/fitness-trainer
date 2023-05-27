import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Subscription } from "rxjs";

import { CustomerService } from "../../services/customer.service";

import { UserDoc } from "src/app/shared/interfaces/user";

@Component({
  selector: "customer-list",
  templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit, OnDestroy {
  private readonly customer = inject(CustomerService);
  private subscription?: Subscription;
  list: UserDoc[] = [];
  isLoading = true;

  ngOnInit(){
    this.subscription = this.initList();
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  private initList(){
    return this.customer.$list.subscribe(list => {
      this.isLoading = false;
      this.list = list;
    });
  }
}
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { UserDoc } from "src/app/shared/interfaces/user";
import { CustomerService } from "../../services/customer.service";

@Component({
  selector: "customer-list",
  templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit, OnDestroy {
  private readonly customer = inject(CustomerService);
  private readonly subscriptions : Subscription[] = [];
  customers : UserDoc[] = [];

  isLoadingDM = true;
  isLoading = false;

  ngOnInit(){
    this.subscriptions.push(this.initList());
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initList(){
    return this.customer.$list.pipe(
      tap(() => this.isLoadingDM = false)
    ).subscribe(customers => this.customers = customers);
  }
}

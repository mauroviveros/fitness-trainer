import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Subscription, tap } from "rxjs";
import { UserDoc } from "src/app/shared/interfaces/user";
import { CustomerService } from "../../services/customer.service";
import { RoutineService } from "src/app/modules/routine/services/routine.service";
import { Routine } from "src/app/shared/interfaces/routine";

@Component({
  selector: "customer-list",
  templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit, OnDestroy {
  private readonly customer = inject(CustomerService);
  private readonly routine = inject(RoutineService);
  private readonly subscriptions : Subscription[] = [];
  customers : UserDoc[] = [];
  routines  : Routine[] = [];

  isLoadingDM = true;
  isLoading = false;

  ngOnInit(){
    this.subscriptions.push(this.initList());
    this.subscriptions.push(this.initRoutines());
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initList(){
    return this.customer.$list.pipe(
      tap(() => this.isLoadingDM = false)
    ).subscribe(customers => this.customers = customers);
  }
  private initRoutines(){
    return this.routine.$list.subscribe(routines => this.routines = routines);
  }

  getRoutines(customer: UserDoc){
    return this.routines.filter(routine => routine.customer.id === customer._id);
  }
}

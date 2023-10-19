import { Component, Input, OnChanges, OnDestroy, inject } from "@angular/core";
import { Subscription } from "rxjs";

import { UserService } from "src/app/core/modules/auth/services/user.service";
import { DateService } from "src/app/shared/services/date.service";

import { Routine } from "src/app/shared/interfaces/routine";
import { UserDoc } from "src/app/shared/interfaces/user";

@Component({
  selector: "routine-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"]
})
export class CustomerComponent implements OnChanges, OnDestroy {
  private readonly user = inject(UserService);
  private readonly date = inject(DateService);
  readonly subscriptions : Subscription[] = [];
  readonly getAge = this.date.getAge;
  @Input() routine!: Routine;
  customer?: UserDoc;

  ngOnChanges(){
    if(this.routine.customer) this.subscriptions[0] = this.user.doc(this.routine.customer).subscribe(customer => this.customer = customer);
  }
  ngOnDestroy(){ this.subscriptions.forEach(subscription => subscription.unsubscribe()); }

  getGender(value: number){ return this.user.getGender(value); }
}

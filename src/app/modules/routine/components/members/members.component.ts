import { Component, Input, OnChanges, OnDestroy, inject } from "@angular/core";
import { DocumentReference } from "@angular/fire/firestore";
import { Subscription } from "rxjs";

import { UserService } from "src/app/core/modules/auth/services/user.service";

import { UserDoc } from "src/app/shared/interfaces/user";

@Component({
  selector: "routine-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"]
})
export class MembersComponent implements OnChanges, OnDestroy {
  private readonly user = inject(UserService);
  readonly subscriptions : Subscription[] = [];
  @Input() customerRef? : DocumentReference;
  @Input() adminRef? : DocumentReference;
  admin?: UserDoc = {} as UserDoc;
  customer?: UserDoc;

  ngOnChanges(){
    if(this.adminRef) this.subscriptions[0] = this.user.doc(this.adminRef).subscribe(admin => this.admin = admin);
    if(this.customerRef) this.subscriptions[1] = this.user.doc(this.customerRef).subscribe(customer => this.customer = customer);
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

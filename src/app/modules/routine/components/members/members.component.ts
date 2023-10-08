import { Component, Input, OnDestroy, OnInit, inject } from "@angular/core";
import { DocumentReference } from "@angular/fire/firestore";
import { Subscription } from "rxjs";

import { UserService } from "src/app/core/modules/auth/services/user.service";

import { UserDoc } from "src/app/shared/interfaces/user";

@Component({
  selector: "routine-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"]
})
export class MembersComponent implements OnInit, OnDestroy {
  private readonly user = inject(UserService);
  readonly subscriptions : Subscription[] = [];
  @Input() customerRef? : DocumentReference;
  @Input() adminRef? : DocumentReference;
  customer: UserDoc = {} as UserDoc;
  admin: UserDoc = {} as UserDoc;

  ngOnInit(){
    if(this.adminRef) this.subscriptions.push(this.user.doc(this.adminRef).subscribe(admin => this.admin = admin));
    if(this.customerRef) this.subscriptions.push(this.user.doc(this.customerRef).subscribe(customer => this.customer = customer));
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

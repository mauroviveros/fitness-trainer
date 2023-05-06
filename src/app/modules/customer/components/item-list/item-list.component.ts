import { Component, Input } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";

import { UserDocument } from "src/app/modules/auth/interfaces/user";
import { ActionSheet } from "src/app/shared/interfaces/interface";

import { ActionsSheetComponent } from "../actions-sheet/actions-sheet.component";
import { Router } from "@angular/router";


@Component({
  selector: "customer-item-list",
  templateUrl: "./item-list.component.html"
})
export class ItemListComponent {
  routineStatus = { text: "", class: "" };
  @Input() customer?: UserDocument;

  constructor(
    private bottomSheet: MatBottomSheet,
    private router: Router
  ){}

  actions(event: Event){
    event.stopPropagation();
    const hide = { read: true, update: true, create: false, delete: true };
    if(this.customer?.routine){ hide.read = false; hide.update = false; hide.create = true; hide.delete = false; }
    this.bottomSheet.open(ActionsSheetComponent, { data: { hide } }).afterDismissed().subscribe((action: ActionSheet) => {
      switch(action){
      case "create": this.router.navigate(["routine", "create"], { queryParams: { customer: this.customer?._id } }); break;
      case "update": this.router.navigate(["routine", this.customer?.routine?._id, "update"]); break;
      case "read": this.router.navigate(["routine", this.customer?._id]); break;
      // case "delete":
      }
    });
  }
}

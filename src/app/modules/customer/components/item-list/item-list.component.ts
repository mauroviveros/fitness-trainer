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
  @Input() customer?: UserDocument;

  constructor(
    private bottomSheet: MatBottomSheet,
    private router: Router
  ){}

  actions(event: Event){
    event.stopPropagation();
    this.bottomSheet.open(ActionsSheetComponent).afterDismissed().subscribe((action: ActionSheet) => {
      switch(action){
      case "create": this.router.navigate(["routine", "create"], { queryParams: { customer: this.customer?._id } });
      // case "update":
      // case "read":
      // case "delete":
      }
    });
  }
}

import { Component, Input } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { UserDocument } from "src/app/modules/auth/interfaces/user";
import { ActionsSheetComponent } from "../actions-sheet/actions-sheet.component";

@Component({
  selector: "customer-item-list",
  templateUrl: "./item-list.component.html"
})
export class ItemListComponent {
  @Input() customer?: UserDocument;

  constructor(
    private bottomSheet: MatBottomSheet
  ){}

  actions(event: Event){
    event.stopPropagation();
    this.bottomSheet.open(ActionsSheetComponent).afterDismissed().subscribe((action: string) => {
      console.log(action);
    });
  }
}

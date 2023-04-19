import { Component, Input } from "@angular/core";
import { UserDocument } from "src/app/modules/auth/interfaces/user";

@Component({
  selector: "customer-item-list",
  templateUrl: "./item-list.component.html"
})
export class ItemListComponent {
  @Input() customer?: UserDocument;


  test(event: Event){
    event.stopPropagation();
    console.log("click");
  }
}

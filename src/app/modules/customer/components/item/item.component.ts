import { Component, Input } from "@angular/core";

import { UserDoc } from "src/app/shared/interfaces/user";

@Component({
  selector: "customer-item",
  templateUrl: "./item.component.html"
})
export class ItemComponent {
  @Input() customer!: UserDoc;
}

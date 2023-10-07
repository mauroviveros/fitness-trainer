import { NgModule } from "@angular/core";

import { CustomerRoutingModule } from "./customer.routing";
import { SharedModule } from "src/app/shared/shared.module";
import { ListComponent } from "./pages/list/list.component";
import { ItemComponent } from "./components/item/item.component";


@NgModule({
  declarations: [
    ListComponent,
    ItemComponent
  ],
  imports: [
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }

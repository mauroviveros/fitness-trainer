import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomerRoutingModule } from "./customer.routing";
import { ListComponent } from "./pages/list/list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ItemListComponent } from "./components/item-list/item-list.component";


@NgModule({
  declarations: [
    ListComponent,
    ItemListComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
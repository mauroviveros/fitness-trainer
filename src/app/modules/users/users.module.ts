import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users.routing";
import { SharedModule } from "../../shared/shared.module";

import { ListComponent } from "./pages/list/list.component";
import { DetailComponent } from "./pages/detail/detail.component";


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { RoutinesRoutingModule } from "./routines.routing";

import { DetailComponent } from "./pages/detail/detail.component";


@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    RoutinesRoutingModule,
    SharedModule
  ]
})
export class RoutinesModule { }

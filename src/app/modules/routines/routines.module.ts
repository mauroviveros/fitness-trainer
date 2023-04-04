import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { RoutinesRoutingModule } from "./routines.routing";

import { DetailComponent } from "./pages/detail/detail.component";
import { BottomSheetComponent } from "./components/bottom-sheet/bottom-sheet.component";


@NgModule({
  declarations: [
    DetailComponent,
    BottomSheetComponent
  ],
  imports: [
    CommonModule,
    RoutinesRoutingModule,
    SharedModule
  ]
})
export class RoutinesModule { }

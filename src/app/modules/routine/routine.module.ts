import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { RoutineRoutingModule } from "./routine.routing";

import { DetailDialogComponent } from "./components/detail-dialog/detail-dialog.component";
import { MembersComponent } from "./components/members/members.component";
import { DetailComponent } from "./pages/detail/detail.component";
import { InformationComponent } from "./components/information/information.component";



@NgModule({
  declarations: [
    DetailDialogComponent,
    MembersComponent,
    DetailComponent,
    InformationComponent
  ],
  imports: [
    RoutineRoutingModule,
    SharedModule
  ]
})
export class RoutineModule { }

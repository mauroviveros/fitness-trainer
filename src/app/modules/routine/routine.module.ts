import { NgModule } from "@angular/core";

import { RoutineRoutingModule } from "./routine.routing";
import { SharedModule } from "src/app/shared/shared.module";

import { ListComponent } from "./pages/list/list.component";
import { CreateComponent } from "./pages/create/create.component";
import { UpdateComponent } from "./pages/update/update.component";


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    RoutineRoutingModule,
    SharedModule
  ]
})
export class RoutineModule { }

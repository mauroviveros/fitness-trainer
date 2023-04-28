import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoutineRoutingModule } from "./routine.routing";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";

import { CreateComponent } from "./pages/create/create.component";
import { UpdateComponent } from "./pages/update/update.component";


@NgModule({
  declarations: [
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    RoutineRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RoutineModule { }

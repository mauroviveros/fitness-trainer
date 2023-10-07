import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ExerciseRoutingModule } from "./exercise.routing";

import { ListComponent } from "./pages/list/list.component";
import { ItemComponent } from "./components/item/item.component";
import { DetailComponent } from "./components/detail/detail.component";



@NgModule({
  declarations: [
    ListComponent,
    ItemComponent,
    DetailComponent
  ],
  imports: [
    ExerciseRoutingModule,
    SharedModule
  ]
})
export class ExerciseModule { }

import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";
import { ExerciseRoutingModule } from "./exercise.routing";

import { ItemListComponent } from "./components/item-list/item-list.component";
import { ListComponent } from "./pages/list/list.component";
import { DetailComponent } from "./pages/detail/detail.component";


@NgModule({
  declarations: [
    ItemListComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
    ExerciseRoutingModule,
    SharedModule
  ]
})
export class ExerciseModule { }

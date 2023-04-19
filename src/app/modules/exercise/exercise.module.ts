import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ExerciseRoutingModule } from "./exercise.routing";
import { SharedModule } from "src/app/shared/shared.module";

import { ListComponent } from "./pages/list/list.component";
import { DetailDialogComponent } from "./components/detail-dialog/detail-dialog.component";
import { ActionsSheetComponent } from "./components/actions-sheet/actions-sheet.component";
import { ItemListComponent } from "./components/item-list/item-list.component";


@NgModule({
  declarations: [
    ListComponent,
    DetailDialogComponent,
    ActionsSheetComponent,
    ItemListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExerciseRoutingModule,
    SharedModule
  ]
})
export class ExerciseModule { }

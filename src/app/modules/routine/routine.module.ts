import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoutineRoutingModule } from "./routine.routing";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";

import { CreateComponent } from "./pages/create/create.component";
import { UpdateComponent } from "./pages/update/update.component";
import { DetailComponent } from "./pages/detail/detail.component";
import { AddExerciseDialogComponent } from "./components/add-exercise-dialog/add-exercise-dialog.component";
import { DetailExerciseBottomSheetComponent } from "./components/detail-exercise-bottom-sheet/detail-exercise-bottom-sheet.component";
import { DetailDialogComponent } from "./components/detail-dialog/detail-dialog.component";
import { CompleteExerciseDialogComponent } from "./components/complete-exercise-dialog/complete-exercise-dialog.component";


@NgModule({
  declarations: [
    CreateComponent,
    UpdateComponent,
    AddExerciseDialogComponent,
    DetailExerciseBottomSheetComponent,
    DetailComponent,
    DetailDialogComponent,
    CompleteExerciseDialogComponent
  ],
  imports: [
    CommonModule,
    RoutineRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RoutineModule { }

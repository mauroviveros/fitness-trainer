import { NgModule } from "@angular/core";

import { RoutineRoutingModule } from "./routine.routing";
import { SharedModule } from "src/app/shared/shared.module";

import { ListComponent } from "./pages/list/list.component";
import { CreateComponent } from "./pages/create/create.component";
import { DetailComponent } from "./pages/detail/detail.component";
import { DetailFormComponent } from "./components/detail-form/detail-form.component";
import { ExercisesComponent } from "./components/exercises/exercises.component";
import { ExerciseDialogComponent } from "./components/exercise-dialog/exercise-dialog.component";
import { WeekDayComponent } from "./components/week-day/week-day.component";
import { ExerciseBottomSheetComponent } from "./components/exercise-bottom-sheet/exercise-bottom-sheet.component";


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    DetailComponent,
    DetailFormComponent,
    ExercisesComponent,
    ExerciseDialogComponent,
    WeekDayComponent,
    ExerciseBottomSheetComponent
  ],
  imports: [
    RoutineRoutingModule,
    SharedModule
  ]
})
export class RoutineModule { }

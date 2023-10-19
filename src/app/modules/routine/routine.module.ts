import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { RoutineRoutingModule } from "./routine.routing";

import { DetailDialogComponent } from "./components/detail-dialog/detail-dialog.component";
import { MembersComponent } from "./components/members/members.component";
import { DetailComponent } from "./pages/detail/detail.component";
import { InformationComponent } from "./components/information/information.component";
import { CustomerComponent } from "./components/customer/customer.component";
import { ExercisesComponent } from "./components/exercises/exercises.component";
import { ExerciseDialogComponent } from "./components/exercise-dialog/exercise-dialog.component";
import { WeekDayComponent } from "./components/week-day/week-day.component";
import { ExerciseComponent } from "./components/exercise/exercise.component";



@NgModule({
  declarations: [
    DetailDialogComponent,
    MembersComponent,
    DetailComponent,
    InformationComponent,
    CustomerComponent,
    ExercisesComponent,
    ExerciseDialogComponent,
    WeekDayComponent,
    ExerciseComponent
  ],
  imports: [
    RoutineRoutingModule,
    SharedModule
  ]
})
export class RoutineModule { }

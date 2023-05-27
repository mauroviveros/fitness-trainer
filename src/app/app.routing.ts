import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthRoutingModule } from "./core/modules/auth/auth.routing";
import { CoreRoutingModule } from "./core/core.routing";

const routes: Routes = [
  {
    path: "exercises",
    loadChildren: () => import("./modules/exercise/exercise.module").then(m => m.ExerciseModule)
  },
  {
    path: "customers",
    loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule)
  },
  {
    path: "routines",
    loadChildren: () => import("./modules/routine/routine.module").then(m => m.RoutineModule)
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [
    AuthRoutingModule,
    CoreRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

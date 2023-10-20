import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreRoutingModule } from "./core/core.routing";
import { AuthRoutingModule } from "./core/modules/auth/auth.routing";
import { AdminGuard } from "./core/modules/auth/guards/admin.guard";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "exercises",
        canActivate: [AdminGuard],
        loadChildren: () => import("./modules/exercise/exercise.module").then(m => m.ExerciseModule)
        // loadChildren: () => ExerciseRoutingModule
      },
      {
        path: "customers",
        canActivate: [AdminGuard],
        loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule)
      },
      {
        path: "routine",
        loadChildren: () => import("./modules/routine/routine.module").then(m => m.RoutineModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    CoreRoutingModule,
    AuthRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreRoutingModule } from "./core/core.routing";
import { AuthRoutingModule } from "./core/modules/auth/auth.routing";

const routes: Routes = [
  {
    path: "exercises",
    loadChildren: () => import("./modules/exercise/exercise.module").then(m => m.ExerciseModule)
    // loadChildren: () => ExerciseRoutingModule
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

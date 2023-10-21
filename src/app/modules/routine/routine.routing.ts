import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailComponent } from "./pages/detail/detail.component";
import { AdminGuard } from "src/app/core/modules/auth/guards/admin.guard";

const routes: Routes = [

  {
    path: "",
    title: "Fitness - Trainer | Mi Rutina",
    component: DetailComponent
  },
  {
    path: ":_id",
    title: "Fitness - Trainer | Administrar Rutina",
    canActivate: [AdminGuard],
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutineRoutingModule { }

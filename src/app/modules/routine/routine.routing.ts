import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CreateComponent } from "./pages/create/create.component";
import { UpdateComponent } from "./pages/update/update.component";
import { DetailComponent } from "./pages/detail/detail.component";
import { AdminGuard } from "../auth/guards/admin.guard";

const routes: Routes = [
  {
    path: "routine",
    children: [
      {
        path: "",
        component: DetailComponent
      },
      {
        path: "create",
        canActivate: [AdminGuard],
        component: CreateComponent
      },
      {
        path: ":_id",
        canActivate: [AdminGuard],
        component: DetailComponent
      },
      {
        path: ":_id/update",
        canActivate: [AdminGuard],
        component: UpdateComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutineRoutingModule { }

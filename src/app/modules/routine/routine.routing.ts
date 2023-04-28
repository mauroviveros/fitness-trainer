import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CreateComponent } from "./pages/create/create.component";
import { UpdateComponent } from "./pages/update/update.component";

const routes: Routes = [
  {
    path: "routine",
    children: [
      {
        path: "create",
        component: CreateComponent
      },
      {
        path: ":_id",
        component: UpdateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutineRoutingModule { }

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateComponent } from "./pages/create/create.component";
import { DetailComponent } from "./pages/detail/detail.component";
import { FormGuard } from "src/app/shared/guards/form.guard";

const routes: Routes = [
  {
    path: "routines",
    children: [
      {
        path: "create",
        title: "Fitness - Trainer | Crear Rutina",
        component: CreateComponent,
        canDeactivate: [FormGuard],
        data: {
          layout: {
            title: "Crear rutina",
            close: true,
            actions: [
              { _id: "save", icon: "save", type: "submit" }
            ]
          }
        }
      },
      {
        path: ":_id",
        title: "Fitness - Trainer | Actualizar Rutina",
        component: DetailComponent,
        data: {
          layout: {
            title: "Actualizar Rutina",
            back: true
          }
        }
      }
    ]
  },
  {
    path: "routine",
    title: "Fitness - Trainer | Mi Rutina",
    component: DetailComponent,
    data: {
      canComplete: true,
      layout: {
        title: "Mi Rutina",
        back: true,
        actions: []
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutineRoutingModule { }

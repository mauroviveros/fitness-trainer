import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./pages/list/list.component";
import { CreateComponent } from "./pages/create/create.component";
import { DetailComponent } from "./pages/detail/detail.component";
import { FormGuard } from "src/app/shared/guards/form.guard";

const routes: Routes = [
  {
    path: "",
    title: "Fitness - Trainer | Rutinas Listado",
    component: ListComponent,
    data: {
      layout: {
        title: "Listado Rutinas"
      }
    }
  },
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
    title: "Fitness - Trainer | Detalle Rutina",
    component: DetailComponent,
    data: {
      canComplete: true,
      layout: {
        title: "Detalle Rutina",
        back: true,
        actions: []
      }
    }
  },
  {
    path: ":_id/edit",
    title: "Fitness - Trainer | Actualizar Rutina",
    component: DetailComponent,
    data: {
      layout: {
        title: "Actualizar Rutina",
        close: true
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutineRoutingModule { }

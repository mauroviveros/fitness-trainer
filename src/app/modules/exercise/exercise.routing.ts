import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ListComponent } from "./pages/list/list.component";
import { DetailComponent } from "./pages/detail/detail.component";

const routes: Routes = [
  {
    path: "",
    title: "Fitness - Trainer | Ejercicios Listado",
    component: ListComponent,
    data: {
      layout: {
        title: "Listado Ejercicios"
      }
    }
  },
  {
    path: "create",
    title: "Fitness - Trainer | Crear Ejercicio",
    component: DetailComponent,
    data: {
      layout: {
        title: "Crear ejercicio",
        close: true,
        actions: [
          { _id: "save", icon: "save", type: "submit" }
        ]
      }
    }
  },
  {
    path: ":_id",
    title: "Fitness - Trainer | Detalle Ejercicio",
    component: DetailComponent,
    data: {
      layout: {
        title: "Detalle ejercicio",
        back: true,
        actions: [
          { _id: "edit", icon: "edit" }
        ]
      }
    }
  },
  {
    path: ":_id/edit",
    title: "Fitness - Trainer | Editar Ejercicio",
    component: DetailComponent,
    data: {
      layout: {
        title: "Detalle ejercicio",
        close: true,
        actions: [
          { _id: "save", icon: "save", type: "submit" }
        ]
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }

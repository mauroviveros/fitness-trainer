import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

import { EmailGuard } from "./modules/auth/guards/email.guard";
import { UserGuard } from "./modules/auth/guards/user.guard";
import { FormGuard } from "../shared/guards/form.guard";

import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";


const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard, EmailGuard, UserGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(["login"]) },
    children: [
      {
        path: "",
        title: "Fitness - Trainer | Inicio",
        component: HomeComponent
      },
      {
        path: "profile",
        title: "Fitness - Trainer | Perfil",
        component: ProfileComponent,
        canDeactivate: [FormGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

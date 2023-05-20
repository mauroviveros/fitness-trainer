import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

import { FormGuard } from "../shared/guards/form.guard";
import { EmailGuard } from "./modules/auth/guards/email.guard";
import { UserGuard } from "./modules/auth/guards/user.guard";

import { ProfileResolver } from "./resolvers/profile.resolver";

import { LayoutComponent } from "./components/layout/layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard, EmailGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(["login"]) },
    children: [
      {
        path: "",
        title: "Fitness - Trainer | Inicio",
        canActivate: [UserGuard],
        component: HomeComponent
      },
      {
        path: "profile",
        title: "Fitness - Trainer | Perfil",
        canDeactivate: [FormGuard],
        resolve: {
          userData: ProfileResolver
        },
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

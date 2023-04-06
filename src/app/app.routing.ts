import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from "@angular/fire/auth-guard";

import { HomeComponent } from "./core/pages/home/home.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
const redirectAuthorizedToHome = () => redirectLoggedInTo([""]);

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "rutina",
        loadChildren: () => import("./modules/routines/routines.module").then(m => m.RoutinesModule)
      },
      {
        path: "users",
        loadChildren: () => import("./modules/users/users.module").then(m => m.UsersModule)
      }
    ]
  },
  {
    path: "",
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectAuthorizedToHome },
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

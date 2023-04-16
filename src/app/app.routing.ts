import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard as FireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

import { HomeComponent } from "./core/pages/home/home.component";
import { EmailGuard } from "./modules/auth/guards/email.guard";

const redirectUnauthorized = () => redirectUnauthorizedTo(["login"]);
const redirectAuthorized = () => redirectLoggedInTo([""]);

const routes: Routes = [
  {
    path: "",
    canActivate: [FireAuthGuard, EmailGuard],
    data: { authGuardPipe: redirectUnauthorized },
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      // {
      //   path: "rutina",
      //   loadChildren: () => import("./modules/routines/routines.module").then(m => m.RoutinesModule)
      // },
      // {
      //   path: "users",
      //   loadChildren: () => import("./modules/users/users.module").then(m => m.UsersModule)
      // }
    ]
  },
  {
    path: "",
    canActivate: [FireAuthGuard],
    data: { authGuardPipe: redirectAuthorized },
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

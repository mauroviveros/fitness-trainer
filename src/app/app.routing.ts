import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard as FireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

import { EmailGuard } from "./modules/auth/guards/email.guard";
import { UserGuard } from "./modules/auth/guards/user.guard";

import { HomeComponent } from "./core/pages/home/home.component";
import { ProfileComponent } from "./core/pages/profile/profile.component";

const redirectUnauthorized = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  {
    path: "",
    canActivate: [FireAuthGuard, EmailGuard],
    data: { authGuardPipe: redirectUnauthorized },
    children: [
      { path: "profile", component: ProfileComponent },
      {
        path: "",
        canActivate: [UserGuard],
        children: [
          { path: "", component: HomeComponent, },
          // {
          //   path: "rutina",
          //   loadChildren: () => import("./modules/routines/routines.module").then(m => m.RoutinesModule)
          // },
          // {
          //   path: "users",
          //   loadChildren: () => import("./modules/users/users.module").then(m => m.UsersModule)
          // }
        ]
      }

    ]
  },
  {
    path: "",
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

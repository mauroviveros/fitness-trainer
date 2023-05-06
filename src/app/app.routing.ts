import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard as FireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

import { EmailGuard } from "./modules/auth/guards/email.guard";
import { AdminGuard } from "./modules/auth/guards/admin.guard";
import { UserGuard } from "./modules/auth/guards/user.guard";

import { HomeComponent } from "./core/pages/home/home.component";
import { ProfileComponent } from "./core/pages/profile/profile.component";
import { TokenGuard } from "./modules/auth/guards/token.guard";

const redirectUnauthorized = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  {
    path: "",
    canActivate: [FireAuthGuard, EmailGuard],
    data: { authGuardPipe: redirectUnauthorized },
    children: [
      {
        path: "",
        canActivate: [UserGuard, TokenGuard],
        children: [
          {
            path: "",
            component: HomeComponent
          },
          {
            path: "customers",
            canActivate: [AdminGuard],
            loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule)
          },
          {
            path: "exercises",
            canActivate: [AdminGuard],
            loadChildren: () => import("./modules/exercise/exercise.module").then(m => m.ExerciseModule)
          },
          {
            path: "",
            loadChildren: () => import("./modules/routine/routine.module").then(m => m.RoutineModule)
          }
        ]
      },
      { path: "profile", component: ProfileComponent }
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

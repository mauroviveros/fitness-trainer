import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard as FireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

import { EmailGuard } from "./modules/auth/guards/email.guard";
import { AdminGuard } from "./modules/auth/guards/admin.guard";

import { HomeComponent } from "./core/pages/home/home.component";
import { ProfileComponent } from "./core/pages/profile/profile.component";

const redirectUnauthorized = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  {
    path: "",
    canActivate: [FireAuthGuard, EmailGuard],
    data: { authGuardPipe: redirectUnauthorized },
    children: [
      { path: "", component: HomeComponent, },
      { path: "profile", component: ProfileComponent },
      {
        path: "clientes",
        canActivate: [AdminGuard],
        loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule)
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

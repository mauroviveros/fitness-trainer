import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/compat/auth-guard";

import { HomeComponent } from "./pages/home/home.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
const redirectAuthorizedToHome = () => redirectLoggedInTo([""]);

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: "login",
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectAuthorizedToHome },
    loadChildren: () =>
      import("./modules/auth/auth.module").then(m => m.AuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

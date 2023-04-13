import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard as FireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";


import { LoginComponent } from "./pages/login/login.component";
import { UnverifiedComponent } from "./pages/unverified/unverified.component";
import { AuthGuard } from "./guards/auth.guard";

const redirectAuthorizedToHome = () => redirectLoggedInTo([""]);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);

const routes: Routes = [
  {
    path: "login",
    canActivate: [FireAuthGuard],
    data: { authGuardPipe: redirectAuthorizedToHome },
    component: LoginComponent,

  },
  {
    path: "unverified",
    canActivate: [FireAuthGuard, AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: UnverifiedComponent
  },
  { path: "**", redirectTo: "login" }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

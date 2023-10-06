import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard, redirectLoggedInTo } from "@angular/fire/auth-guard";

import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { WrapperComponent } from "./components/wrapper/wrapper.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: WrapperComponent,
    data: { authGuardPipe: () => redirectLoggedInTo([""]), },
    children: [

      {
        path: "login",
        title: "Fitness - Trainer | Identifícate",
        component: LoginComponent,
        data: {
          layout: {
            title: "Iniciar sesión",
            footer: {
              label: "¿No tienes cuenta?",
              button: "Registrate aqui",
              link: "register"
            }
          }
        }
    
      },
      {
        path: "register",
        title: "Fitness - Trainer | Crea tu cuenta",
        component: RegisterComponent,
        data: {
          layout: {
            title: "Registro",
            footer: {
              label: "¿Ya tienes cuenta?",
              button: "Ingresa aqui",
              link: "login"
            }
          }
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

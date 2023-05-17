import { NgModule } from "@angular/core";

import { AuthRoutingModule } from "./auth.routing";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from "./pages/login/login.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { SharedModule } from "src/app/shared/shared.module";
import { PasswordFormFieldComponent } from "./components/password-form-field/password-form-field.component";


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    LayoutComponent,
    PasswordFormFieldComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }

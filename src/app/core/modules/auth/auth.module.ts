import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";

import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

import { WrapperComponent } from "./components/wrapper/wrapper.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { PasswordFormFieldComponent } from "./components/password-form-field/password-form-field.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    PasswordFormFieldComponent,
    WrapperComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AuthModule { }

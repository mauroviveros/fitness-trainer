import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth.routing";
import { SharedModule } from "../../shared/shared.module";

import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { WrapperComponent } from "./components/wrapper/wrapper.component";
import { UnauthorizedComponent } from "./components/unauthorized/unauthorized.component";
import { TokenValidatorComponent } from "./pages/token-validator/token-validator.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    WrapperComponent,
    UnauthorizedComponent,
    TokenValidatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule {}

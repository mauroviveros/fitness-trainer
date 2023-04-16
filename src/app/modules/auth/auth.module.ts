import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth.routing";
import { SharedModule } from "../../shared/shared.module";

import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { WrapperComponent } from "./components/wrapper/wrapper.component";
import { UnauthorizedComponent } from "./components/unauthorized/unauthorized.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    WrapperComponent,
    UnauthorizedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule {}

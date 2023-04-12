import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth.routing";
import { SharedModule } from "../../shared/shared.module";

import { LoginComponent } from "./pages/login/login.component";
import { UnverifiedComponent } from "./pages/unverified/unverified.component";

@NgModule({
  declarations: [
    LoginComponent,
    UnverifiedComponent
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

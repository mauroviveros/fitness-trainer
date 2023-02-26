import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth.routing";
import { MaterialModule } from "../material.module";

import { LoginComponent } from "./pages/login/login.component";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule
  ]
})
export class AuthModule {}

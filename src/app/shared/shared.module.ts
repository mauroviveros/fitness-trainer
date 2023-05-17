import { NgModule } from "@angular/core";
import { MaterialModule } from "./modules/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ErrorPipe } from "./pipes/error.pipe";
import { CommonModule } from "@angular/common";

import { DialogComponent } from "./component/dialog/dialog.component";

@NgModule({
  declarations: [
    ErrorPipe,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ErrorPipe
  ]
})
export class SharedModule { }

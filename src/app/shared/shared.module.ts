import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "./modules/material.module";

import { ErrorPipe } from "./pipes/error.pipe";

import { DialogComponent } from "./components/dialog/dialog.component";
import { VideoDialogComponent } from "./components/video-dialog/video-dialog.component";
import { LayoutComponent } from "./components/layout/layout.component";

@NgModule({
  declarations: [
    ErrorPipe,
    DialogComponent,
    VideoDialogComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    ErrorPipe,
    LayoutComponent
  ]
})
export class SharedModule { }

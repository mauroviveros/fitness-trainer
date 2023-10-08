import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./modules/material.module";

import { ErrorPipe } from "./pipes/error.pipe";
import { UserPipe } from "./pipes/user.pipe";

import { DialogComponent } from "./components/dialog/dialog.component";
import { VideoDialogComponent } from "./components/video-dialog/video-dialog.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { ActionsComponent } from "./components/actions/actions.component";
import { ActionsSheetComponent } from "./components/actions-sheet/actions-sheet.component";
import { EmptyBannerComponent } from "./components/empty-banner/empty-banner.component";

@NgModule({
  declarations: [
    DialogComponent,
    VideoDialogComponent,
    LayoutComponent,
    ActionsComponent,
    ActionsSheetComponent,
    EmptyBannerComponent,
    ErrorPipe,
    UserPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    DialogComponent,
    LayoutComponent,
    ActionsComponent,
    EmptyBannerComponent,
    ErrorPipe,
    UserPipe
  ]
})
export class SharedModule { }

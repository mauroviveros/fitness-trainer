import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorPipe } from './pipes/error.pipe';

@NgModule({
  imports: [ErrorPipe],
  exports: [MaterialModule, ReactiveFormsModule, RouterModule, ErrorPipe],
})
export class SharedModule {}

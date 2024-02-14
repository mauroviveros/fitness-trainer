import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  exports: [MaterialModule, ReactiveFormsModule, RouterModule],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WrapperComponent, InputPasswordComponent],
  imports: [SharedModule],
  exports: [WrapperComponent, InputPasswordComponent],
})
export class AuthModule {}

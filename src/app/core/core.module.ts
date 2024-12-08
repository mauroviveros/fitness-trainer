import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { WrapperComponent } from './components/wrapper/wrapper.component';

@NgModule({
  declarations: [WrapperComponent],
  imports: [SharedModule],
  exports: [WrapperComponent],
})
export class CoreModule {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'auth-wrapper',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthWrapperComponent {}

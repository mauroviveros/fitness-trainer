import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';

const MATERIAL_MODULES = [MatCardModule];

@Component({
  selector: 'auth-login',
  imports: [MATERIAL_MODULES, SignInFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
];

@Component({
  selector: 'auth-sign-in-form',
  imports: [MATERIAL_MODULES],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInFormComponent {}

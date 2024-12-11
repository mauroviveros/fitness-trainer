import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthWrapperComponent } from '@auth/auth.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ErrorPipe } from '@pipes/error.pipe';
import { AuthService } from '@auth/auth.service';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
];

@Component({
  selector: 'auth-login',
  imports: [
    MATERIAL_MODULES,
    ReactiveFormsModule,
    RouterLink,
    AuthWrapperComponent,
    ErrorPipe
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly auth = inject(AuthService);

  readonly form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  submit() {
    const { email, password } = this.form.value;
    if (this.form.invalid) return;
    if (!email || !password) return;

    this.auth.signIn(email, password);
  }
}

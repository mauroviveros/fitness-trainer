import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth/auth.service';
import { AuthWrapperComponent } from '@auth/auth.component';
import { ErrorPipe } from '@pipes/error.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule
];

@Component({
  selector: 'auth-login',
  imports: [MATERIAL_MODULES, ReactiveFormsModule, RouterLink, AuthWrapperComponent, ErrorPipe],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  readonly isLoading = signal(false);

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

    this.isLoading.set(true);
    this.auth.signIn(email, password).finally(() => {
      this.isLoading.set(false);
    });
  }
}

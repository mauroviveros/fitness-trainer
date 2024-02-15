import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';

import { SharedModule } from '../../../shared/shared.module';
import { AuthModule } from '../../auth.module';

import { UtilsService } from '../../../shared/services/utils.service';
import { MessageService } from '../../../shared/services/message.service';

interface FormType {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [SharedModule, AuthModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly utils = inject(UtilsService);
  private readonly message = inject(MessageService);
  inProgress: boolean = false;

  readonly form: FormGroup<FormType> = this.fb.group<FormType>({
    email: this.fb.control(null, [Validators.required, Validators.email]),
    password: this.fb.control(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submit() {
    this.inProgress = true;
    this.utils
      .simulateHTTP()
      .pipe(
        tap(() => (this.inProgress = false)),
        tap(() => console.log(this.form.value))
      )
      .subscribe(() => {
        this.message.success('Sesión iniciada correctamente');
      });
  }
}

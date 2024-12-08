import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
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
  password_confirm: FormControl<string | null>;
}

@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [SharedModule, AuthModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly utils = inject(UtilsService);
  private readonly message = inject(MessageService);
  inProgress: boolean = false;

  readonly form: FormGroup<FormType> = this.fb.group<FormType>(
    {
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      password_confirm: this.fb.control(null, [Validators.required]),
    },
    {
      validators: [
        this.matchValidator('password', 'password_confirm', 'confirmPassword'),
      ],
    }
  );

  matchValidator(from: string, to: string, error: string): ValidatorFn {
    return (form: AbstractControl) => {
      const fromControl = form.get(from);
      const toControl = form.get(to);

      const validatorError: ValidationErrors | null =
        fromControl?.value === toControl?.value ? null : { [error]: true };

      if (!toControl?.errors || toControl.errors[error]) {
        toControl?.setErrors(validatorError);
      }
      return validatorError;
    };
  }

  submit() {
    this.inProgress = true;
    this.utils
      .simulateHTTP()
      .pipe(
        tap(() => (this.inProgress = false)),
        tap(() => console.log(this.form.value))
      )
      .subscribe(() => {
        this.message.success('Usuario creado correctamente');
      });
  }
}

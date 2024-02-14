import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { WrapperComponent } from '../../components/wrapper/wrapper.component';

interface FormType {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [SharedModule, WrapperComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);

  readonly form: FormGroup<FormType> = this.fb.group<FormType>({
    email: this.fb.control(null, [Validators.required, Validators.email]),
    password: this.fb.control(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submit() {
    console.log(this.form.value);
  }
}

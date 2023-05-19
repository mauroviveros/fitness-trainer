import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "auth-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  isLoading = false;

  form: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  });

  submit(form: FormGroupDirective){
    if(this.form.invalid) return;

    this.isLoading = true;
    const { email, password } = this.form.value;
    this.auth.login(email, password)
      .then(() => form.resetForm())
      .finally(() => this.isLoading = false);
  }
}

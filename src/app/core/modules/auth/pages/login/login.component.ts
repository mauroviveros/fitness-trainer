import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "auth-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent {
  private readonly router       = inject(Router);
  private readonly formBuilder  = inject(FormBuilder);
  private readonly auth         = inject(AuthService);
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
      .then(() => this.router.navigate([""]))
      .finally(() => this.isLoading = false);
  }
}

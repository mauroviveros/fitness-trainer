import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "auth-register",
  templateUrl: "./register.component.html"
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  isLoading = false;

  form: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    password_confirm: [null, [Validators.required]]
  }, {
    validators: () => {
      if(!this.form) return null;
      const ctrl = this.form.controls["password"];
      const matchCtrl = this.form.controls["password_confirm"];

      if(matchCtrl.errors && !matchCtrl.errors["confirmPassword"]) return null;
      if(ctrl.value === matchCtrl.value) matchCtrl.setErrors(null);
      else matchCtrl.setErrors({ confirmPassword: true });
      return null;
    }
  });

  submit(form:FormGroupDirective){
    if(this.form.invalid) return;

    this.isLoading = true;
    const { email, password } = this.form.value;
    this.auth.register(email, password)
      .then(() => form.resetForm())
      .finally(() => this.isLoading = false);
  }
}

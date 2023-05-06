import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";


const confirmPassword = (ctrlName: string, matchCtrlName: string) => {
  return (formGroup: FormGroup) => {
    const ctrl = formGroup.controls[ctrlName];
    const matchCtrl = formGroup.controls[matchCtrlName];

    if (matchCtrl.errors && !matchCtrl.errors["confirmPassword"]) return;

    if (ctrl.value === matchCtrl.value) matchCtrl.setErrors(null);
    else matchCtrl.setErrors({ confirmPassword: true });
  };
};

@Component({
  selector: "auth-register",
  templateUrl: "./register.component.html"
})
export class RegisterComponent {
  isLoading = false;
  visibility: boolean[] = [false, false];
  visibilityIcon(i: number){ return this.visibility[i] ? "visibility_off" : "visibility"; }
  visibilityType(i: number){ return this.visibility[i] ? "text" : "password"; }
  visibilityToggle(i: number, event: Event){
    event.stopPropagation();
    this.visibility[i] = !this.visibility[i];
  }

  form: FormGroup = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
    password_confirm: ["", [Validators.required]]
  },{
    validator: confirmPassword("password", "password_confirm")
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ){}

  public submit(){
    if(this.form.invalid) return;
    const { email, password } = this.form.value;

    this.isLoading = true;
    this.auth.register(email, password)
      .finally(() => this.isLoading = false)
      .then(() => this.router.navigate([""]));
  }
}

import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "auth-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent{
  public isLoading = false;
  public visibility = false;
  public visibilityIcon(){ return this.visibility ? "visibility_off" : "visibility"; }
  public visibilityType(){ return this.visibility ? "text" : "password"; }

  public form = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ){}

  submit(){
    if(this.form.invalid) return;
    const { email, password } = this.form.value as { email: string, password: string };

    this.isLoading = true;
    this.auth.login(email, password)
      .finally(() => this.isLoading = false)
      .then(() => this.router.navigate([""]));
  }
}

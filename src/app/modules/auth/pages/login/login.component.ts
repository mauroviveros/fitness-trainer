import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { finalize } from "rxjs";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "auth-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent{
  public show_password = false;
  public isLoading = false;


  public visibility = false;
  public visibilityIcon(){
    return this.visibility ? "visibility_off" : "visibility";
  }
  public visibilityType(){
    return this.visibility ? "text" : "password";
  }

  public form = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ){}

  submit(){
    if(this.form.invalid) return;

    this.isLoading = true;
    const { email, password } = this.form.value as { email: string, password: string };

    this.auth.login(email, password).then(()=>{
      this.router.navigate([""]);
    }).catch(error => {
      const message = error.message;
      this.isLoading = false;
      this.snackBar.open(message, "cerrar", { duration: 5000 });
    });
  }
}

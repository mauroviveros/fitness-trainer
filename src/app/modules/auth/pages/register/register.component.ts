import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {
  public isLoading = false;
  public visibility: boolean[] = [false, false];
  public visibilityIcon(i: number){ return this.visibility[i] ? "visibility_off" : "visibility"; }
  public visibilityType(i: number){ return this.visibility[i] ? "text" : "password"; }

  public form = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
    password_confirm: ["", [Validators.required]]
  });

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ){}

  public submit(){
    if(this.form.invalid) return;
    const { email, password } = this.form.value as { email: string, password: string };

    this.isLoading = true;
    this.auth.register(email, password)
      .finally(() => this.isLoading = false)
      .then(() => this.snackBar.open("✅ Cuenta creada correctamente", undefined))
      .then(() => this.router.navigate([""]));
  }
}

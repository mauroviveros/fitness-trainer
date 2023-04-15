import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ){}

  public submit(){
    if(this.form.invalid) return;

    this.isLoading = true;
    const { email, password } = this.form.value as { email: string, password: string };
    this.authService.register(email, password).then(() => {
      this.snackBar.open("✅ Cuenta creada correctamente", undefined);
      this.router.navigate([""]);
    }).catch(error => {
      let message = error.message;
      this.isLoading = false;
      if(message.includes("auth/email-already-in-use")) message = "Ya existe ese email";
      this.snackBar.open(message, "cerrar", { duration: 5000 });
    });
  }
}

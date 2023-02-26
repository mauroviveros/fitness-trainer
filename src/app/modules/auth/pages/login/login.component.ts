import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "auth-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  public show_password = false;

  public form: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _auth: AuthService
  ) {}

  public login(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this._snackBar.open("❌ Usuario o contraseña incorrecta");

    console.log(this.form.value);
  }

  public isInvalid(campo: string): boolean | null{
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }
}
